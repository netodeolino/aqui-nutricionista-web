<template>
  <section class="container text-center home">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center"><small>Digite seu email e sua senha</small></h5>
            <form role="form" class="form-signin" @submit.prevent="onSubmit()">
              <base-input id="email-input" alternative class="mb-3" placeholder="Email" addon-left-icon="fa fa-envelope"
                required v-model="email" :valid="true" :error="erroEmail">
              </base-input>
              <base-input id="password-input" alternative class="mb-3" placeholder="Senha" addon-left-icon="fa fa-unlock-alt"
                required v-model="senha" :valid="true" :error="erroSenha" type="password">
              </base-input>
              <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Entrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BaseInput from './common/BaseInput'
import { URL_API } from '../util/constants'

export default {
  name: 'login',
  components: {
    BaseInput
  },
  data() {
    return {
      URL_API,
      email: null,
      senha: null
    }
  },
  created() {
  },
  methods: {
    onSubmit() {
    }
  },
  computed: {
    erroEmail() {
      return 'Erro no email'
    },
    erroSenha() {
      return 'Erro na senha'
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
