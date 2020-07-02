<template>
  <div class="login">
    <div class="header">
      <Header/>
    </div>
    <div class="content">
      <Profile v-bind:user="this.$store.user"/>
    </div>
    <div class="footer">
      <NavBar/>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Header from '@/components/HeaderNav.vue'
import Profile from '@/components/Profile.vue'

export default {
  name: 'profile',
  components: {
    Header,
    NavBar,
    Profile
  },
  mounted() {
    console.log(this.$store.user)
  }
}
</script>


<style>
@import '../assets/styles/ViewStyles.css';
</style>