import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/onboard',
      name: 'onboard',
       component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/ACDC',
      name: 'ACDC',
    
      component: () => import('@/views/ACDCView.vue'),
    },
  ],
})

export default router
