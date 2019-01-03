import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Home from './components/Home'
import Usuario from './components/Usuario'
import Login from './components/Login'

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
              }
              next()
            })
            .catch(() => {
              window.localStorage.removeItem('token')
              next('/')
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
        header: Nav,
        default: Login,
        footer: Footer
      }
    }
  ]
})