<template>
  <div>
    <b-form-rating class="bg-transparent my-3" style="border: none" v-if="this.$store.user" v-model="this.$store.user.heat" readonly size="lg" color="#e05e1b"></b-form-rating>
  </div>
</template>

<script>
export default {
  
}
</script>