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
      <reset-password/>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
import NavBar from '@/components/NavBar.vue'
import Header from '@/components/HeaderNav.vue'
import ResetPassword from '@/components/ResetPassword'

export default {
  name: 'login',
  components: {
    Header,
    LoginForm,
    NavBar,
    "reset-password" : ResetPassword
  }
}
</script>


<style>
@import '../assets/styles/ViewStyles.css';
</style>

