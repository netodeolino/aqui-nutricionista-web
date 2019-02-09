<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap v-if="nutrionionistas != null && nutrionionistas.length > 0">
      <v-flex lg3 sm12 v-for="(item, index) in nutrionionistas" :key=" 'bottom-nav' + index">
        <name-card bottom-nav v-bind="item" :name="item.nome" jobTitle="Nutricionista"
            :avatarSrc="item.foto" color="teal" :dark="true" :userId="item.id">
        </name-card>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center row v-else>
      <div class="mr-3 hidden-sm-and-down">
        <img src="../assets/erro/500.svg" alt="">
      </div>
      <div class="text-md-center">
        <h1>500</h1>
        <h2 class="my-3 headline ">Sorry, the server is down.</h2>
        <div>
          <v-btn color="primary" @click="goHome">Go Home</v-btn>
        </div>  
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import NameCard from '@/components/widgets/card/NameCard'
import { URL_API, SERVICO_INDISPONIVEL } from '@/util/constants'

export default {
  components: {
    NameCard
  },
  name: 'home',
  data() {
    return {
      nome: null,
      URL_API,
      nutrionionistas: null,
      nutrionionistasBackup: null
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
          this.nutrionionistasBackup = res.data
        })
        .catch(() => {
          this.$notify({
            group: "not-aqui-nutricionista",
            title: "Erro!",
            text: SERVICO_INDISPONIVEL,
            position: "top right",
            type: "error"
          })
        })
    }
  },
  watch: {
    nome: function() {
      if (this.nome.length <= 0) {
        this.nutrionionistas = this.nutrionionistasBackup
      } else {
        this.nutrionionistas = this.nutrionionistas.filter(nut => {
          return nut.nome.toUpperCase().includes(this.nome.toUpperCase())
        })
      }
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
