<template>
  <div>
    <div class="header">
      <Header/>
    </div>
    <div class="content">


      <div class="max-w-90 d-flex justify-content-center">
        <b-col sm="auto" md="6" lg="3" class="rounded-lg shadow bg-light">
          <h3 class="my-3">Settings</h3>

          <div class="mb-4">
            <b-button class="btn-block p-3" v-b-toggle.username>Change Username</b-button>
            <b-collapse id="username" class="mt-2">
              <b-card>
                <ChangeUsername />
              </b-card>
            </b-collapse>
          </div>
          
          <div class="mb-4">
            <b-button class="btn-block p-3" v-b-toggle.email>Change Email</b-button>
            <b-collapse id="email" class="m-2">
              <b-card>
                <p>Change your current email, this action will log you out and require you to reverify your email account</p>
                <input v-model="email" type="text">
                <button @click="updateEmail">Save</button>
              </b-card>
            </b-collapse>
          </div>

          <div class="mb-4">
            <b-button class="btn-block p-3" v-b-toggle.password>Change Password</b-button>
            <b-collapse id="password" class="mt-2">
              <b-card>
                <ChangePassword />
              <a @click.prevent="showModal('reset')" class="my-1 small text-secondary display-8">Forgot password?</a>

              <b-modal ref="reset" hide-footer title="Reset your Password">
                <div class="d-block text-center">
                  <ResetPassword/>
                </div>
              </b-modal>
              </b-card>
            </b-collapse>
          </div>

          <!-- <div class="mb-4">
            <b-button class="btn-danger btn-block p-3" v-b-toggle.del_account>Delete Account</b-button>
            <b-collapse @hide="acceptWarning = false" id="del_account" class="mt-2">
              <b-card>
                <p>This will permanently delete your account and all interactions with other users, there's no going back</p>
                <div v-if="!acceptWarning">
                  <p>Please confirm that you want to delete your account by typing in your existing email</p>
                  <input type="email">
                  <button @click="checkWarning">Ok</button>
                </div>
                <div v-else>
                  <button @click="deleteAccount">Delete Account</button>
                </div>
              </b-card>
            </b-collapse>
          </div> -->
        </b-col>
      </div>

    </div>
    <div class="footer">
      <NavBar/>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Header from '@/components/HeaderNav.vue'
import ChangePassword from '@/components/ChangePassword.vue'
import ResetPassword from '@/components/ResetPassword.vue'
import ChangeUsername from '@/components/ChangeUsername.vue'

export default {
  name: 'settings',
  components: {
    Header,
    NavBar,
    ChangePassword,
    ResetPassword,
    ChangeUsername
  },
  data: function () {
    return {
      username: null,
      password: null,
      email: null,
      acceptEmail: null,
      acceptWarning: false
    }
  },
  methods: {
    showModal(ref) {
      this.$refs[ref].show()
    },
    updateUsername: function () {
      console.log("Updating Username")
    },
    updatePassword: function () {
      console.log("Updating Password")
    },
    updateEmail: function () {
      console.log("Updating Email")
    },
    checkWarning: function () {
      console.log("Check if email is correct")
    },
    deleteAccount: function () {
      console.log("Deleting Account")
    }
  }
}
</script>


<style>
@import '../assets/styles/ViewStyles.css';
</style>