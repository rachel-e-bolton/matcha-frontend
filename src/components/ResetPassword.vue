<template>
  <form @submit.prevent="resetPassword()">
    <div class="my-2">Enter your email to have a reset password link sent to you.</div>
    <b-input-group>
      <b-form-input v-model="email" type="email" placeholder="Your email here..." required></b-form-input>

      <b-input-group-append>
        <b-button variant="outline-secondary" type="submit">Reset</b-button>
      </b-input-group-append>
    </b-input-group>
  </form>
</template>

<script>
export default {
  data: function () {
    return {
      email: null
    }
  },
  methods: {
    resetPassword: function () {
      this.$http.post(`${this.$api}/reset-password-request`, {email: this.email})
        .then(res => {
          this.$bvToast.toast('Reset password email sent to ' + this.email, {
            title: "Success!",
            autoHideDelay: 5000,
            toaster: "b-toaster-top-center",
            variant: "info",
            noCloseButton: false,
          })

          setTimeout(() => {
            this.$router.push('/')
          }, 3000);
        })
        .catch(err => {
          this.$bvToast.toast('Unable to send reset email. Error: ' + err.response.data.message, {
            title: "Error!",
            autoHideDelay: 5000,
            toaster: "b-toaster-top-center",
            variant: "warning",
            noCloseButton: false,
          })

          setTimeout(() => {
            this.$router.push('/')
          }, 3000);
        })
    }
  }
}
</script>

<style>

</style>