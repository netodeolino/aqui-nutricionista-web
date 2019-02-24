<template>
  <section class="container text-center home">
    <div class="row">
      <div class="col-sm-10 col-md-10 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <v-img style="margin-bottom: 1rem" height="150" :src="require('@/assets/bg.jpg')">
              <h4 style="margin-top: 4rem" class="card-title text-center"><small>Preencha as informações abaixo</small></h4>
            </v-img>
            <form role="form" class="form-signin" @submit.prevent="onSubmit()">
              <base-input id="nome-input" alternative class="mb-3" placeholder="Nome" addon-left-icon="fa fa-user"
                required v-model="nome" :valid="$v.nome.required" :error="erroNome" v-on:blur="dirtyNome">
              </base-input>
              <base-input id="telefone-input" alternative class="mb-3" placeholder="Telefone" addon-left-icon="fa fa-phone"
                required v-model="telefone" :valid="$v.telefone.required" :error="erroTelefone" v-on:blur="dirtyTelefone">
              </base-input>
              <base-selector v-model="endereco.cidade" :options="cidades" placeholder="Cidade" alternative class="my-3"
                  addon-left-icon="fa fa-building-o" :error="erroCidade" :valid="$v.endereco.cidade.required"/>
              <base-input id="email-input" alternative class="mb-3" placeholder="Email" addon-left-icon="fa fa-envelope"
                required v-model="email" :valid="$v.email.required && $v.email.email" :error="erroEmail" v-on:blur="dirtyEmail">
              </base-input>
              <base-input id="password-input" alternative class="mb-3" placeholder="Senha" addon-left-icon="fa fa-unlock-alt"
                required v-model="senha" :valid="$v.senha.required && $v.senha.minLength" :error="erroSenha" v-on:blur="dirtySenha" type="password">
              </base-input>
              <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Cadastrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import BaseInput from '../components/common/BaseInput'
import BaseSelector from '../components/common/BaseSelector'
import { URL_API, URL_USUARIO, URL_CADASTRO } from '../util/constants'
import { required, minLength, email } from 'vuelidate/lib/validators'
import cidades from '../assets/json/cidades'

export default {
  name: 'cadastro',
  components: {
    BaseInput,
    BaseSelector
  },
  data() {
    return {
      nome: null,
      telefone: null,
      email: null,
      senha: null,
      endereco: {},
      cidades
    }
  },
  methods: {
    onSubmit() {
      if (!this.validForm()) return
      axios
        .post(`${URL_API}${URL_USUARIO}${URL_CADASTRO}`, {
          email: this.email,
          senha: this.senha
        })
        .then(res => {
          //this.$router.push({ path: "/" })
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
    dirtyNome() {
      this.$v.nome.$touch()
    },
    dirtyTelefone() {
      this.$v.telefone.$touch()
    },
    dirtyEmail() {
      this.$v.email.$touch()
    },
    dirtySenha() {
      this.$v.senha.$touch()
    },
    validForm() {
      this.dirtySenha()
      this.dirtyEmail()
      if (this.$v.$invalid) return false
      return true
    }
  },
  computed: {
    erroNome() {
      if (!this.$v.nome.required && this.$v.nome.$dirty) {
        return 'Campo obrigatório.'
      }
      return null
    },
    erroTelefone() {
      if (!this.$v.telefone.required && this.$v.telefone.$dirty) {
        return 'Campo obrigatório.'
      }
      return null
    },
    erroCidade() {
      if (
        !this.$v.endereco.cidade.required &&
        !this.$v.endereco.cidade.$model &&
        this.$v.endereco.cidade.$dirty
      ) {
        return "Campo obrigatório.";
      }
    },
    erroEmail() {
      if (!this.$v.email.required && this.$v.email.$dirty) {
        return 'Campo obrigatório.'
      }
      if (!this.$v.email.email && this.$v.email.$dirty) {
        return 'Formato de email inválido.'
      }
      return null
    },
    erroSenha() {
      if (!this.$v.senha.required && this.$v.senha.$dirty) {
        return 'Campo obrigatório.'
      }
      if (!this.$v.senha.minLength && this.$v.senha.$dirty) {
        return `Deve conter no mínimo ${
          this.$v.senha.$params.minLength.min
        } caracteres.`
      }
      return null
    }
  },
  validations: {
    nome: {
      required
    },
    telefone: {
      required
    },
    email: {
      required,
      email
    },
    senha: {
      required,
      minLength: minLength(6)
    },
    endereco: {
      cidade: {
        required
      }
    }
  }
}
</script>

<style scoped>
.button.btn.dropdown-toggle.btn-default {
  padding: 1.25rem !important;
}
</style>
