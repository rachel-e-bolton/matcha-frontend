<template>
  <form @submit.prevent="resetPassword">
    <div v-if="code">
      new password <input v-model="new_password" type="text" required>
    </div>
    <div v-else>
      old password <input v-model="old_password" type="text" required>
      new password <input v-model="new_password" type="text" required>
    </div>
    <button type="submit">Change Password</button>
  </form>
</template>

<script>
export default {
  data: function () {
    return {
      code: null,
      new_password: null,
      old_password: null
    }
  },
  methods: {
    resetPassword: function () {
      if (this.code) {
        this.resetPasswordwithCode()
      } else {
        this.resetPasswordwithPassword()
      }
    },
    resetPasswordwithCode: function () {
      console.log(this.$store)
      this.$http.put(`${this.$api}/reset-password`, {code: this.code, new_password: this.new_password})
        .then(res => {

        })
        .catch(err => {
          console.log(err.response.data)
        })
      console.log(this.new_password)
    },
    resetPasswordwithPassword: function () {
      
      this.$http.put(`${this.$api}/reset-password`, 
        {previous_password: this.old_password, new_password: this.new_password, user_id: this.user_id}
      ).then(res => {

      })
      .catch(err => {
        console.log(err.response.data)
      })
      console.log(this.new_password)
    },
  },
  mounted: function () {
    this.code = this.$route.query.code
    this.user_id = this.$store.user.id
    if (!this.code && !this.$store.user) {
      alert("Not logged in and no code, redirect to login?")
      //this.$router.push("/login")
    }
  }
}
</script>

<style>

</style>