<template>
  <div>
    <div class="header"><Header /></div>
    <div class="content">
      <div class="max-w-90 d-flex justify-content-center">
        <b-col sm="auto" md="6" lg="4" class="rounded-lg shadow bg-light">
          <div v-for="user in state.online_users" :key="user.index">
            {{ user.username }} is online
          </div>

          <input v-model="message"  type="text">
          <button @click="sendMessage()">send</button>
        
        </b-col>
      </div>
    </div>

    <div class="footer"><NavBar/></div>
  </div>
</template>

<script>

import NavBar from '@/components/NavBar.vue'
import Header from '@/components/HeaderNav.vue'

import {action, state} from '@/store'

// import {actions, state, socket} from "@/store"

export default {
  components: { NavBar, Header },
  data: function () {
    return {
      message: null,
      state: state
    }
  },
  methods: {
    sendMessage: function () {
      socket.call.initiateChat(this.$route.params.username)
      console.log("Sending Message")
    }
  },
  created: function () {
    // Fetch messages from this person
    console.log(this.$route.params.username)
    socket.call.initiateChat(this.$route.params.username)
  },
  beforeDestroy: function () {
    //actions.closeChat()
  }
}
</script>

<style>

</style>