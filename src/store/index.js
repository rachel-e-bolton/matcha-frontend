import Vue from "vue";
import _ from "lodash";
import axios from "axios";

import diff from "deep-diff"

export const state = Vue.observable({
  notifications: [],
  online_users: [],
  mapsKey: null,
  ipstackKey: null,
  user: {},
  loggedIn: false,
  jwt: null,
});

axios.interceptors.request.use(function(config) {
  if (state.jwt && ~config.url.indexOf(actions.api))
    config.headers.Authorization = `Bearer ${state.jwt}`;
  return config;
});

export const actions = {
  vue: null,
  api: "",
  toastDefaults: {
    autoHideDelay: 2000,
    toaster: "b-toaster-top-center",
    variant: "info",
    noCloseButton: true,
  },

  setVue: (vueInstance) => (actions.vue = vueInstance),

  init: async (api_url) => {
    actions.api = api_url;

    state.jwt = actions.loadLocalStoage();

    if (state.jwt) {
      let user = await actions.getUser();
      actions.setUser(state.jwt, user);
    }
  },
  logoutUser: async () => {
    state.loggedIn = false;
    state.user = {};
    state.jwt = null;
    localStorage.removeItem("matcha-firewood");
  },
  loginUser: async (username, password) => {
    try {
      let response = await axios.post(`${actions.api}/login`, {
        username,
        password,
      });
      let jwt = response.data.access_token;
      let user = response.data.user;
      actions.setUser(jwt, user);
      return true;
    } catch (err) {
      return false;
    }
  },
  getUser: async () => {
    try {
      let resp = await axios.get(`${actions.api}/user/current`);
      return resp.data;
    } catch (error) {
      if (actions.vue)
        actions.notify.error("Could not retrieve user information");
      else console.log("Preflight error fetching user");
    }
  },
  setUser: (jwt, user) => {
    state.jwt = jwt;
    state.user = user;
    state.loggedIn = true;
    actions.saveLocalStoage();
    actions.getApiKeys();
  },
  snapshotUser: () => _.cloneDeep(state.user),

  // Compare the users and save whats different!
  syncUser: async (user) => {
    let changes = {};

    Array.from(diff(state.user, user) || []).forEach((d) => {
      let index = d.path[0];
      changes[index] = user[index];
    });

    if (Object.keys(changes).length > 0) {
      try {
        let resp = await axios.put(`${actions.api}/user/${user.id}`, {
          user: changes,
        });

        // Apply synced changes to the state user object
        for (let [key, value] of Object.entries(changes)) {
          console.log(`Setting state user ${key} to`, value);
          state.user[key] = value;
        }
        return true
      } catch (error) {
        actions.notify.error(error.response.data.message);
        return false
      }
    }
  },
  loadLocalStoage: () => localStorage.getItem("matcha-firewood"),
  saveLocalStoage: () => localStorage.setItem("matcha-firewood", state.jwt),

  notify: {
    setOpts: (options) => {
      return options
        ? { ...actions.toastDefaults, ...options }
        : actions.toastDefaults;
    },
    success: (message, options) => {
      let opt = {
        ...actions.notify.setOpts(options),
        title: "Success!",
        variant: "success",
        noCloseButton: false,
      };
      actions.vue.$bvToast.toast(message, opt);
    },
    error: (message, options) => {
      let opt = {
        ...actions.notify.setOpts(options),
        title: "Error!",
        variant: "danger",
        noCloseButton: false,
      };
      actions.vue.$bvToast.toast(message, opt);
    },
    warning: (message, options) => {
      let opt = {
        ...actions.notify.setOpts(options),
        title: "Please Note!",
        variant: "warning",
        noCloseButton: false,
      };
      actions.vue.$bvToast.toast(message, opt);
    },
    info: (message, options) => {
      let opt = {
        ...actions.notify.setOpts(options),
        title: "Please Note",
        variant: "info",
        noCloseButton: false,
      };
      actions.vue.$bvToast.toast(message, opt);
    },
  },
  location: {
    ip: async () => {
      try {
        let resp = axios.get(`${actions.api}/location`);
        let lat = resp.data.latitude || -29.764269;
        let long = resp.data.longitude || 25.42979;
        return { lat, long };
      } catch (error) {
        return { lat: -29.764269, long: 25.42979 };
      }
    },
    getBrowserPosition: () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    },
    browser: async () => {
      if (navigator.geolocation) {
        let pos = await actions.location.getBrowserPosition();
        return { lat: pos.coords.latitude, long: pos.coords.longitude };
      } else {
        return { lat: -29.764269, long: 25.42979 };
      }
    },
    name: async (pos) => {
      if (!state.mapsKey) {
        return null;
      }
      let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.long}&key=${state.mapsKey}`;

      try {
        let resp = await axios.get(url);

        if (resp.data.results) {
          let f = resp.data.results[0]["address_components"];
          return `${f[2]["long_name"]}, ${f[6]["long_name"]}`;
        }
        throw new Exception();
      } catch (error) {
        return "No location data available.";
      }
    },
  },
  getApiKeys: async function() {
    if (state.mapsKey && state.ipstackKey) return true;
    try {
      let resp = await axios.get(`${actions.api}/api-keys`);
      state.ipstackKey = resp.data.ipstack;
      state.mapsKey = resp.data.google_maps;
    } catch (error) {
      return false;
    }
    return true;
  },
  isBlocked: async function (username) {
    try {
      let resp = await axios.get(`${actions.api}/check-blocked/${username}`)
      return resp.data
    } catch (error) {
      return false
    }
  },
  profiledViewed: async function (username) {
    try {
      let resp = await axios.post(`${actions.api}/views`, { "viewee_username" : username })
      return true 
    } catch (error) {
      return false
    }
  }
};

export default state;
