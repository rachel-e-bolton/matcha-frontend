<template>
  <form @submit.prevent="resetPassword()">
    <div>Reset your password</div>
    Your email <input v-bind="email" type="email" required>
    <button type="submit">Reset</button>
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
      this.$http.post(`${this.$store.api}/reset-password-request`, {email: this.email})
        .then(res => {

        })
        .catch(err => {

        })
    }
  }
}
</script>

<style>

</style>