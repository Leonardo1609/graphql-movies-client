import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: ':user',
    name: 'profile',
    component: () => import('../views/Profile.vue'),
  },
  {
    path: ':user/watchlist',
    name: 'watchlist',
    component: () => import('../views/Watchlist.vue'),
  },
  {
    path: ':user/favourites',
    name: 'favourites',
    component: () => import('../views/Favourites.vue'),
  },
]

export default routes
