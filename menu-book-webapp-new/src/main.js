import Vue from 'vue'
import App from './App.vue'
import { router } from './router/router'
// import Vant from 'vant';
// import 'vant/lib/index.css';

// Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  el: '#app',
  render: h => h(App),
}).$mount('#app')
