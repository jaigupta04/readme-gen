<template>
  <v-app>

    <v-app-bar color="#0d1117" >

      <router-link to="/" class="mx-4">
        <img
          alt="Logo"
          src="@/assets/logo.svg"
          width="40"
          transition="scale-transition"
        />
      </router-link>

      <v-btn color="#57606a" rounded="xl" :exact="true" variant="flat" :ripple="false" class="ml-4" to="/">Home</v-btn>
      <v-btn color="#57606a" rounded="xl" :exact="true" variant="flat" :ripple="false" class="ml-4" to="/about">About</v-btn>

      <v-spacer></v-spacer>

      <v-btn
        v-if="!loggedIn"
        color="#57606a"
        rounded="xs"
        :exact="true"
        variant="flat"
        :ripple="false"
        class="ml-4 github-btn"
        @click="signInWithGithub"
      >
        <v-icon>
          <img class="github-logo" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub logo" width="20" />
        </v-icon>
        Login with GitHub
      </v-btn>

      <v-btn
        v-else
        color="#57606a"
        rounded="xs"
        :exact="true"
        variant="flat"
        :ripple="false"
        class="ml-4"
        @click="signOut"
      >
        Logout
      </v-btn>

    </v-app-bar>

    <v-main class="bg-app">
      <v-container fluid>
        <RouterView :doGet="doGet" :doPost="doPost" :repos="repos" :username="username"/>
      </v-container>
    </v-main>

    <v-snackbar v-model="snackbar" timeout="2500">
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </v-app>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import axios from "axios";
import { GithubAuthProvider, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "./firebase-config";

export default {

  data() {
    return {
      location: undefined,
      session: undefined,
      snackbar: false,
      snackbarText: '',
      provider: new GithubAuthProvider(),
      loggedIn: false,
      repos: [],
      username: "",
    }
  },

  watch: {
    watch: {
      username() {},
      repos() {}
    },
  },

  async mounted() {

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true;
      }
    });

    navigator.geolocation.watchPosition(position => {
      this.location = {
        coords: {
          latitude : position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy : position.coords.accuracy
        },
        timestamp: position.timestamp
      }
    });

    for(let cookie of document.cookie.split(';')) {
      cookie = cookie.trim();
      if(cookie.startsWith('sessionId=') && cookie != 'sessionId=') {
        this.session = { id: cookie.substring('sessionId='.length) };
        break;
      }
    }

    if(this.session) {
      // this.session = await this.doGet('/api/user/session');
    } else {
      // this.session = await this.doPost('/api/user/session', { userAgent: navigator.userAgent });
      document.cookie = `sessionId=${ this.session.id }; path=/;`;
    }

    if(this.session.status == 'active') {
      this.$refs['GoogleLoginButton'].style.display = '';
      window.google.accounts.id.initialize({
        client_id: '220251834863-p6gimkv0cgepodik4c1s8cs471dv9ioq.apps.googleusercontent.com',
        callback: async (resp) => {
          await this.doPost('/api/user/google-login', { idToken: resp.credential });
          window.location.reload();
        },
        auto_select: true
      });
      window.google.accounts.id.renderButton(this.$refs['GoogleLoginButton'], {});
      window.google.accounts.id.prompt();
    } else if(this.session.status == 'loggedin') {
      setInterval(() => {
        this.doPost('/api/user/session/ping', { userAgent: navigator.userAgent, location: this.location });
      }, 60 * 1000);
    }

  },

  methods: {

    async doRequest(req, retry) {

      let resp = null;
      let options = { ...req, validateStatus: status => [ 200, 201, 400, 401, 403 ].includes(status) };
      if(retry) {
        try {
          resp = await axios(options);
        } catch(e) {
          await new Promise(resolve => setTimeout(resolve, 100));
          return await this.doRequest(req, retry - 1);
        }
      } else {
        resp = await axios(options);
      }

      if(resp.status == 401) {
        document.cookie = 'sessionId=; path=/;';
        window.location.reload();
      } else if(resp.status == 201 || resp.status == 400 || resp.status == 403) {
        while(this.snackbar)
          await new Promise(resolve => setTimeout(resolve, 100));
        this.snackbarText = resp.data;
        this.snackbar = true;
      } else {
        return resp.data;
      }

    },

    async doGet(api, query = {}, retry = 3) {
      return await this.doRequest({ method: 'get', url: api, params: query }, retry);
    },

    async doPost(api, body = {}, retry = 0) {

      let data = await this.doRequest({ method: 'post', url: api, data: body }, retry);

      if(data && data.message) {
        while(this.snackbar)
          await new Promise(resolve => setTimeout(resolve, 100));
        this.snackbarText = data.message;
        this.snackbar = true;
      }

      return data;

    },

    async signInWithGithub() {
      const result = await signInWithPopup(auth, this.provider);
      
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user;

      this.loggedIn = true;

      const [userResponse, reposResponse] = await Promise.all([
        axios.get("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get("https://api.github.com/user/repos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      this.username = userResponse.data.login;
      this.repos = reposResponse.data;

    },

    async signOut() {
      await firebaseSignOut(auth);
      this.loggedIn = false; 
    },

  }

};
</script>

<style scoped>

.bg-app {
  background-color: #57606a; 
}

.github-btn {
  margin-inline-end: 20px !important;
}

.github-logo {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 15px;
}

</style>
