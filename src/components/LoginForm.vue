<template>
  <div>
    <b-jumbotron header-level="5" bg-variant="secondary" text-variant="white" class="mt-4 py-2" header="Why wait?" lead="On a scale of 1 to 10, you're a 9">
      <div class="font-italic mt--4 my--2">login now and find the 1 you need</div>
      <img src="../assets/logo-simple.png" alt="Matcha" width="50rem">
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
              <b-link @click.prevent="showModal('reset')" class="ml-lg-4 my-1 small text-secondary display-8">Forgot password?</b-link>

              <b-modal ref="reset" hide-footer title="Reset your Password">
                <div class="d-block text-center">
                  <ResetPassword/>
                </div>
              </b-modal>
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
  import ResetPassword from '@/components/ResetPassword'
  import {actions, state} from "@/store"

  export default {
    components: {ResetPassword},
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
    methods: {
    showModal(ref) {
      this.$refs[ref].show()
    },
    onSubmit: async function (evt) {

      let login = await actions.loginUser(this.loginForm.username, this.loginForm.password)

      if (!login) {}
        
      else {
        try {
          this.$router.push(`/profile/${this.loginForm.username}`)
        } catch (error) {
          actions.notify.error("Error logging in, please contact an admin.")
        }
      }
    }
  }
  }
</script>