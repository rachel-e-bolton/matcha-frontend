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
                <ChangeUsername :user="user" @sync="syncUser"/>
              </b-card>
            </b-collapse>
          </div>
          
          <div class="mb-4">
            <b-button class="btn-block p-3" v-b-toggle.email>Change Email</b-button>
            <b-collapse id="email" class="m-2">
              <b-card>
                <ChangeEmail :user="user" @sync="syncUser"/>
              </b-card>
            </b-collapse>
          </div>

          <div class="mb-4">
            <b-button class="btn-block p-3" v-b-toggle.password>Change Password</b-button>
            <b-collapse id="password" class="mt-2">
              <b-card>
                <ChangePassword/>
              <a @click.prevent="showModal('reset')" class="my-1 small text-secondary display-8">Forgot password?</a>

              <b-modal ref="reset" hide-footer title="Reset your Password">
                <div class="d-block text-center">
                  <ResetPassword/>
                </div>
              </b-modal>
              </b-card>
            </b-collapse>
          </div>
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
import ChangeEmail from '@/components/ChangeEmail.vue'
import {actions, state} from '@/store'

export default {
  name: 'settings',
  components: {
    Header,
    NavBar,
    ChangePassword,
    ResetPassword,
    ChangeUsername,
    ChangeEmail
  },
  data: function () {
    return {
      user: JSON.parse(JSON.stringify(state.user))
    }
  },
  mounted: function () {
    this.user = actions.snapshotUser()
  },
  methods: {
    showModal(ref) {
      this.$refs[ref].show()
    },

    syncUser: function () {
      actions.syncUser(this.user)
    }
  }
}
</script>


<style>
@import '../assets/styles/ViewStyles.css';
</style>