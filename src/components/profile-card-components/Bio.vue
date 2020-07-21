<template>
  <div class="container h-100">
    <div>
      <div class="d-flex justify-content-center flex-column align-items-center">
        <router-link :to="`/profile/${this.user.username}`">
        <div class="bio" v-if="user.bio" style="height: 100px; overflow-y: scroll">
          {{ user.bio }}
        </div>
        <div v-else class="">
          <i>I should have something to say about myself. But hopefully a picture is enough...</i>
        </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {actions, state} from "@/store"

export default {
  props: ["user", "myprofile"],
}
</script>

<style scoped>
.bio {
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
}

.bio::-webkit-scrollbar { /* WebKit */
  width: 0;
  height: 0;
}
</style>
