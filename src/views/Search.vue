<template>
  <div class="discover">
    <div class="header">
      <Header/>
    </div>
    <div class="content">

      <div v-if="loading">
        <div class="mt-5 d-flex flex-column justify-content-center align-items-center">
          <b-spinner style="width: 5rem; height: 5rem;" class="mt-5" variant="primary"></b-spinner>
          <div class="text-centered text-primary mt-4">Herding the fish...</div>
        </div>
      </div>
      <div v-else class="d-flex flex-column flex-md-row justify-content-center align-items-center flex-wrap">
        <ProfileCard v-for="a in data" :key="a.index" :user="a"/>
      </div>
      
    </div>
    <div class="footer">
      <NavBar/>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Header from '@/components/HeaderNav.vue'
import ProfileCard from '@/components/ProfileCardRachel.vue'

import {actions, state} from "@/store"
import axios from "axios"

export default {
  name: 'search',
  data: function () {
    return {
      loading: true
    }
  },
  components: {
    Header,
    ProfileCard,
    NavBar
  },
  mounted: function () {
    axios.get(`${actions.api}/discover?skip=0&take=100&distance=4000`)
    .then(resp => {
      this.data = resp.data
      this.loading = false
    })
  }
}
</script>

<style>
@import '../assets/styles/ViewStyles.css';
</style>