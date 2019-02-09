import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    token: window.localStorage.getItem("token") || null
  },
  getters: {
    isLogged: state => {
      return state.token != null
    }
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    }
  },
  actions: {
    login({ commit }, token) {
      commit("setToken", token)
    },
    logout({ commit }) {
      commit("setToken", null)
    }
  }
})