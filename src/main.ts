import './index.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import './fontawesome-icons'
import App from './App.vue'
import urql from '@urql/vue'
import { client } from './client'
import { createApp } from 'vue'
import router from './routes'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app
  .use(urql, client)
  .use(pinia)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
