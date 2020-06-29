import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/styles/custom.scss'
import Axios from 'axios'

const axios = require('axios').default;

Vue.use(VueMaterial)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

let api_url = (process.env.NODE_ENV === 'development') ? "http://192.168.88.251:5000/v1" : "https://api.matchame.co.za/v1"

Vue.prototype.$store = Vue.observable({ 
  token: false,
  api: api_url,
  user: false,
})

Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
