import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/samhita/:chapter?',
      name: 'samhita',
      component: () => import('@/views/SamhitaView.vue'),
      props: true
    },
    {
      path: '/brahmana/:book?',
      name: 'brahmana',
      component: () => import('@/views/BrahmanaView.vue'),
      props: true
    },
    {
      path: '/aranyaka/:book?',
      name: 'aranyaka',
      component: () => import('@/views/AranyakaView.vue'),
      props: true
    }
  ]
})

export default router