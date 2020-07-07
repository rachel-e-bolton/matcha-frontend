<template>
  <div>
    <b-container class="mt-4 pr-lg-5">
      <b-row align-h="center">
        <b-card v-for="(n, index) in pageOffset" :key="index" no-body class="overflow-hidden" style="max-width: 700px">
          <b-row no-gutters>
            <b-col md="6">
              <!-- src="../assets/pic2.png" -->
              <b-card-img
                :src="'https://i.pravatar.cc/600/?img=' + index"
                alt="Image"
                class="rounded-0"
              ></b-card-img>
            </b-col>
            <b-col md="6">
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
import users from '../assets/temp.json';
export default {
  data: () => {
    return {
      currentPage: 1,
      maxPerPage: 10,
      showLoader: false,
      totalResults: Object.keys(users).length,
      profiles: users
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalResults / this.maxPerPage);
    },
    pageOffset() {
      if (this.maxPerPage * this.currentPage <= this.totalResults)
        return this.maxPerPage * this.currentPage;
      else
        return this.totalResults;
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