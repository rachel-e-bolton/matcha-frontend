<template>
  <div>
    <div v-if="rating > 0">
      <span class="small">You have rated this user:<br></span>
      <b-form-rating color="#e05e1b" style="border: none" v-model="rating" readonly></b-form-rating>
    </div>
    <div v-else>
      <b-link @click="rateUser"><b-form-rating name="rating" variant="secondary" style="border: none" v-model="rating"></b-form-rating></b-link>
      <span class="small">Rate your experience getting to know this match.<br>You can only do this once.</span>
    </div>
  </div>
</template>

<script>
import {actions} from '@/store'
export default {
  props: ["user"],
  data() {
    return {
      rating: null
    }
  },
  methods: {
    rateUser: function () {    
    this.$http.put(`${this.$api}/rating/${this.user.id}`, {rating: this.rating})
    .then((res) => {
      actions.notify.info("User rated!")
    })
    .catch((err) => {
      console.log(err)
    })
    }
  },
  created: function () {
    this.$http.get(`${this.$api}/rating/${this.user.id}`)
    .then((res) => {
      this.rating = res.data.rating
    })
    .catch((err) => {
      console.log(err)
    })
  }
}
</script>