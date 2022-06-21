import './fontawesome-icons'
import './index.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'vue-toastification/dist/index.css'
import '../node_modules/nprogress/nprogress.css'
import App from './App.vue'
import VueToast, { PluginOptions, POSITION } from 'vue-toastification'
import router from './routes'
import urql from '@urql/vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { client } from './client'
import { createApp, Directive } from 'vue'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

const toastOptions: PluginOptions = {
  position: POSITION.BOTTOM_CENTER,
  timeout: 2000,
}

const vClickOutside: Directive = {
  mounted(el, binding) {
    // I saved as a new method of the element, because I can have access later in the unmounted method
    el.clickOutsideEvent = function (event: any) {
      if (
        !(
          el === event.target ||
          el.contains(event.target) ||
          event.target.id === binding.arg
        )
      ) {
        binding.value()
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
}
app.directive('click-outside', vClickOutside)

app
  .use(VueToast, toastOptions)
  .use(pinia)
  .use(urql, client)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
