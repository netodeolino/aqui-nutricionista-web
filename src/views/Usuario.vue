<template>
  <section class="testimonials text-center home">
    <div class="testimonial-item mx-auto mb-5 mb-lg-0">
      <img :src="usuario.foto != null ? `${URL_API}${usuario.foto}` : `https://meusanimais.com.br/wp-content/uploads/2017/01/os-gatos-crescem.jpg`"
        class="img-fluid rounded-circle mb-3" alt="">
      <h5>{{ usuario.nome }}</h5>
      <p class="font-weight-light mb-0">"This is fantastic! Thanks so much guys!"</p>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import { URL_API, URL_USUARIO } from '../util/constants'

export default {
  name: 'usuario',
  data() {
    return {
      URL_API,
      usuario: {}
    }
  },
  created() {
    this.getUsuario()
  },
  methods: {
    getUsuario: function() {
      axios
        .get(`${URL_API}${URL_USUARIO}${this.$route.params.id}`, {
          headers: {
            'aqui-nutricionista-token': window.localStorage.getItem('token')
          }
        })
        .then(res => {
          this.usuario = res.data
        })
        .catch(err => {
          this.$notify({
            group: "not-aqui-nutricionista",
            title: "Erro!",
            text: `${err.response.data}`,
            position: "top right",
            type: "error"
          })
        })
    }
  }
}
</script>

<style scoped>
</style>
