<template>
  <div class="home">
    <LandingPage msg="welcome to matcha."/>
  </div>
</template>

<script>
// @ is an alias to /src
import LandingPage from '@/components/LandingPage.vue'

export default {
  name: 'home',
  components: {
    LandingPage
  }
}
</script>

<style>
.home {
  height: 100%;
  width: auto;
  background-image: url('../assets/landing-background-mobile.jpg');
  background-size: 150%;
  background-position: center;
}

@media screen and (min-width: 1025px) {
  .home {
    background-image: url('../assets/landing-background-desktop.jpg');
    background-size: 120%;
  } 
}
</style>
