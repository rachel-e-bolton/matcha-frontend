<template>
  <div v-if="home" variant="faded" type="light" class="shadow d-flex align-items-center justify-content-center my--4 px-lg-5" fixed="true">
    <b-navbar >
      <b-navbar-brand href="/">
        <img src="../assets/logo-plum-and-orange.png" class="d-inline-block align-top" alt="Matcha" width="200">
      </b-navbar-brand>
    </b-navbar>
  </div>
  <div v-else>
  <div>
    <!-- Image and text -->
    <b-navbar variant="faded" type="light" class="shadow d-flex align-items-center justify-content-between my--4 px-lg-5" fixed="true">
      <b-navbar-brand href="#">
        <img src="../assets/logo-plum-and-orange.png" class="d-inline-block align-top" alt="Matcha" width="200">
      </b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item-dropdown icon="info" toggle-class="text-decoration-none" right no-caret>
          <template v-slot:button-content>
            <b-icon icon="list" ></b-icon><span class="sr-only">Menu</span>
          </template>
          <b-dropdown-item @click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
  </div>

</template>

<script>
export default {
    data() {
      return {
        home: !this.$store.token,
      }
    },
    methods: {
      logout: function () {
        if ((this.$http.defaults.headers.common['Authorisation'])
          && (this.$store.user)
          && (this.$store.token)) {
          this.$http.defaults.headers.common['Authorisation'] = false
          this.$store.user = false
          this.$store.token = false

          this.$bvToast.toast('Bye. See you again soon!', {
          title: "Logging out",
          autoHideDelay: 2000,
          toaster: "b-toaster-top-center",
          variant: "info",
          noCloseButton: true,
          })
          setTimeout(() => {
            this.$router.push('/')
          }, 1500);
        } else {
          this.$bvToast.toast('Error logging out', {
          title: "Logout error",
          autoHideDelay: 2000,
          toaster: "b-toaster-top-center",
          variant: "warning",
          noCloseButton: true,
          })
        }
      }
    }
}
</script>

<style scoped>
</style>