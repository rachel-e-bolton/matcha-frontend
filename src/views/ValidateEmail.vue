<template>
  <div>Verfifying Email..</div>
</template>

<script>
const axios = require('axios').default;

export default {
  mounted: function () {
    let code = this.$route.query.code

    if (code) {
      axios.get()
    } else {
      alert("FAILED")
    }
  }
}
</script>

<style>

</style>