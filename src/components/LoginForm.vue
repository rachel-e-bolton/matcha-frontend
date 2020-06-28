<template>
  <div>
    <b-jumbotron header-level="4" bg-variant="secondary" text-variant="white" class="mt-4 py-2" header="Why wait?" lead="On a scale of 1 to 10, you're a 9">
      <p class="font-italic py-0">login now and find the 1 you need</p>
      <img src="../assets/logo-simple.png" alt="Matcha" width="60rem">
    </b-jumbotron>
    <b-container class="mt-4 pr-lg-5">
      <b-row align-h="center">
        <b-col sm="auto" lg="6">
          <b-form @submit.prevent="onSubmit" v-if="show">
            <b-form-group
              id="input-group-1"
              label="Username:"
              label-for="input-1"
              label-cols-md="4"
              label-align-md="right"
              label-align="left"
            >
              <b-form-input
                id="input-1"
                v-model="loginForm.username"
                required
                placeholder="Enter username or email"
              ></b-form-input>
            </b-form-group>

            <b-form-group 
              id="input-group-5"
              label="Password:"
              label-for="input-5"
              label-cols-md="4"
              label-align-md="right"
              label-align="left">
              <b-form-input
                id="input-5"
                v-model="loginForm.password"
                type="password"
                required
                placeholder="Enter password"
              ></b-form-input>
            </b-form-group>

            <div class="d-flex flex-column">
              <router-link class="ml-lg-4 my-1 small text-secondary display-8" to="/passwordreset">Forgot password?</router-link>
              <router-link class="ml-lg-4 my-1 mb-3 small text-secondary display-8" to="/signup">Don't have an account? Signup now.</router-link>
            </div>
            <b-button class="float-right d-none d-md-block d-lg-block d-xl-block" variant="primary" type="submit">Login</b-button>
            <b-button class="btn-block d-md-none d-lg-none d-xl-none py-2" size="lg" variant="primary" type="submit">Login</b-button>

          </b-form>
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        errors: [],
        loginForm: {
          username: '',
          password: ''
        },
        show: true,
        disabled: true,
      }
    },
    mounted: function () {
      let store = this.$store
      debugger;
    },
    methods: {
    onSubmit: function (evt) {
      let self = this
      this.$http.post(`${this.$store.api}/login`, this.loginForm)
        .then(res => {
          if ((self.$http.defaults.headers.common['Authorisation'] = 'Bearer ' + res.data.access_token)
              && (self.$store.user = res.data.user)
              && (self.$store.token = res.data.access_token)) {
                self.$bvToast.toast(res.data.user.username + ' logged in.', {
                title: "Success!",
                autoHideDelay: 2000,
                toaster: "b-toaster-top-center",
                variant: "info",
                noCloseButton: true,
                })
                setTimeout(() => {
                  self.$router.push('/profile')
                }, 1500);
              }
        })
        .catch(err => {
          self.$bvToast.toast(err.response.data.message, {
          title: "Error!",
          autoHideDelay: 5000,
          variant: "danger"
          })
        })
    }
  }
  }
</script>