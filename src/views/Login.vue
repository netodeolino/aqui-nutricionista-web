<template>
  <section class="container text-center home">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <v-img style="margin-bottom: 1rem" height="150" :src="require('@/assets/bg.jpg')">
              <h4 style="margin-top: 4rem" class="card-title text-center"><small>Digite seu email e sua senha</small></h4>
            </v-img>
            <form role="form" class="form-signin" @submit.prevent="onSubmit()">
              <base-input id="email-input" alternative class="mb-3" placeholder="Email" addon-left-icon="fa fa-envelope"
                required v-model="email" :valid="$v.email.required && $v.email.email" :error="erroEmail" v-on:blur="dirtyEmail">
              </base-input>
              <base-input id="password-input" alternative class="mb-3" placeholder="Senha" addon-left-icon="fa fa-unlock-alt"
                required v-model="senha" :valid="$v.senha.required && $v.senha.minLength" :error="erroSenha" v-on:blur="dirtySenha" type="password">
              </base-input>
              <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Entrar</button>
            </form>
          </div>
        </div>
        <div class="row">
          <p class="col-md-6 col-12"><b>Não possue uma conta?</b></p>
          <button class="col-md-5 col-12 btn green accent-3 btn-block" type="button" v-on:click="openCadastrar()" style="margin-bottom: .7rem">
            Quero me cadastrar
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import BaseInput from '../components/common/BaseInput'
import { URL_API, URL_USUARIO, URL_LOGIN } from '../util/constants'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'login',
  components: {
    BaseInput
  },
  data() {
    return {
      email: null,
      senha: null
    }
  },
  methods: {
    onSubmit() {
      if (!this.validForm()) return
      axios
        .post(`${URL_API}${URL_USUARIO}${URL_LOGIN}`, {
          email: this.email,
          senha: this.senha
        })
        .then(res => {
          window.localStorage.setItem('token', res.data.token)
          this.$store.commit('setToken', res.data.token)

          this.$router.push({ path: "/" })
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
    },
    openCadastrar: function() {
      this.$router.push({ path: 'cadastrar' })
    }
  },
  computed: {
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
    email: {
      required,
      email
    },
    senha: {
      required,
      minLength: minLength(6)
    }
  }
}
</script>

<style scoped>
.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}
</style>
