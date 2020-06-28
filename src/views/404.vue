<template>
  <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div>        
        <b-icon style="width: 5rem; height: 5rem;" class="text-primary" icon="emoji-dizzy"></b-icon>
        <div class="text-centered text-primary mt-4 mb-4">Trying to find love? Looks like you’ve found nothing…</div>
        <div class="text-centered text-primary mt-4 mb-4"><code style="color: #e05e1b">[404 page error]</code></div>
        <div><b-link class="text-centered text-secondary mt-4 mb-4" @click='back'>Take me back.</b-link></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back: function () {
      this.$router.go(-1)
    }
  }
}
</script>