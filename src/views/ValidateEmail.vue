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
        <b-form ref="form" @submit.prevent="reSubmit">
          <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
            <b-input v-model="email" type="email" placeholder="Email" required></b-input>
          </b-input-group>
            <div>{{ emailError }}</div>
          <b-button type="submit" class="mt-2 w-100" variant="primary">Resend Verification</b-button>
        </b-form>
      </div>
      <div v-if="resubmitted">        
        <b-icon style="width: 5rem; height: 5rem;" class="text-primary" icon="envelope"></b-icon>
        <div class="text-centered text-primary mt-4 mb-4">Email has been sent to {{ email }}!</div>
      </div>
      <div v-if="success">        
        <b-icon style="width: 5rem; height: 5rem;" class="text-primary" icon="check2"></b-icon>
        <div class="text-centered text-primary mt-4 mb-4">Thank you for verifying your account. Redirecting to <a href="/login">login</a></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      verifying : true,
      failed : false,
      errorMessage: "",
      code: this.$route.query.code,
      email: null,
      emailError: "",
      resubmitted: false,
      success : false
    }
  },
  methods: {
    reSubmit: function () {
      this.$http.post(`${this.$store.api}/validate/resubmit/${this.email}`).then(() => {
        this.failed = false
        this.resubmitted = true
        setTimeout(() => {
          this.$router.push("/login")
        }, 3000);
      })
    }
  },
  mounted: function () {

    if (this.code) {
      this.$http.get(`${this.$api}/validate/${this.code}`)
        .then(res => {
          this.verifying = false
          this.success = true
          setTimeout(() => {
            this.$router.push("/login")
          }, 3000);
        })
        .catch(error => {
          this.verifying = false
          this.failed = true
          this.errorMessage = error.response.data.message
        })
    } else {
      this.verifying = false
      this.failed = true
      this.errorMessage = "This email address could not be verified"
    }
  }
}
</script>

<style>

</style>