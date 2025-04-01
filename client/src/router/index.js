import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/generator',
      name: 'generator',
      component: () => import('../views/GeneratorPage.vue')
    }
  ]
})

export default router
