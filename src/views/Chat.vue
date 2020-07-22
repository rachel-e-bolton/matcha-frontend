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
          <div class="messages">
            <template v-for="m in messages">

              <div :key="m.index" v-if="m.from_id == state.user.id" class="left message p-3">
                <div class="message-content">{{ m.message }}</div>
                <div class="message-date small">{{ m.timestamp }}</div>
              </div>
              <div v-else :key="m.index" class="right message p-2">
                <div class="message-content">{{ m.message }}</div>
                <div class="message-date small">{{ m.timestamp }}</div>
              </div>
            </template>
          </div>

          <input v-model="message" ref="message" type="text">
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
  watch: {
    messages: function (newVal, oldVal) {
      setTimeout(() => {
        this.$refs.message.scrollIntoView()
    }, 5);
    }
  },
  methods: {
    sendMessage: function () {
      socket.call.sendMessageTo(state.messaging_user, this.message)
      socket.refreshMessages()
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
  .message {
    width: 100%;
  }

  .left {
    background: pink;
  }

</style>