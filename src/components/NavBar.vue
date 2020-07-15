<template>
  <div v-if="!loggedIn">
    <b-navbar variant="light" class="shadow d-flex align-items-center justify-content-center my--4 px-lg-5" fixed="bottom">
        <b-navbar-nav>
          <b-nav-item></b-nav-item>
          <b-nav-item></b-nav-item>
          <b-nav-item></b-nav-item>
          <b-nav-item></b-nav-item>
        </b-navbar-nav>
    </b-navbar>
  </div>
  <div v-else>
    <div>
      <b-navbar variant="light" type="gray" class="shadow d-flex align-items-center justify-content-center px-lg-5 py-lg-4 text-dark" fixed="bottom">
        <b-navbar-nav class="d-flex align-items-center justify-content-around justify-content-lg-center">
          <b-nav-item to="/profile" class="d-flex flex-column mx-2"><b-icon icon="person-circle"></b-icon><p style="margin-bottom: 0px;">Profile</p></b-nav-item>
          <b-nav-item to="/discover" class="d-flex flex-column mx-2"><b-icon icon="view-list"></b-icon><p style="margin-bottom: 0px;">Discover</p></b-nav-item>
          <b-nav-item to="/search" class="d-flex flex-column mx-2"><b-icon icon="search"></b-icon><p style="margin-bottom: 0px;">Search</p></b-nav-item>
          <b-nav-item to="/matches" class="d-flex flex-column mx-2"><b-icon icon="heart"></b-icon><p style="margin-bottom: 0px;">Matches</p></b-nav-item>

        </b-navbar-nav>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import {actions, state} from "@/store"

export default {
  data() {
    return {
      loggedIn: state.loggedIn
    }
  }
}
</script>