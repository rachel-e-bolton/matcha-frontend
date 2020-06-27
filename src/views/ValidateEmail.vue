<template>
  <div>Verfifying Email..</div>
</template>

<script>
const axios = require('axios').default;

export default {
  mounted: function () {
    // let code = this.$route.query.code

    let test = this.$store

    console.log(test)

    // if (code) {
    //   axios.get(`${this.$store.api}/validate/${code}`)
    // } else {
    //   alert("FAILED")
    // }
  }
}
</script>

<style>

</style>