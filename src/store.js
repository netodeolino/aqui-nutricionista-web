import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    users: null
  },
  getters: {
    isUsers: state => {
      return state.users != null;
    }
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    }
  },
  actions: {
    setUsers({ commit }, users) {
      commit("setUsers", users);
    }
  }
})