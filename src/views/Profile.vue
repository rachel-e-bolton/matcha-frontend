<template>
  <div class="login">
    <div class="header">
      <Header/>
    </div>
    <div class="content">
      <div class="max-w-90 d-flex justify-content-center">
        <b-col sm="auto" md="6" lg="4" class="rounded-lg shadow bg-light">
          <div id="profile">
            <div id="fame-rating">
              
            </div>
            <div id="images">
              
            </div>
            <div id="online">

            </div>
            <!-- <div id="online">

            </div> -->
            <div id="personal-details">
              <PersonalDetails />
            </div>
            <div id="location">

            </div>
            <div id="bio">

            </div>
            <div id="interests">
              <Interests/>
            </div>
            <div id="sexual-preferences">
              <SexualPrefs/>
            </div>
            <div id="other-actions">
             
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

import SexualPrefs from '@/components/profile-components/SexualPrefs'
import Interests from '@/components/profile-components/Interests'

export default {
  name: 'profile',
  components: {
    SexualPrefs,
    Interests,
    Header,
    NavBar,
    FameRating,
    Images,
    PersonalDetails
  }
}
</script>


<style>
@import '../assets/styles/ViewStyles.css';
</style>