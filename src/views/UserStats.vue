<template>
  <div>
    <div class="header">
      <Header/>
    </div>
    <div class="content">
      <div class="max-w-90 d-flex justify-content-center">
        <b-col sm="auto" md="6" lg="4" class="rounded-lg shadow bg-light">
          <h3 class="my-3">User Stats</h3>

          <div class="mb-4">
            <b-button class="btn-block p-3" v-b-toggle.liked-users>Liked Users</b-button>
            <b-collapse id="liked-users" class="mt-2">
              <b-card>
                <Likes />
              </b-card>
            </b-collapse>
          </div>
          
          <div class="mb-4">
            <b-button class="btn-block p-3" v-b-toggle.liked-by>Liked By</b-button>
            <b-collapse id="liked-by" class="m-2">
              <b-card>
                <LikedBy />
              </b-card>
            </b-collapse>
          </div>

          <div class="mb-4">
            <b-button class="btn-block p-3" v-b-toggle.viewed-users>Viewed Users</b-button>
            <b-collapse id="viewed-users" class="mt-2">
              <b-card>
                <Views />
              </b-card>
            </b-collapse>
          </div>

          <div class="mb-4">
            <b-button class="btn-block p-3" v-b-toggle.viewed-by>Viewed By</b-button>
            <b-collapse id="viewed-by" class="mt-2">
              <b-card>
                <ViewedBy />
              </b-card>
            </b-collapse>
          </div>

        </b-col>
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
import ViewedBy from '@/components/ViewedBy.vue'
import Views from '@/components/Views.vue'
import LikedBy from '@/components/LikedBy.vue'
import Likes from '@/components/Likes.vue'
import {actions, state} from '@/store'

export default {
  name: 'stats',
  components: {
    Header,
    NavBar,
    ViewedBy,
    Views,
    LikedBy,
    Likes
  },
}
</script>


<style>
@import '../assets/styles/ViewStyles.css';
</style>