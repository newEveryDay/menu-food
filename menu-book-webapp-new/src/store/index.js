import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // NavBar名称
    navBarTitle: '菜谱之家',
    hasLogin: false,
    userInfo: {},
  },
  mutations: {
    setNavBarTitle (state, title) {
      state.navBarTitle = title
    }
  },
  actions: {

  }
})

export default store
