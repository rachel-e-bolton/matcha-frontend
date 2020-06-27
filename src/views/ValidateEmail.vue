<template>
  <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div v-if="verifying">
        <b-spinner style="width: 5rem; height: 5rem;" variant="primary"></b-spinner>
        <div class="text-centered text-primary mt-4">Verifying your email</div>
      </div>
      <div v-if="failed">
        <b-icon style="width: 5rem; height: 5rem;" class="text-primary" icon="x-circle"></b-icon>
        <div class="text-centered text-primary mt-4 mb-4">{{ errorMessage }}</div>
        <b-form inline>

          <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
            <b-input id="inline-form-input-username" placeholder="Email"></b-input>
          </b-input-group>

          <b-button variant="primary">Resend Verification</b-button>
        </b-form>


      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios').default;


export default {
  data: function () {
    return {
      verifying : true,
      failed : false,
      errorMessage: ""
    }
  },
  mounted: function () {
    let code = this.$route.query.code

    

    if (code) {
      axios.get(`${this.$store.api}/validate/${code}`)
        .then(res => {

          this.$router.push("/")
        })
        .catch(error => {

          this.verifying = false
          this.failed = true

          this.errorMessage = error.response.data.message
        })
    } else {
      this.$router.push("/")
    }
  }
}
</script>

<style>

</style>