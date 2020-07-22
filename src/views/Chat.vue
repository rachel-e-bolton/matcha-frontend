<template>
  <div>
    <div class="header"><Header /></div>
    <div class="content">
      <div class="mb-2">
        <router-link class="text-secondary" :to="`/profile/${$route.params.username}`">
          View Profile
        </router-link>
      </div>
      <div class="max-w-90 d-flex justify-content-center">
        <b-col sm="auto" md="6" lg="4" class="rounded-lg shadow bg-light">

          <div class="messages" v-for="m in messages" :key="m.index">
            <div v-if="m.from_id == state.user.id" class="float-left">
              <div class="message-content">{{ m.message }}</div>
              <div class="message-date small">{{ m.timestamp }}</div>
            </div>
            <div v-else class="float-right">
              <div class="message-content">{{ m.message }}</div>
              <div class="message-date small">{{ m.timestamp }}</div>
            </div>
          </div>


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

// import {action, state} from '@/store'

import {actions, state, socket} from "@/store"

export default {
  components: { NavBar, Header },
  data: function () {
    return {
      message: null,
      state: state
    }
  },
  computed: {
    messages: function () {
      return state.messages
    }
  },
  methods: {
    sendMessage: function () {
      socket.call.sendMessageTo(state.messaging_user, this.message)
    }
  },
  created: function () {
    console.log(this.$route.params.username)
    socket.call.initiateChat(this.$route.params.username)
  },
  beforeDestroy: function () {
    socket.call.closeChat()
  }
}
</script>

<style>
  .messages {
    height: 100%;
  }
</style>