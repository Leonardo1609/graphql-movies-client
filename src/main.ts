import './index.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import App from './App.vue'
import urql from '@urql/vue'
import { client } from './client'
import { createApp } from 'vue'
import router from './routes'

createApp(App).use(urql, client).use(router).mount('#app')
