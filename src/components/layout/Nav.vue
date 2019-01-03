<template>
  <nav class="navbar navbar-light bg-light static-top">
    <div class="container">
      <router-link class="navbar-brand" to="/">Aqui Nutricionista</router-link>
      <!-- <ul class="navbar-nav navbar-nav-hover align-items-lg-center ml-lg-auto">
        <base-dropdown tag="li" class="nav-item">
          <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
            <i class="ni ni-collection d-lg-none"></i>
            <span v-if="!loggedIn"><router-link to="/login" class="btn btn-outline-default btn-sm">Entrar</router-link></span>
            <span v-if="loggedIn && pathFoto">
              <img v-lazy="`${URL_API}uploads/${pathFoto}`" class="user-image rounded-circle img-center img-fluid shadow shadow-lg--hover">
            </span>
          </a>
          <router-link v-if="!loggedIn" to="/register" class="dropdown-item">Cadastre-se</router-link>
          <router-link v-if="loggedIn" to="/register-vacancy" class="dropdown-item">Registre uma Vaga</router-link>
          <span v-if="loggedIn" v-on:click="logout()" class="dropdown-item pointer">Sair</span>
        </base-dropdown>
      </ul> -->
    </div>
  </nav>
</template>

<script>
import { URL_API } from '../../util/constants'

export default {
  components: {},
  data() {
    return {
      pathFoto: null,
      usuarioId: null,
      URL_API
    }
  },
  methods: {
    logout() {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('setPathFoto')
      window.localStorage.removeItem('setUsuarioId')
      this.$store.commit('setToken', null)
      this.$store.commit('setPathFoto', null)
      this.$store.commit('setUsuarioId', null)
    }
  },
  computed: {
    loggedIn() {
      if (this.$store.getters.isLogged) {
        // eslint-disable-next-line
        this.pathFoto = this.$store.getters.getPathFoto
        // eslint-disable-next-line
        this.usuarioId = this.$store.getters.getUsuarioId
        return true
      }
      return false
    }
  }
}
</script>
