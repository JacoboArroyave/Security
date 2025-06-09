import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    children: [
      {
        path: 'addresses',
        name: 'AddressList',
        component: () => import('../views/Address/AddressList.vue')
      }
    ]

  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
