<template>
  <div v-if="myprofile">
    <label for="rating-inline" class="ml-2" style="font-size: 1.25rem">My <strong>Fame</strong> Rating</label>
    <b-form-rating id="rating-inline" inline class="bg-transparent my-3" style="border: none" v-if="this.user" v-model="this.user.heat" readonly size="lg" color="#e05e1b"></b-form-rating>
  </div>
  <div v-else>
    <b-form-rating class="bg-transparent my-3" style="border: none" v-if="this.user" v-model="this.user.heat" readonly size="lg" color="#e05e1b"></b-form-rating>
  </div>
</template>

<script>
export default {
  props: ["user", "myprofile"],
}
</script>