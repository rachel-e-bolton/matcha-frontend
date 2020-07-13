<template>
  <div class="mb-4">
    <h4 style="font-weight: 700" class="my-3" @click="changeLoc">Location</h4>
    <div class="d-flex flex-row flex-wrap justify-content-center my-2">
      <div v-if="showLocation" @click="changeLoc" title="Click to update location">
        {{ locationName }}
        <div v-if="!locationName">
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
export default {
  data() {
    return {
      permissionCheck: false,
      showLocation: false,
      mapsKey: '',
      ipstackKey: '',
      locationName: '',
      loading: false
    }
  },
  methods: {
    changeLoc: function () {
      this.permissionCheck = true
      this.showLocation = false
    },

    useIP: function () {
      this.permissionCheck = false
      this.getPositionIP()

    },

    useGPS: function () {
      this.permissionCheck = false
      this.getPositionGPS()
    },

    getPositionIP: function () {
      this.$http.get(`${this.$api}/location`)
      .then(res => {
        if (!res.data.latitude || !res.data.longitude) {
          this.user.latitude = -29.764269
          this.user.longitude = 25.429790
        } else {
          this.user.latitude = res.data.latitude
          this.user.longitude = res.data.longitude
        }
        this.getLocationName()
        this.updateLocation()
      })
      .catch(err => {
        this.user.latitude = -29.764269
        this.user.longitude = 25.429790
        this.getLocationName()
        this.updateLocation()
      })
    },

    getPositionGPS: function () {
      navigator.geolocation.getCurrentPosition(
        position => {
          if (!position.coords.latitude || !position.coords.longitude) {
            this.user.latitude = -29.764269
            this.user.longitude = 25.429790
          } else {
            this.user.latitude = position.coords.latitude
            this.user.longitude = position.coords.longitude
          }
          this.getLocationName()
          this.updateLocation()
        },
        error => {
          this.user.latitude = -29.764269
          this.user.longitude = 25.429790
          this.getLocationName()
          this.updateLocation()
        },
      )
    },

    updateLocation: function () {
      this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.token
      if (this.$store.user.latitude != this.user.latitude || this.$store.user.longitude != this.user.longitude) {
        this.$http
          .put(`${this.$api}/user/${this.user.id}`, {
            user: _.omit(this.user, "images"),
          })
          .then((res) => {
            this.$store.user = _.cloneDeep(this.user);
            localStorage.setItem("firewood", JSON.stringify(this.$store));
          })
          .catch((err) => {
            let test1 = this.$store.user;
            let test2 = this.user;
          });
      }
    },

    getLocationName: async function () {
      delete this.$http.defaults.headers.common["Authorization"]
      this.showLocation = true
      this.loading = true
      this.$http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.user.latitude},${this.user.longitude}&key=${this.mapsKey}`, )
      .then(res => {
        this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.token 
        this.locationName = res.data.results[0].address_components[2].long_name + ", " + res.data.results[0].address_components[6].long_name
        this.showLocation = true
      })
      .catch(err => {
        this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.token
        this.locationName = "No location info available"
        this.showLocation = true
      })
    },

    getAPIKeys: function () {
      return this.$http.get(`${this.$api}/api-keys`)
      .then(res => {
        this.mapsKey = res.data.google_maps
        this.ipstackKey = res.data.ipstack
      })
      .catch(err => {
        console.log(err)
      })
    },
  },
  created: async function () {
    await this.getAPIKeys()
    this.user = _.cloneDeep(this.$store.user)
    if (!this.user.latitude && !this.user.longitude) {
      this.permissionCheck = true
    } else {
      this.getLocationName()
      this.showLocation = true
    }
  }
}
</script>