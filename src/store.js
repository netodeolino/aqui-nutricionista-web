import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    token: window.localStorage.getItem("token") || null,
    pathFoto: window.localStorage.getItem("pathFoto") || null,
    usuarioId: window.localStorage.getItem("usuarioId") || null
  },
  getters: {
    isLogged: state => {
      return state.token != null
    },
    getPathFoto: state => {
      return state.pathFoto
    },
    getUsuarioId: state => {
      return state.usuarioId
    }
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setPathFoto(state, payload) {
      state.pathFoto = payload
    },
    setUsuarioId(state, payload) {
      state.usuarioId = payload
    }
  },
  actions: {
    login({ commit }, token) {
      commit("setToken", token)
    },
    logout({ commit }) {
      commit("setToken", null)
    },
    setPathFoto({ commit }, pathFoto) {
      commit("setPathFoto", pathFoto)
    },
    setUsuarioId({ commit }, usuarioId) {
      commit("usuarioId", usuarioId)
    }
  }
})