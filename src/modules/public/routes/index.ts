import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: 'film/:id',
    name: 'filmPage',
    component: () => import('../views/MoviePage.vue'),
  },
  {
    path: 'show/:id',
    name: 'showPage',
    component: () => import('../views/ShowPage.vue'),
  },
  {
    path: 'search/:type/:text',
    name: 'search',
    component: () => import('../views/Search.vue'),
  },
]

export default routes
