<template>
  <div class="h-100 d-flex flex-column justify-content-center align-items-center my-5">
    <form @submit.prevent="changeUsername">
      <div>
        <b-input-group>
          <b-form-input v-model="new_username" placeholder="New username here..." required></b-form-input>

          <b-input-group-append>
            <b-button variant="outline-secondary" type="submit">Submit</b-button>
          </b-input-group-append>
        </b-input-group>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      new_username: null,
    }
  },
  methods: {
    changeUsername: function () {
      if (this.new_username != this.$store.user.username) {
        this.$store.user.username = this.new_username
        this.$http.put(`${this.$api}/user/${this.user_id}`, 
          {user: this.$store.user}
        )
        .then(res => {
          this.new_username = null
          localStorage.setItem("firewood", JSON.stringify(this.$store));
          this.$bvToast.toast('Username successfully changed to ' + this.$store.user.username, {
            title: "Success!",
            autoHideDelay: 5000,
            toaster: "b-toaster-top-center",
            variant: "info",
            noCloseButton: false,
          })
        })
        .catch(err => {
          this.$bvToast.toast('Unable to change username. Error: ' + err.response.data.message, {
            title: "Error!",
            autoHideDelay: 5000,
            toaster: "b-toaster-top-center",
            variant: "warning",
            noCloseButton: false,
          })
        })
      } else {
        this.$bvToast.toast(this.new_username + ' is already your username. Try something else.', {
          title: "Error!",
          autoHideDelay: 5000,
          toaster: "b-toaster-top-center",
          variant: "warning",
          noCloseButton: false,
        })
      }
    },
  },
  mounted: function () {
    this.user_id = this.$store.user.id
  }
}
</script>

<style>

</style>