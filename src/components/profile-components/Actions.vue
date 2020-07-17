<template>
  <div v-if="relationship" class="mb-3 p-md-2">
    <Report class="small my-2" :user_id="user.id"/>
    <div v-if="relationship.matched && relationship.liked">
      <b-card class="border-none shadow-sm rounded text-dark" >
        Things are looking <span class="text-secondary"><strong>HOT</strong></span> in here.<br>You should get chatting.<br><hr>
        <b-link>Go to chat</b-link><hr>
        <Rate :user_id="user.id" /><hr>
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
      this.$forceUpdate()
    },

    unmatch: function () {
      console.log("unmatching")
      this.$forceUpdate()
    },

    deleteMatch: function () {

    },

    blockUser: function () {

    }
  },
  created: function () {
    axios.get(`${this.$api}/match/${this.user.id}`)
    .then(res => {
      console.log(res)
      this.relationship = res.data
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>