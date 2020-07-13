<template>
  <div v-if="home">
    <b-navbar variant="light" class="shadow d-flex align-items-center justify-content-center my--4 px-lg-5" fixed="top">
      <b-navbar-brand href="/">
        <img src="../assets/logo-plum-and-orange.png" class="d-inline-block align-top" alt="Matcha" width="200">
      </b-navbar-brand>
    </b-navbar>
  </div>
  <div v-else>
  <div>
    <b-navbar variant="light" class="shadow d-flex align-items-center justify-content-between my--4 px-lg-5" fixed="top">
      <b-navbar-brand href="#">
        <img src="../assets/logo-plum-and-orange.png" class="d-inline-block align-top" alt="Matcha" width="200">
      </b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item-dropdown icon="info" toggle-class="text-decoration-none" variant="light" right no-caret>
          <template v-slot:button-content>
            <b-icon icon="list" ></b-icon><span class="sr-only">Menu</span>
          </template>
          <b-dropdown-item @click="logout"><b-icon icon="box-arrow-right" class="mr-2 text-secondary"></b-icon>Logout</b-dropdown-item>
          <b-dropdown-item to='/settings'><b-icon icon="gear" class="mr-2 text-secondary"></b-icon>Settings</b-dropdown-item>
          <b-dropdown-item v-if="isAdmin" to='/admin'><b-icon icon="shield-lock" class="mr-2 text-secondary"></b-icon>Admin Panel</b-dropdown-item>
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
        isAdmin: this.$store.user.is_admin
      }
    },
    methods: {
      logout: function () {
        if ((this.$http.defaults.headers.common['Authorization'])
          && (this.$store.user)
          && (this.$store.token)) {
          this.$http.defaults.headers.common['Authorization'] = false
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
            localStorage.removeItem("firewood")
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