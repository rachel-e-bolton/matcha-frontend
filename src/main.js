import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/styles/custom.scss'
import VoerroTagsInput from '@voerro/vue-tagsinput'
import _ from 'lodash'
import VueCroppie from 'vue-croppie';
import 'croppie/croppie.css'

import MatchaWebsocket from '@/socket'

Vue.component('tags-input', VoerroTagsInput);

const axios = require('axios').default;

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueCroppie)

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$api = (process.env.NODE_ENV === 'development') ? "http://192.168.88.251:5000/v1" : "https://api.matchame.co.za/v1"

let state = localStorage.getItem("firewood")

let socketUri = (process.env.NODE_ENV === 'development') ? "ws://192.168.88.251:5000/ws" : "wss://api.matchame.co.za/ws"

Vue.prototype.$socket = new MatchaWebsocket(socketUri)

if (state) {
  Vue.prototype.$store = Vue.observable(JSON.parse(state))
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + Vue.prototype.$store.token
  Vue.prototype.$socket.socket.onopen = () => {
    console.log("Connecting Websocket and authenticating")
    Vue.prototype.$socket.authenticate(Vue.prototype.$store.token)
  }
} else {
  Vue.prototype.$store = Vue.observable({ 
    token: false,
    user: false,
  })
}


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
