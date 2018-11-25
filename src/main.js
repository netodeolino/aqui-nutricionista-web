import Vue from 'vue'
import axios from 'axios'
import router from './router'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import { store } from './store'
import Notifications from 'vue-notification'

axios.defaults.headers.post['Content-Type'] = 'application/json'
Vue.config.productionTip = false
Vue.use(Notifications)
Vue.use(Vuelidate)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
