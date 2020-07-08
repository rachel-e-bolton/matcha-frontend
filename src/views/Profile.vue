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
              <FameRating />
            </div>
            <div id="images">
              <Images />
            </div>
            <div id="online">

            </div>
            <div id="personal-details">
              <div id="full-name">
                
              </div>
              <div id="age-gender">
                
              </div>
            </div>
            <div id="location">

            </div>
            <div id="bio">

            </div>
            <div id="interests">

            </div>
            <div id="sexual-preferences">

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

export default {
  name: 'profile',
  components: {
    Header,
    NavBar,
    FameRating,
    Images
  }
}
</script>


<style>
@import '../assets/styles/ViewStyles.css';
</style>