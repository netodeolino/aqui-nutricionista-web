import Vue from 'vue'
import axios from 'axios'
import router from './router'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import { store } from './store'
import VueLazyload from 'vue-lazyload'
import Notifications from 'vue-notification'
import GlobalDirectives from '../src/directives/GlobalDirectives'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

axios.defaults.headers.post['Content-Type'] = 'application/json'
Vue.config.productionTip = false
Vue.use(GlobalDirectives)
Vue.use(Notifications)
Vue.use(VueLazyload)
Vue.use(Vuelidate)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
