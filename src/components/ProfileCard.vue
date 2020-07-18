<template>
  <div>
    <div>
      <p>Sort: </p>
      <b-button-group>
        <b-button @click="ageClick" :pressed.sync="age">Age</b-button> <!-- {{ AgeOrder }} -->
        <b-button @click="distanceClick" :pressed.sync="distance">Distance</b-button> <!-- {{ DistanceOrder }} -->
      </b-button-group>
      <br>
      <p>filter: </p>
      <b-button-group>
        <b-button @click="filterAgeClick" :pressed.sync="filterAge">Age</b-button> <!-- {{ AgeOrder }} -->
        <b-button @click="filterDistanceClick" :pressed.sync="filterDistance">Distance</b-button> <!-- {{ DistanceOrder }} -->
      </b-button-group>
    </div>
    <b-container class="mt-4 pr-lg-5">
      <b-row align-h="center">
        <b-card
          v-for="(n, index) in pageOffset"
          :key="index"
          no-body
          class="overflow-hidden m-3"
          style="width: 600px"
        >
          <b-row no-gutters>
            <b-col sm="6">
              <b-card-img
                :src="require('../assets/no-photo.png')"
                alt="Image"
                class="rounded-0"
                style="height: 300px; object-fit: cover"
                v-if="!profiles[index].photos || !profiles[index].photos.image64"
              ></b-card-img>
              <b-card-img
                :src="profiles[index].photos.image64"
                alt="Image"
                class="rounded-0"
                style="height: 300px; object-fit: cover"
                v-else
              ></b-card-img>
            </b-col>
            <b-col sm="6">
              <b-card-body :title="profiles[index].fname + ' ' + profiles[index].lname">
                <b-card-text v-if="profiles[index].dob">{{ageCalculation(profiles[index].dob)}}</b-card-text>
                <b-card-text v-if="profiles[index].gender">{{profiles[index].gender}}</b-card-text>
                <b-card-text v-if="profiles[index].distance">{{profiles[index].distance}} km</b-card-text>
                <!-- <b-card-text v-if="profiles[index].bio">{{profiles[index].bio}}</b-card-text> -->
                <b-card-text v-if="profiles[index].online === true" style="color:lime">Online</b-card-text>
                <b-card-text v-else style="color:red">Offline</b-card-text>
                <!-- <b-card-text v-if="profiles[index].lastseen">{{profiles[index].lastseen}}</b-card-text> -->
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
      myAge: 25,
      filterAge: false,
      filterDistance: false,
      age: false,
      ageOrder: "ascending",
      distance: true,
      distanceOrder: "ascending",
      currentPage: 1,
      maxPerPage: 10,
      showLoader: false,
      totalResults: Object.keys(users).length,
      profiles: users
    };
  },
  created() {},
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
    },
    ageCalculation(dob) {
      var date = new Date(dob);
      var diff_ms = Date.now() - date;
      var age_dt = new Date(diff_ms);
      return Math.abs(age_dt.getUTCFullYear() - 1970);
    },
    distanceClick() {
      this.distance = true;
      this.age = false;
      this.ageOrder = "descending";

      if (this.distanceOrder === "ascending") {
        this.distanceOrder = "descending";
      } else {
        this.distanceOrder = "ascending";
      }
      if (this.distanceOrder === "ascending") {
        users.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
      } else {
        users.sort((a, b) => parseFloat(b.distance) - parseFloat(a.distance));
      }
    },
    ageClick() {
      this.age = true;
      this.distance = false;
      this.distanceOrder = "descending";

      if (this.ageOrder === "ascending") {
        this.ageOrder = "descending";
      } else {
        this.ageOrder = "ascending";
      }
      if (this.ageOrder === "ascending") {
        users.sort((a, b) => parseFloat(b.dob) - parseFloat(a.dob));
      } else {
        users.sort((a, b) => parseFloat(a.dob) - parseFloat(b.dob));
      }
    },
    filterAgeClick() {
      users.filter(users => parseFloat(users.dob) <= (30) );
    },
    filterDistanceClick() {}
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
    border: 5px solid lightgrey;
    border-top: 5px solid #000;
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