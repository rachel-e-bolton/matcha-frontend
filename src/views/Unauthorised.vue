<template>
  <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div>        
        <b-icon style="width: 5rem; height: 5rem;" class="text-primary" icon="emoji-smile-upside-down"></b-icon>
        <div class="text-centered text-primary mt-4 mb-4">Peeking at things you shouldn’t be? What will your matches think of that…</div>
        <div class="text-centered text-primary mt-4 mb-4"><code style="color: #e05e1b">[404 unauthorised error]</code></div>
        <div><b-link class="text-centered text-secondary mt-4 mb-4" @click='back'>Take me back.</b-link></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'unauthorised',
  methods: {
    back: function () {
      this.$router.go(-2)
    }
  }
}
</script>