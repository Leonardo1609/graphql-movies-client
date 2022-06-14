import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import publicRoutes from '../modules/public/routes'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../components/Layout.vue'),
    children: [...publicRoutes],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
