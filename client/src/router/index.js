import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import GeneratorPage from '../views/GeneratorPage.vue';
import ContactPage from '../views/ContactPage.vue';
import UpdatesPage from '../views/UpdatesPage.vue';

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/', 
      name: 'Home',
      component: HomePage 
    },
    { 
      path: '/generator', 
      name: 'Generator',
      component: GeneratorPage 
    },
    {
      path: '/contact',
      name: 'Contact',
      component: ContactPage
    },
    {
      path: '/updates',
      name: 'Updates',
      component: UpdatesPage
    }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
