<template>
  <v-card class="github-form" max-width="400px" style="margin: 0 auto;">
    <v-card-text>
      <v-form @submit.prevent="submit">

        <v-text-field
          v-model="githubId"
          label="GitHub ID"
          variant="outlined"
          required
          class="white-text-field"
        />
        <v-text-field
          v-model="repoName"
          label="Repository Name"
          variant="outlined"
          required
          class="white-text-field"
        />
        <v-text-field
          v-model="branchName"
          label="Branch Name"
          variant="outlined"
          required
          class="white-text-field"
        />
        <v-text-field
          v-model="fileName"
          label="File Name"
          variant="outlined"
          required
          class="white-text-field"
        />

      <v-divider color="white"></v-divider>

      <div class="button-wrapper white-text-field">
        <v-btn type="submit" color="#26a641" rounded>
          Generate README
        </v-btn>
      </div>

      <div class="text-center pa-4">

        <v-dialog
          v-model="dialog"
          max-width="600"
          persistent
        >

        <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn v-bind="activatorProps" 
                class="close-btn"
                type="submit" rounded
                @click="downloadResponse"
              >
                <v-icon size="small">mdi-download</v-icon>
                <!-- <v-icon class="close-icon">mdi-download</v-icon> -->
              </v-btn>

              <v-btn v-bind="activatorProps" 
                class="close-btn"
                type="submit" rounded
                @click="copyResponse"
              >
                <v-icon class="icon">mdi-content-copy</v-icon>
              </v-btn>

              <v-btn v-bind="activatorProps" 
                class="close-btn"
                type="submit" rounded
                @click="dialog = false"
              >
                <v-icon class="icon">mdi-close-circle-outline</v-icon>
              </v-btn>
            </v-card-actions>

          <v-card
            class="dialog-card"
            prepend-icon="mdi-alert-circle"
            title="README.md" 
          >

            <v-card-text class="dialog-text">
              <pre><code ref="codeBlock" class="markdown">{{ response }}</code></pre>
            </v-card-text>

            <v-divider color="white"></v-divider>

            <template v-slot:activator="{ props: activatorProps }">
              <v-spacer></v-spacer>
              <v-btn v-bind="activatorProps" 
                type="submit" color="#26a641" rounded
                @click="dialog = false"
              >
                Generate README
              </v-btn>
            </template>

          </v-card>

        </v-dialog>

      </div>

    </v-form>
  </v-card-text>

    <v-overlay :model-value="loading" class="loading-overlay">
      <div class="loading-content">
        <v-progress-circular color="#26a641" size="64" indeterminate></v-progress-circular>
        <div class="loading-text">Generating your Readme...</div>
      </div>
    </v-overlay>

  </v-card>
</template>



<script>

import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

export default {

  props: {
    doGet: Function,
    doPost: Function,
  },

  data() {
    return {
      githubId: null,
      repoName: null,
      branchName: null,
      fileName: null,
      dialog: false,
      response: '',
      loading: false,
      timeout: null,
    };
  },

  methods: {
    async submit() {
      if (this.githubId === null || this.repoName === null || this.branchName === null || this.fileName === null) {
        alert('Please Fill Amount Properly.');
        return; 
      }

      this.loading = true;

      const resp = await this.doGet('/api/generate', {
        githubId: this.githubId,
        repoName: this.repoName,
        branchName: this.branchName,
        fileName: this.fileName,
      });

      this.response = resp; 
      this.dialog = true; 

      this.$nextTick(() => {
          this.highlightCode();
        });

      this.loading = false;
    },

    copyResponse() {
      navigator.clipboard.writeText(this.response);
    },

    downloadResponse() {
      const blob = new Blob([this.response], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'README.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },

    highlightCode() {
      const blocks = this.$refs.codeBlock;
      hljs.highlightElement(blocks);
    }
  },
};

</script>



<style scoped>

.pa-4 {
    padding: 0px !important;
}

.dialog-card {
  background-color: #161b22;
  color: white;
  border-radius: 12px !important;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
}

.dialog-title {
  background-color: #0d1117;
  color: white;
}

.github-form {
  background-color: #0d1117;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  border-radius: 12px !important;
}

.button-wrapper {
  margin-top: 15px !important; 
  margin-bottom: 0px !important; 
  display: flex;
  justify-content: center;
}

.white-text-field {
  color: white;
  font-weight: bold;
}

.loading-overlay {
  background-color: rgba(0, 0, 0, 0.7) !important;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-text {
  margin-top: 16px;
  color: white;
  font-weight: bold;
  text-align: center;
}

.close-btn {
  background-color: #8957e5;
  color: white !important;
  margin-bottom: 7px;
}

.icon {
  margin-right: 4px; 
}

pre {
  overflow: auto;
  background: #161b22;
  padding: 10px;
  border-radius: 8px;
}

code {
  font-size: 14px;
}

</style>
