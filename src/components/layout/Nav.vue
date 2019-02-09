<template>
  <nav class="navbar navbar-light bg-light static-top">
    <div class="container">
      <router-link class="navbar-brand" to="/">Aqui Nutricionista</router-link>
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
      this.$store.commit('setToken', null)
    }
  },
  computed: {
    loggedIn() {
      if (this.$store.getters.isLogged) {
        // eslint-disable-next-line
        this.usuarioId = this.$store.getters.getUsuarioId
        return true
      }
      return false
    }
  }
}
</script>
