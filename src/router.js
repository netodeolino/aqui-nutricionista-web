import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Home from './views/Home'
import Usuario from './views/Usuario'
import Login from './views/Login'

import { URL_API, URL_TOKEN_VALIDO, TOKEN_INVALIDO } from './util/constants'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        header: Nav,
        default: Home,
        footer: Footer
      }
    },
    {
      path: '/usuario/:id',
      name: 'usuario',
      components: {
        header: Nav,
        default: Usuario,
        footer: Footer
      },
      beforeEnter: (to, from, next) => {
        if (window.localStorage.getItem('token') != null) {
          axios
            .get(`${URL_API}${URL_TOKEN_VALIDO}`, {
              headers: {
                'aqui-nutricionista-token': window.localStorage.getItem('token')
              }
            })
            .then(res => {
              if (res.data == false) {
                throw TOKEN_INVALIDO
              } else {
                next()
              }
            })
            .catch(() => {
              window.localStorage.removeItem('token')
              next('/login')
            })
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      components: {
        default: Login,
        footer: Footer
      }
    }
  ]
})