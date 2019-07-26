import Vue from 'vue'
import App from './App.vue'
import {router} from './router/'
import {i18n} from './config'
import store from './store'

Vue.config.productionTip = false

window.$Vue = new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
