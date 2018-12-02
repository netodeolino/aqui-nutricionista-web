<template>
  <div class="container">
    <header class="masthead text-white text-center">
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-xl-9 mx-auto">
            <h1 style="color: black">Texto aqui!</h1>
          </div>
          <div class="col-md-10 col-lg-8 col-xl-7 mx-auto">
            <form>
              <div class="form-row">
                <div class="col-12 col-md-9 mb-2 mb-md-0">
                  <input type="email" class="form-control form-control-lg" placeholder="Digite o nome da nutrionista...">
                </div>
                <div class="col-12 col-md-3">
                  <button type="submit" class="btn btn-block btn-lg btn-primary">Pesquisar</button>
                </div>
              </div>
            </form>
          </div>
          <div class="col-xl-9 mx-auto">
            <h1 style="color: black">Talvez um aqui!</h1>
          </div>
        </div>
      </div>
    </header>
    <div v-if="nutrionionistas != null && nutrionionistas.length > 0" class="row home">
      <div class="col-10 col-md-4 mx-auto" :key="nut.id" v-for="nut in nutrionionistas">
        <router-link class="card" :to="`usuario/${nut.id}`">
          <img :src="nut.foto != null ? `${URL_API}${nut.foto}` : `https://meusanimais.com.br/wp-content/uploads/2017/01/os-gatos-crescem.jpg`"
            class="card-img-top" :alt="nut.nome"
          >
          <div class="card-body">
            <h5 class="card-title">{{ nut.nome }}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </router-link>
      </div>
    </div>
    <div v-else>
      <h2>Nenhuma</h2>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { URL_API } from '../util/constants'

export default {
  name: 'Home',
  data() {
    return {
      URL_API,
      nutrionionistas: null
    }
  },
  created() {
    this.getNutricionistas()
  },
  methods: {
    getNutricionistas: function() {
      axios
        .get(`${URL_API}usuario/all-nutricionista`)
        .then(res => {
          this.nutrionionistas = res.data
        })
    }
  }
}
</script>

<style scoped>
.card {
  margin-bottom: 1rem;
}
.card-img-top {
  width: 100%;
  height: 250px;
}
</style>
