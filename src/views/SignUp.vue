<template>
  <div class="signup">
    <div class="header">
      <Header/>
    </div>
    <div class="content">
      <SignUpForm/>
    </div>
    <div class="footer">
      <NavBar/>
    </div>
  </div>
</template>

<script>
import SignUpForm from '@/components/SignUpForm.vue'
import NavBar from '@/components/NavBar.vue'
import Header from '@/components/HeaderNav.vue'

export default {
  name: 'signup',
  components: {
    Header,
    SignUpForm,
    NavBar
  }
}
</script>

<style>
@import '../assets/styles/ViewStyles.css';
</style>
