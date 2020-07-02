<template>
  <div>
    some non sense
    {{ code }}
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      code: null
    }
  },
  mounted: function () {
    this.code = this.$route.query.code
  }
}
</script>

<style>

</style>