<template>
  <div class="home" >
    <div class="d-flex justify-content-center">
      <img src="../assets/logo-plum-and-orange.png" class="d-inline-block align-top py-3" alt="Matcha" width="300">      
    </div>
    <div class="d-flex h-50 align-items-center justify-content-center text-white mx-2" style="font-size: 85%">
      <span>
        By clicking Login or Sign Up you agree to our 
        <b-link style="text-decoration: underline" class="text-white text-decoration-underline" @click="showModal('terms')">Terms</b-link>. 
        <br>Learn how we process your data in our 
        <b-link style="text-decoration: underline" class="text-white" @click="showModal('privacy')">Privacy Policy</b-link>.
      </span>
    </div>
    <div fixed="bottom" class="d-md-none d-lg-none d-xl-none px-4 mt-5 pt-5 d-flex flex-column justify-content-center">
      <b-button class="btn-block" pill>Login</b-button>
      <b-button class="btn-block" pill>Sign Up</b-button>
    </div>
    <div fixed="bottom" class="d-none d-md-flex d-lg-flex d-xl-flex px-4 mt-5 pt-5 flex-row justify-content-center">
      <b-button href="/login" style="width: 200px; margin-top: 100px" class="mx-2" pill>Login</b-button>
      <b-button href="/signup" style="width: 200px; margin-top: 100px" class="mx-2" pill>Sign Up</b-button>
    </div>

    <b-modal ref="terms" hide-footer title="Terms of Use">
      <div class="d-block text-center">
        
      </div>
    </b-modal>

    <b-modal ref="privacy" hide-footer title="Privacy Policy">
      <div class="d-block text-center">
        
      </div>
    </b-modal>

  </div>
</template>

<script>
export default {
  name: 'home',
  components: {

  },
  methods: {
    showModal(ref) {
      this.$refs[ref].show()
    }
  }
}
</script>

<style>
@import '../assets/styles/ViewStyles.css';
</style>
