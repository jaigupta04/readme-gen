<template>
  <header class="navbar">
    <div class="container navbar-container">
      <div class="navbar-left">
        <button 
          class="mobile-menu-toggle" 
          aria-label="Toggle menu" 
          @click="isMenuOpen = !isMenuOpen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-icon">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <router-link to="/" class="navbar-brand" @click="isMenuOpen = false">
          <img src="../../public/readme_logo4.svg" alt="Logo" width="46" height="46" class="custom-logo" />

          <span>README Generator</span>
        </router-link>
      </div>
      
      <nav class="navbar-nav" :class="{ 'is-open': isMenuOpen }">
        <div class="mobile-close-btn" @click="isMenuOpen = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
        <div class="nav-links">
          <router-link to="/" class="nav-link" @click="isMenuOpen = false">Home</router-link>
          <router-link to="/generator" class="nav-link" @click="isMenuOpen = false">Generator</router-link>
        </div>
        
        <button v-if="!loggedIn" class="btn btn-outline login-btn" @click="loginWithGitHub">
          <svg class="github-icon-small" viewBox="0 0 16 16" width="16" height="16">
            <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" fill="#ffffff"></path>
          </svg>
          Login with GitHub
        </button>

        <button v-else class="btn btn-outline logout-btn" @click="signOut">
          Logout
        </button>
      </nav>
      
      <div class="overlay" v-if="isMenuOpen" @click="isMenuOpen = false"></div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useUserStore } from '@/store';
import { GithubAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';
import axios from 'axios';

const store = useUserStore();
const loggedIn = ref(false);
const username = ref('');
const repos = ref([]);
const isMenuOpen = ref(false);

const provider = new GithubAuthProvider();

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    loggedIn.value = !!user;
  });
});

const loginWithGitHub = async () => {
  isMenuOpen.value = false; // Close mobile menu when logging in
  
  const result = await signInWithPopup(auth, provider);
  const credential = GithubAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  const user = result.user;

  loggedIn.value = true;

  const [userResponse, reposResponse] = await Promise.all([
    axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${token}` }
    }),
    axios.get('https://api.github.com/user/repos', {
      headers: { Authorization: `Bearer ${token}` }
    })
  ]);

  username.value = userResponse.data.login;
  repos.value = reposResponse.data;

  store.username = username.value;
  store.repos = repos.value;
  store.loggedIn = loggedIn.value;
};

const signOut = async () => {
  isMenuOpen.value = false; // Close mobile menu when logging out
  
  await firebaseSignOut(auth);
  loggedIn.value = false;
  username.value = '';
  repos.value = [];

  store.username = '';
  store.repos = '';
  store.loggedIn = false;
};
</script>

<style scoped>
.navbar {
  background-color: var(--secondary-bg);
  border-bottom: 1px solid var(--border);
  padding: 1rem 0;
  position: relative;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--text);
  cursor: pointer;
  padding: 0.5rem;
  margin-right: 0.5rem;
}

.menu-icon {
  display: block;
}

.navbar-brand {
  display: flex;
  align-items: center;
  color: var(--text);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.25rem;
}

.github-icon {
  margin-right: 0.5rem;
}

.github-icon-small {
  margin-right: 0.25rem;
}

.navbar-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
}

.nav-link:hover {
  color: var(--primary);
}

.nav-link.router-link-active {
  color: var(--primary);
  font-weight: 600;
}

.login-btn, .logout-btn {
  display: flex;
  align-items: center;
}

.mobile-close-btn {
  display: none;
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text);
  cursor: pointer;
}

.overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 90;
}

@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: block;
  }
  
  .mobile-close-btn {
    display: block;
  }
  
  .navbar-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background-color: var(--secondary-bg);
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 4rem;
    z-index: 100;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
  }
  
  .navbar-nav.is-open {
    transform: translateX(0);
  }
  
  .overlay {
    display: block;
  }
  
  .nav-links {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 0 1.5rem;
    margin-bottom: 2rem;
  }
  
  .nav-link {
    font-size: 1.25rem;
    padding: 0.75rem 0;
    width: 100%;
    border-bottom: 1px solid var(--border);
  }
  
  .login-btn, .logout-btn {
    margin-left: 1.5rem;
  }
}
</style>
