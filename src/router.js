import Vue from 'vue'
import Router from 'vue-router'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/Home'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        header: Header,
        default: Home,
        footer: Footer
      }
    }
  ]
})