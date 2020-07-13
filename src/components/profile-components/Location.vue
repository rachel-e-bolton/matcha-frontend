<template>
  <div class="mb-4">
    <h4 style="font-weight: 700" class="my-3">Location</h4>
    <div class="d-flex flex-row flex-wrap justify-content-center my-2">
      <div v-if="showLocation">
        {{ getLocationName() }}
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
      permissionCheck: true,
      showLocation: false
    }
  },
  methods: {
    useIP: function () {
      this.permissionCheck = false

    },

    useGPS: function () {
      this.permissionCheck = false
    },

    getLocationName: function () {

    }
  },
  created() {
    this.user = _.cloneDeep(this.$store.user)
    if (!this.user.latitude && !this.user.longitude) {
      this.permissionCheck = true
    }
  }
}
</script>