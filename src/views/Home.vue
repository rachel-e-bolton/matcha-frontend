<template>
  <div class="home">
    <div class="header">
      <Header/>
    </div>
    <div class="content">
      <LandingPage/>
    </div>
    <div class="footer">
      <!-- <NavBar/> -->
    </div>
  </div>
</template>

<script>
import LandingPage from '@/components/LandingPage.vue'
// import NavBar from '@/components/NavBar.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'home',
  components: {
    Header,
    LandingPage,
    // NavBar
  }
}
</script>

<style>
.home {
  height: 100%;
  width: auto;
  background-image: url('../assets/landing-background-mobile.jpg');
  background-size: 150%;
  background-position: center;
}

@media screen and (min-width: 1025px) {
  .home {
    background-image: url('../assets/landing-background-desktop.jpg');
    background-size: 120%;
  } 
}

.header {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 70px;
  overflow: hidden;
  background-color: #eec643;
}


.footer {
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 70px;
  overflow: hidden;
  background-color: #eec643;
}

.content {
  position: absolute;
  top: 70px;
  bottom: 70px;
  right: 0px;
  left: 0px;
  overflow: auto;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.content::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE and Edge */
.content {
    -ms-overflow-style: none;
}

@media only screen and (min-width: 768px) and (max-width: 1024px) {
  .header {
    height: 120px;
  }

  .footer {
    height: 120px;
  }
  
  .content {
    top: 120px;
    bottom: 120px;
  }
}
</style>
