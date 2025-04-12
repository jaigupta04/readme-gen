import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { marked } from 'marked';
import { inject } from '@vercel/analytics';

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true,
  mangle: false
});

// Create and mount the app
const app = createApp(App);
const pinia = createPinia();

inject();

app.use(pinia);
app.use(router);
app.mount('#app');
