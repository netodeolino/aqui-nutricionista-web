<template>
  <v-container fluid fill-height class="pa-0 ma-0 white">
    <section class="container">
      <v-layout column class="pa-0 ma-0">
        <v-card class="elevation-0">
          <v-img height="380" :src="require('@/assets/bg.jpg')">
            <v-layout column align-center justify-center>
              <v-avatar size="200" class="mx-5">
                <img :src="`${URL_API}${usuario.id}-${usuario.foto}`" :alt="usuario.nome">
              </v-avatar>
              <h1 class="white--text">{{usuario.nome}}</h1>
            </v-layout>
          </v-img>
          <v-card-text class="pa-0">
            <v-layout wrap class="grey lighten-4 pa-3">
              <v-flex xs4>
                <div class="layout column justify-center align-center">
                  <v-btn icon outline color="indigo">
                    <v-icon>fa fa-facebook</v-icon>
                  </v-btn>
                </div>
              </v-flex>
              <v-flex xs4>
                <div class="layout column justify-center align-center">
                  <v-btn icon outline color="pink">
                    <v-icon>fa fa-instagram</v-icon>
                  </v-btn>
                </div>
              </v-flex>
              <v-flex xs4>
                <div class="layout column justify-center align-center">
                  <v-btn icon outline color="blue">
                    <v-icon>fa fa-linkedin</v-icon>
                  </v-btn>
                </div>
              </v-flex>
            </v-layout>
            <v-tabs v-model="selectedTab">
              <v-tab ripple href="#tab-1">
                <v-icon>person</v-icon>
                Perfil
              </v-tab>
              <v-tab ripple href="#tab-2">
                <v-icon>place</v-icon>
                Localização 
              </v-tab>
              <v-tabs-items v-model="selectedTab">
                <v-tab-item value="tab-1">
                  <v-card flat>
                    <v-card-text>
                      <v-list two-line class="pa-0">
                        <v-list-tile href="#">
                          <v-list-tile-action>
                            <v-icon color="teal">work</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title>Nutricionista</v-list-tile-title>
                            <v-list-tile-sub-title>Profissão</v-list-tile-sub-title>
                          </v-list-tile-content>
                          <v-list-tile-action>
                          </v-list-tile-action>
                        </v-list-tile>
                        <v-divider inset></v-divider>
                        <v-list-tile href="#">
                          <v-list-tile-action>
                            <v-icon color="teal">phone</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title>(??) ?????-????</v-list-tile-title>
                            <v-list-tile-sub-title>Telefone</v-list-tile-sub-title>
                          </v-list-tile-content>
                          <v-list-tile-action>
                            <v-icon>chat</v-icon>
                          </v-list-tile-action>
                        </v-list-tile>
                        <v-divider inset></v-divider>
                        <v-list-tile href="#">
                          <v-list-tile-action>
                            <v-icon color="teal">mail</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title>{{usuario.email}}</v-list-tile-title>
                            <v-list-tile-sub-title>Email</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-divider inset></v-divider>
                        <v-list-tile href="#">
                          <v-list-tile-action>
                            <v-icon color="teal">location_on</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title>{{cidade.nome}}, {{usuario.endereco.bairro}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{usuario.endereco.rua}}, {{usuario.endereco.numero}}</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item value="tab-2">
                  <v-card flat>
                    <v-card-text>
                      <GmapMap
                        :center="{lat:-3.7319, lng:-38.5267}"
                        :zoom="7"
                        map-type-id="terrain"
                        style="height: 450px"
                      >
                        <GmapMarker
                          :key="index"
                          v-for="(m, index) in markers"
                          :position="m.position"
                          :clickable="true"
                          :draggable="true"
                          @click="center=m.position"
                        />
                      </GmapMap>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </v-card-text>
        </v-card>
      </v-layout>
    </section>
  </v-container>
</template>

<script>
import axios from 'axios'
import { URL_API, URL_USUARIO } from '@/util/constants'
import cidades from '@/assets/json/cidades'

export default {
  name: 'usuario',
  data() {
    return {
      URL_API,
      usuario: {
        endereco: {}
      },
      cidade: {},
      selectedTab: null,
      markers: null /* [{
          position: {lat: 10.0, lng: 10.0}
        }, {
          position: {lat: 11.0, lng: 11.0}
        }]*/
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
          this.getCidade()
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
    },
    getCidade() {
      if (this.usuario != null && this.usuario.endereco != null) {
        for (let i = 0; i < cidades.length; i++) {
          if (cidades[i].id == this.usuario.endereco.fk_cidade_id) {
            this.cidade = cidades[i]
            break
          }
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
