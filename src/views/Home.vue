<template>
  <div class="home">
    <div class="header">
      <Header/>
    </div>
    <div class="content">
      <LandingPage/>
    </div>
    <div class="footer">
      <NavBar/>
    </div>
  </div>
</template>

<script>
import LandingPage from '@/components/LandingPage.vue'
import NavBar from '@/components/NavBar.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'home',
  components: {
    Header,
    LandingPage,
    NavBar
  }
}
</script>

<style>
@import '../assets/styles/ViewStyles.css';
</style>
