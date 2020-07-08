<template>
  <div class="login">
    <div class="header">
      <Header/>
    </div>
    <div class="content">

    </div>
    <div class="footer">
      <NavBar/>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Header from '@/components/HeaderNav.vue'

export default {
  name: 'settings',
  components: {
    Header,
    NavBar
  }
}
</script>


<style>
@import '../assets/styles/ViewStyles.css';
</style>