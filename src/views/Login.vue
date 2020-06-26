<template>
  <div class="login">
    <div class="header">
      <Header/>
    </div>
    <div class="content">
      <LoginForm/>
    </div>
    <div class="footer">
      <NavBar/>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
import NavBar from '@/components/NavBar.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'login',
  components: {
    Header,
    LoginForm,
    NavBar
  }
}
</script>


<style>
@import '../assets/styles/ViewStyles.css';
</style>

