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
import { URL_API } from '../util/constants'

export default {
  name: 'Usuario',
  data() {
    return {
      URL_API,
      usuario: null
    }
  },
  created() {
    this.getUsuario();
  },
  methods: {
    getUsuario: function() {
      axios
        .get(`${URL_API}usuario/${this.$route.params.id}`)
        .then(res => {
          this.usuario = res.data
        })
    }
  }
}
</script>

<style scoped>
</style>
