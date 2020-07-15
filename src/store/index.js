import Vue from "vue";
import _ from "lodash"
import axios from "axios"

export const state = Vue.observable({
    notifications: [],
    online_users : [],
    user: {},
    loggedIn: false,
    jwt: null
  })


export const actions = {

  vue: null,
  api: "",
  toastDefaults: {
    autoHideDelay: 2000,
    toaster: "b-toaster-top-center",
    variant: "info",
    noCloseButton: true,
  }, 

  setVue: vueInstance => actions.vue = vueInstance,

  init: async (api_url) => {

    actions.api = api_url

    state.jwt = actions.loadLocalStoage()

    if (state.jwt) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.jwt}`;
      let user  = await actions.getUser()
      actions.setUser(state.jwt, user)
    }
  },
  logoutUser: async () => {
    state.loggedIn = false
    state.user = {}
    axios.defaults.headers.common['Authorization'] = ""
    localStorage.removeItem("matcha-firewood")
  },
  loginUser: async (username, password) => {
    try {
      let response = await axios.post(`${actions.api}/login`, {username, password})
      let jwt  = response.data.access_token
      let user = response.data.user
      actions.setUser(jwt, user)
      return true
    } catch(err) {
      return false
    }
  },
  getUser: async () => {
    try {
      let resp = await axios.get(`${actions.api}/user/current`)
      return resp.data
    } catch (error) {
      actions.notify.error("Could not retrieve user information")
    }
  },
  setUser: (jwt, user) => {
    state.jwt = jwt
    state.user = user
    state.loggedIn = true
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    actions.saveLocalStoage()
  },
  snapshotUser:  () => {},
  saveUserChanges: () => {},
  loadLocalStoage: () => localStorage.getItem("matcha-firewood"),
  saveLocalStoage: () => localStorage.setItem("matcha-firewood", state.jwt),

  notify: {
    setOpts: (options) => {
      return (options) ? {...actions.toastDefaults, ...options} : actions.toastDefaults
    },
    success: (message, options) => {
      let opt = {...actions.notify.setOpts(options), title: "Error!", variant: "info"}
      actions.vue.$bvToast.toast(message, opt)
    },
    error: (message, options) => {
      let opt = {...actions.notify.setOpts(options), title: "Error!", variant: "danger"}
      actions.vue.$bvToast.toast(message, opt)
    }
  }

}

export default state;