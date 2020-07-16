<template>
  <div class="h-100 d-flex flex-column justify-content-center align-items-center my-5">
    <form @submit.prevent="changeEmail">
      <div>
        <b-input-group>
          <p>Changing your current email will log you out and require you to reverify your email account.</p>
          <b-form-input v-model="user.email" placeholder="New email here..." required></b-form-input>

          <b-input-group-append>
            <b-button variant="outline-secondary" type="submit">Submit</b-button>
          </b-input-group-append>
        </b-input-group>
      </div>
    </form>
  </div>
</template>

<script>
import {actions} from '@/store'

export default {
  props: ["user"],
  methods: {
    changeEmail: function () {
      this.$emit("sync")
      actions.logoutUser()
    },
  },
  mounted: function () {
    this.user_id = this.$store.user.id
  }
}
</script>

<style>

</style>