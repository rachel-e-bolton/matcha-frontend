<template>
  <div>
    <b-container class="mt-4 pr-lg-5">
      <b-row align-h="center">
        <b-card
          v-for="(n, index) in pageOffset"
          :key="index"
          no-body
          class="overflow-hidden m-2"
          style="max-width: 600px"
        >
          <b-row no-gutters>
            <b-col sm="6">
              <b-card-img
                :src="defaultImage"
                alt="Image"
                class="rounded-0"
                v-if="!profiles[index].photos || !profiles[index].photos.image64"
              ></b-card-img>
              <b-card-img
                :src="profiles[index].photos.image64"
                alt="Image"
                class="rounded-0"
                v-else
              ></b-card-img>
            </b-col>
            <b-col sm="6">
              <b-card-body :title="profiles[index].fname + ' ' + profiles[index].lname">
                <b-card-text>{{profiles[index].bio}}</b-card-text>
                <b-card-text>{{profiles[index].gender}}</b-card-text>
                <b-card-text>{{profiles[index].online}}</b-card-text>
                <b-card-text>{{profiles[index].lastseen}}</b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-row>
      <footer>
        <div ref="infiniteScrollTrigger" id="scroll-trigger"></div>
        <div class="circle-loader" v-if="showLoader"></div>
      </footer>
    </b-container>
  </div>
</template>

<script>
import users from "../assets/temp.json";
export default {
  data: () => {
    return {
      currentPage: 1,
      maxPerPage: 10,
      showLoader: false,
      totalResults: Object.keys(users).length,
      profiles: users,
      defaultImage:
        "data:image/png;base64,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"
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalResults / this.maxPerPage);
    },
    pageOffset() {
      if (this.maxPerPage * this.currentPage <= this.totalResults)
        return this.maxPerPage * this.currentPage;
      else return this.totalResults;
    }
  },
  methods: {
    scrollTrigger() {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (
            entry.intersectionRatio > 0 &&
            this.currentPage < this.pageCount
          ) {
            this.showLoader = true;
            setTimeout(() => {
              this.currentPage += 1;
              this.showLoader = false;
            }, 2000);
          }
        });
      });

      observer.observe(this.$refs.infiniteScrollTrigger);
    }
  },
  mounted() {
    this.scrollTrigger();
  }
};
</script>

<style lang="scss" scoped>
footer {
  position: relative;
  height: 100px;

  #scroll-trigger {
    height: 50px;
  }

  .circle-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 5px solid rgba(255, 255, 255, 0.2);
    border-top: 5px solid #fff;
    animation: animate 1.5s infinite linear;
  }
}

@keyframes animate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>