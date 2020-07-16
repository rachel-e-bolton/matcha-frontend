<template>
  <div class="mb-4">
    <h4 style="font-weight: 700" class="my-3" @click="changeLoc">Location</h4>
    <div class="d-flex flex-row flex-wrap justify-content-center my-2">
      <div v-if="showLocation" @click="changeLoc" title="Click to update location">
        {{ locationName }}
        <div v-if="!locationName || loading">
          <b-spinner variant="primary" label="Spinning"></b-spinner>
        </div>
      </div>
      <div class="mx-5" v-if="permissionCheck">
        Use GPS for location?

        <div class>
          <b-button class="bg-danger border-danger m-2" @click="useIP()">No</b-button>
          <b-button class="bg-success border-success m-2" @click="useGPS()">Yes</b-button>
        </div>

        <span class="small">If you select "NO" the app will try to allocate a location for you.<br>
        The accuracy of this placement will be low and may affect the match recommendations you receive.</span>
      </div>
    </div>

  </div>
</template>

<script>

import {actions, state} from "@/store"

export default {
  props: ["user"],
  data() {
    return {
      permissionCheck: false,
      showLocation: false,
      locationName: '',
      loading: false,
      pos: null
    }
  },
  methods: {
    changeLoc: function () {
      this.permissionCheck = true
      this.showLocation = false
    },

    useIP: async function () {
      this.permissionCheck = false
      this.pos = await actions.location.ip()
      this.getLocation()
    },
    useGPS: async function () {
      this.permissionCheck = false
      this.pos = await actions.location.browser()
      this.getLocation()
    },
    getLocation: async function () {
      this.locationName = await actions.location.name(this.pos)
      this.showLocation = true
      this.loading = false
      this.updateLocation()
    },
    updateLocation: function () {
      this.user.latitude = this.pos.lat
      this.user.longitude = this.pos.long
      this.$emit("sync")
      return
    }
  },
  mounted: async function () {
    
    if (!this.user.latitude || !this.user.longitude) {
      this.permissionCheck = true
    } else {
      setTimeout(() => {
        this.pos = {lat: this.user.latitude, long: this.user.longitude}
        this.getLocation()
      }, 500);
    }
  }
}
</script>