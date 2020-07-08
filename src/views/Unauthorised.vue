<template>
  <div>
    <div class="header">
      <Header/>
    </div>
    <div class="content-error">
      <div class="h-100 d-flex justify-content-center align-items-center">
        <div>        
          <b-icon style="width: 5rem; height: 5rem;" class="text-primary" icon="emoji-smile-upside-down"></b-icon>
          <div class="text-centered text-primary mt-4 mb-4 px-4">Peeking at things you shouldn’t be? What will your matches think of that…</div>
          <div class="text-centered text-primary mt-4 mb-4"><code style="color: #e05e1b">[404 unauthorised error]</code></div>
          <div><b-link class="text-centered text-secondary mt-4 mb-4" to='/'>Take me back.</b-link></div>
        </div>
      </div>
    </div>
    <div class="footer">
      <NavBar/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/HeaderNav.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    Header,
    NavBar
  }
}
</script>