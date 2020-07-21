<template>
  <div v-if="relationship" class="mb-3 p-md-2">
    <Report class="small mt-1 mb-3" :user="user"/>
    <div v-if="relationship.matched && relationship.liked">
      <b-card class="border-none shadow-sm rounded text-dark" >
        Things are looking <span class="text-secondary"><strong>HOT</strong></span> in here.<br>You should get chatting.<br><hr>
        <b-link>Go to chat</b-link><hr>
        <Rate :user="user" /><hr>
        <b-link @click="unmatch" class="text-danger">UNMATCH</b-link>
      </b-card>
    </div>
    <div v-else-if="!relationship.matched && relationship.liked">
      <b-card class="border-none shadow-sm rounded text-dark" >
        You've already <span class="text-secondary" style="font-weight: 700px"><strong>LIKED</strong></span> this user.<br>Fingers crossed they'll like you back.<br><hr>
        <b-link @click="unmatch" class="text-danger">UNLIKE</b-link>
      </b-card>
    </div>
    <div v-else-if="!relationship.matched && !relationship.liked">
      <b-card class="border-none shadow-sm rounded text-dark" >
        This could be the <span class="text-secondary"><strong>ONE</strong></span>.<br>What are you waiting for?<br><hr>
        <b-link @click="likeUser" class="">LIKE</b-link>
      </b-card>
    </div>
    <div v-else>
      Could not determine relationship. Please refresh.
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {actions, state} from '@/store'
import Report from '@/components/profile-components/Report'
import Rate from '@/components/profile-components/Rate'

export default {
  props: ["user"],
  components: {
    Report,
    Rate
  },
  data() {
    return {
      relationship: null
    }
  },
  methods: {
    likeUser: function () {
      axios.post(`${this.$api}/matches`, {"matchee_id" : this.user.id})
      .then(res => {
        actions.notify.info(res.data.message)
        this.checkMatch()
      })
      .catch(err => {
        if (err.response.data.no_photo) {
          actions.notify.error(err.response.data.message)
        } else {
          actions.notify.error(err.response.data.message)
        }
      })
    },

    unmatch: function () {
      axios.delete(`${this.$api}/unmatch/${this.user.id}`)
      .then(res => {
        actions.notify.warning("User relationship removed. You will no longer see this user on the site.")
        setTimeout(() => {
          this.$router.go(-1)
        }, 1500)
      })
      .catch(err => {
        actions.notify.error("Could not remove user relationship. Please contact an admin. " + err)
      })
    },

    checkMatch: function () {
      axios.get(`${this.$api}/match/${this.user.id}`)
      .then(res => {
        this.relationship = res.data
      })
      .catch(err => {
        actions.notify.error("There was a problem loading some data. Notice of this error has been sent to admins.")
      })
    }
  },
  created: function () {
    this.checkMatch()
  }
}
</script>