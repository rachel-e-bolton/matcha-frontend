import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/styles/custom.scss'

Vue.use(VueMaterial)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

Vue.prototype.$store = Vue.observable({ 
  access_token: false,
  api : "http://192.168.88.251:5000/v1"
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
