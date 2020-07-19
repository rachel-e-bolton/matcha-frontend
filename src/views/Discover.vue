<template>
  <div class="discover">
    <div class="header">
      <Header/>
    </div>
    <div class="content">
      <!-- <ProfileCard/> -->
      <h3 v-for="a in d" :key="a.index">
        <div class="py-3">
          {{ a.fname }} ==== {{ Math.ceil(a.distance) }}km <br>
          {{ a.latitude }} {{ a.longitude }}
        </div>
      </h3>
      
    <pre>{{d}}</pre>
    </div>
    <div class="footer">
      <NavBar/>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Header from '@/components/HeaderNav.vue'
import ProfileCard from '@/components/ProfileCard.vue'

import {actions, state} from "@/store"
import axios from "axios"

export default {
  name: 'discover',
  data: function () {
    return {
      d: {}
    }
  },
  components: {
    Header,
    ProfileCard,
    NavBar
  },
  mounted: function () {
    axios.get(`${actions.api}/discover?skip=0&take=100&distance=1000`)
    .then(resp => {
      this.d = resp.data
    })
  }
}
</script>

<style>
@import '../assets/styles/ViewStyles.css';
</style>
