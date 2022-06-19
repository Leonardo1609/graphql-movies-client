import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import publicRoutes from '../modules/public/routes'
import profileRoutes from '../modules/profile/routes'
import NProgress from 'nprogress'

NProgress.configure({
  showSpinner: false,
})

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../components/Layout.vue'),
    children: [...publicRoutes, ...profileRoutes],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeResolve((to, _, next) => {
  if (to.name) {
    NProgress.start()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})
export default router
