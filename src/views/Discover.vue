<template>
  <div class="discover">
    <div class="header">
      <Header/>
    </div>
    <div class="content">
      <ProfileCard/>
    </div>
    <div class="footer">
      <NavBar/>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Header from '@/components/Header.vue'
import ProfileCard from '@/components/ProfileCard.vue'

export default {
  name: 'discover',
  components: {
    Header,
    ProfileCard,
    NavBar
  }
}
</script>

<style>
@import '../assets/styles/ViewStyles.css';
</style>
