<template>
  <div class="discover">
    <div class="header">
      <Header/>
    </div>
    <div class="content">
      <!-- <ProfileCard/> -->
      <h1 v-for="a in d" :key="a.index">
        <div class="py-3">
          {{ a.username }} ==== {{ Math.ceil(a.distance) }}km <br>
          {{ a.latitude }} {{ a.longitude }}
        </div>
      </h1>
      
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
    axios.get(`${actions.api}/discover?distance=11`)
    .then(resp => {
      this.d = resp.data
    })
  }
}
</script>

<style>
@import '../assets/styles/ViewStyles.css';
</style>
