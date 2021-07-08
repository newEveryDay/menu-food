import Vue from 'vue'
import App from './App.vue'
import { router } from './router/router'
import store from './store'
// import Vant from 'vant';
// import 'vant/lib/index.css';
import { Lazyload } from 'vant'
Vue.use(Lazyload)
// Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')
