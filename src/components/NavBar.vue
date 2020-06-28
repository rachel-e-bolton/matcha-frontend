<template>
  <div v-if="home" variant="faded" type="light" class="shadow d-flex align-items-center justify-content-center my--4 px-lg-5" fixed="true">
    <b-navbar >
        <b-navbar-nav>
        </b-navbar-nav>
    </b-navbar>
  </div>
  <div v-else>
    <div>
      <b-navbar variant="faded" type="light" class="shadow d-flex align-items-center justify-content-between my--4 px-lg-5" fixed="true">
        <b-navbar-nav class="d-flex align-items-center justify-content-between justify-content-lg-center">
          <b-nav-item href="/profile">Profile</b-nav-item>
          <b-nav-item href="/discover">Discover</b-nav-item>
          <b-nav-item href="/search">Search</b-nav-item>
          <b-nav-item href="/matches">Matches</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      home: !this.$store.token,
    }
  }
}
</script>