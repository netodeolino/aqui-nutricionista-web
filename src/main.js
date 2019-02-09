import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import { store } from './store'
import Vuelidate from 'vuelidate'
import VueLazyload from 'vue-lazyload'
import Notifications from 'vue-notification'
import GlobalDirectives from '../src/directives/GlobalDirectives'

import 'bootstrap'
import './plugins/vuetify'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'

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
