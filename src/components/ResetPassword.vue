<template>
  <form @submit.prevent="resetPassword()">
    <div>Reset your password</div>
    Your email <input v-model="email" type="email" required>
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
      this.$http.post(`${this.$api}/reset-password-request`, {email: this.email})
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    }
  }
}
</script>

<style>

</style>