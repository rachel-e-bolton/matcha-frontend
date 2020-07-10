<template>
  <div id="app">
    {{ response }}
    <router-view/>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
/* @import '../../node_modules/@voerro/vue-tagsinput/dist/style.css'; */

#app {
  font-family: 'Noto Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
