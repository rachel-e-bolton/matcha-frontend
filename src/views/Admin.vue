<template>
  <div class="login">
    <div class="header">
      <Header />
    </div>
    <div class="content">
      <div v-if="items.length == 0">
        No reports to review.
      </div>
      <div v-else>
        <ReviewBlockRequests v-bind:items="items" @reload="reload"/>
      </div>
    </div>
    <div class="footer">
      <NavBar />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Header from "@/components/HeaderNav.vue";
import ReviewBlockRequests from "@/components/ReviewBlockRequests.vue"

export default {
  name: "admin",
  components: {
    Header,
    NavBar,
    ReviewBlockRequests
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    getBlockRequests: function() {
      return this.$http
        .get(`${this.$api}/block-requests`)
        .then((res) => {
          this.items = res.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    reload: function () {
      this.getBlockRequests();
    }
  },
  created: async function() {
    await this.getBlockRequests();
  },
};
</script>

<style>
@import "../assets/styles/ViewStyles.css";
</style>

