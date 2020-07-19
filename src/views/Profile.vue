<template>
  <div class="login">
    <div class="header">
      <Header/>
    </div>
    <div class="content">
      <div class="max-w-90 d-flex justify-content-center" v-if="user.id">
        <b-col sm="auto" md="6" lg="4" class="rounded-lg shadow bg-light">
          <div id="profile">
            <div id="fame-rating">
              <FameRating :user="user" :myprofile="myprofile" class="mx-md-5"/>
            </div>
            <div id="images">
              <Images :user="user" :myprofile="myprofile"/>
            </div>
            <!-- <div id="online">

            </div> -->
            <div id="personal-details">
              <PersonalDetails :user="user" :myprofile="myprofile" @sync="syncUser" class="mx-md-5"/>
            </div>
            <div id="location">
              <Location :user="user" :myprofile="myprofile" @sync="syncUser" class="mx-md-5"/>
            </div>
            <div id="bio">
              <Bio :user="user" :myprofile="myprofile" @sync="syncUser" />
            </div>
            <div id="interests">
              <Interests :user="user" :myprofile="myprofile" @sync="syncUser" class="mx-md-5 my-3"/>
            </div>
            <div id="sexual-preferences">
              <SexualPrefs :user="user" :myprofile="myprofile" @sync="syncUser" class="mx-md-5 my-3"/>
            </div>
            <div v-if="!myprofile" id="other-actions">
              <Actions :user="user" />
            </div>
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
import FameRating from '@/components/profile-components/FameRating.vue'
import Images from '@/components/profile-components/Images.vue'
import PersonalDetails from '@/components/profile-components/PersonalDetails'
import SexualPrefs from '@/components/profile-components/SexualPrefs'
import Interests from '@/components/profile-components/Interests'
import Bio from '@/components/profile-components/Bio'
import Location from '@/components/profile-components/Location'
import Actions from '@/components/profile-components/Actions'

import {actions, state} from "@/store"
import axios from 'axios'

export default {
  name: 'profile',
  components: {
    SexualPrefs,
    Interests,
    Header,
    NavBar,
    FameRating,
    Images,
    PersonalDetails,
    Bio,
    Location,
    Actions
  },
  data: function () {
    return {
      user: {},
      myprofile: false
    }
  },
  beforeMount: function () {
    if (this.$route.params.username !== undefined) {
      this.myprofile = this.$route.params.username === state.user.username
    }
  },
  created: async function () {
    if (this.myprofile) {
      this.user = actions.snapshotUser()
    } else {
      try {
        let resp = await axios.get(`${actions.api}/user/${this.$route.params.username}`)
        this.user = resp.data
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404)
            this.$router.push({name : "notfound" })
        }
      }
    }
  },
  methods: {
    // syncUser: () => actions.syncUser(this.user)
    syncUser: function () {
      if (this.myprofile)
        actions.syncUser(this.user)
    }
  }
}
</script>


<style>
@import '../assets/styles/ViewStyles.css';
</style>