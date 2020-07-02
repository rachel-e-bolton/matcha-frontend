<template>
  <b-row>
    <b-col>
      <div id="profile">
        <div id="fame-rating">

        </div>
        <div id="photo-carousel">
          
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
        <div v-if="user.username != loggedInUser.username" id="other-actions">
          <div id="report">

          </div>
          <div id="like">
            
          </div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: ['user']
}
</script>