import Vue from 'vue'
import Router from 'vue-router'

import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Home from './components/Home'
import Usuario from './components/Usuario'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        header: Nav,
        default: Home,
        footer: Footer
      }
    },
    {
      path: '/usuario/:id',
      name: 'Usuario',
      components: {
        header: Nav,
        default: Usuario,
        footer: Footer
      }
    }
  ]
})