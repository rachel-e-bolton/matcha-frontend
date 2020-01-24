<template>
  <div id="app" class="page-container">
    <LandingPage msg="welcome to matcha."/>
  </div>
</template>

<script>
import LandingPage from './components/LandingPage.vue'

export default {
  name: 'app',
  components: {
    LandingPage
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.page-container {
  height: 100%;
  width: auto;
  background-image: url("./assets/landing-background-mobile.jpg");
  background-size: 150%;
  background-position: center;
}

.logo {
  width: 90vw;
}

@media screen and (min-width: 1025px) {
  .page-container {
    background-image: url("./assets/landing-background-desktop.jpg");
    background-size: 120%;
  }
  .logo {
    width: 200px;
  }
  
}

</style>
