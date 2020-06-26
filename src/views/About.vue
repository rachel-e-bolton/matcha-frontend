<template>
  <div class="about">
    <div class="header">
      <Header/>
    </div>
    <div class="content">
      Content Elements Here
    </div>
    <div class="footer">
      <NavBar/>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'about',
  components: {
    Header,
    NavBar
  }
}
</script>

<style>
@import '../assets/styles/ViewStyles.css';
</style>
