import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import HomePage from './views/HomePage.vue';
import GeneratorPage from './views/GeneratorPage.vue';
import { marked } from 'marked';

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true,
  mangle: false
});

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/generator', component: GeneratorPage }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

// Create and mount the app
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount('#app');
