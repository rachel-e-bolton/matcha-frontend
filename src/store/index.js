import Vue from "vue";
import _ from "lodash"
import axios from "axios"

// var deep = require('deep-diff')

import {diff, applyDiff} from "deep-diff"

export const state = Vue.observable({
  notifications: [],
  online_users : [],
  user: {},
  loggedIn: false,
  jwt: null
})

axios.interceptors.request.use(function (config) {
  if (state.jwt)
    config.headers.Authorization = `Bearer ${state.jwt}`
  return config
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

    console.log(state.jwt)

    if (state.jwt) {
      let user  = await actions.getUser()
      actions.setUser(state.jwt, user)
    }
  },
  logoutUser: async () => {
    state.loggedIn = false
    state.user = {}
    state.jwt = null
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
      if (actions.vue)
        actions.notify.error("Could not retrieve user information")
      else
        console.log("Preflight error fetching user")
    }
  },
  setUser: (jwt, user) => {
    state.jwt = jwt
    state.user = user
    state.loggedIn = true
    actions.saveLocalStoage()
  },
  snapshotUser: () => _.cloneDeep(state.user),

  // Compare the users and save whats different!
  syncUser: async (user) => {

    let changes = {}

    Array.from(diff(state.user, user) || []).forEach(d => {
      let index = d.path[0]
      changes[index] = user[index]
    })
  
    if (Object.keys(changes).length > 0) {
      console.log("Applying changes", changes)
      try {
        let resp = await axios.put(`${actions.api}/user/${user.id}`, {user: changes})

        // Apply synced changes to the state user object
        for (let [key, value] of Object.entries(changes)) {
          console.log(`Setting state user ${key} to`, value)
          state.user[key] = value
        }

      } catch (error) {
        console.log(error)
      }
    }
  },
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