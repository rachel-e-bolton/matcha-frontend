<template>
  <div id="app">
    <img alt="Vue logo" class="logo" src="./assets/logo-mustard.png">
    <LandingPage msg="Welcome to matcha"/>
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
  margin-top: 60px;
}

.logo {
  width: 90vw;
}
</style>
