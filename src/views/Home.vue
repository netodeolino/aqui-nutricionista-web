<template>
  <v-container grid-list-xl fluid>
    <section class="container">
      <v-layout row wrap v-if="nutrionionistas != null && nutrionionistas.length > 0">
        <v-flex lg3 sm12 v-for="(item, index) in nutrionionistas" :key=" 'bottom-nav' + index">
          <name-card bottom-nav v-bind="item" :name="item.nome" jobTitle="Nutricionista"
              :avatarSrc="item.foto" color="teal" :dark="true" :userId="item.id">
          </name-card>
        </v-flex>
      </v-layout>
      <v-layout align-center justify-center row v-if="nutrionionistas == null || nutrionionistas.length == 0">
        <div class="text-md-center">
          <h1>:(</h1>
          <h2 class="my-3 headline">Desculpa, no momento não existem Nutricionistas cadastrados.</h2>
        </div>
      </v-layout>
    </section>
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
