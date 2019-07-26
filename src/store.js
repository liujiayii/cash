import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    permission: []
  },
  mutations: {
    changePermission(state, permission) {
      state.permission = permission
    }
  }
})
