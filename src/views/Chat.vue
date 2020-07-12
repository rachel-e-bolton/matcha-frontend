<template>
  <div>
    Users

    <input v-model="message"  type="text">
    <button @click="send()">send</button>
    
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      message: null
    }
  },
  mounted: function () {
    this.$socket.authenticate(this.$store.token)
  },
  methods: {
    send: function () {
      console.log("Sending Message")
      this.$socket.sendMessage("Hold your cards")
    }
  }
}
</script>

<style>

</style>