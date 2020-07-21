<template>
  <div>
    <div>
      <!-- <p>filter:</p> -->
      <b-button v-b-toggle.sidebar-1>Filter</b-button>
      <b-sidebar id="sidebar-1" title="Filter" shadow>
        <div class="px-3 py-2">
          <b-button-group class="w-100 px-3 py-2">
            <b-button @click="filterAgeClick" :pressed.sync="filterAge" style="width: 300px">Age</b-button>
            <b-input v-model="minAge" type="number" min="18" :max="maxAge" onchange="validity.valid||(value=18);" required></b-input>
            <b-input v-model="maxAge" type="number" :min="minAge" max="100" onchange="validity.valid||(value=100);" required></b-input>
          </b-button-group>
          <b-button-group class="w-100 px-3 py-2">
            <b-button @click="filterDistanceClick" :pressed.sync="filterDistance" style="width: 300px">Distance</b-button>
            <b-input v-model="minDistance" type="number" min="0" :max="maxDistance" onchange="validity.valid||(value=0);" required></b-input>
            <b-input v-model="maxDistance" type="number" :min="minDistance" max="1000" onchange="validity.valid||(value=1000);" required></b-input>
          </b-button-group>
          <b-button-group class="w-100 px-3 py-2">
            <b-button @click="filterHeatClick" :pressed.sync="filterHeat" style="width: 300px">Heat</b-button>
            <b-input v-model="minHeat" type="number" min="1" :max="maxHeat" onchange="validity.valid||(value=1);" required></b-input>
            <b-input v-model="maxHeat" type="number" :min="minHeat" max="5" onchange="validity.valid||(value=5);" required></b-input>
          </b-button-group>
          <b-button-group class="w-100 px-3 py-2">
            <b-button @click="filterTagsClick" :pressed.sync="filterTags" style="width: 300px">Tags</b-button>
            <b-input v-model="minTags" type="number" min="0" :max="maxTags" onchange="validity.valid||(value=0);" required></b-input>
            <b-input v-model="maxTags" type="number" :min="minTags" max="10" onchange="validity.valid||(value=10);" required></b-input>
          </b-button-group>
        </div>
      </b-sidebar>
      <!-- <p>Sort:</p> -->
      <b-dropdown text="Sort" class="px-3 py-2" style>
        <b-dropdown-item @click="ageClick" :pressed.sync="age">
          Age
          <b-icon-arrow-up v-if="age && ageOrder === 'ascending'"></b-icon-arrow-up>
          <b-icon-arrow-down v-if="age && ageOrder === 'descending'"></b-icon-arrow-down>
        </b-dropdown-item>
        <b-dropdown-item @click="distanceClick" :pressed.sync="distance">
          Distance
          <b-icon-arrow-up v-if="distance && distanceOrder === 'ascending'"></b-icon-arrow-up>
          <b-icon-arrow-down v-if="distance && distanceOrder === 'descending'"></b-icon-arrow-down>
        </b-dropdown-item>
        <b-dropdown-item @click="heatClick" :pressed.sync="heat">
          Heat
          <b-icon-arrow-up v-if="heat && heatOrder === 'ascending'"></b-icon-arrow-up>
          <b-icon-arrow-down v-if="heat && heatOrder === 'descending'"></b-icon-arrow-down>
        </b-dropdown-item>
        <b-dropdown-item @click="tagsClick" :pressed.sync="tags">
          Tags
          <b-icon-arrow-up v-if="tags && tagsOrder === 'ascending'"></b-icon-arrow-up>
          <b-icon-arrow-down v-if="tags && tagsOrder === 'descending'"></b-icon-arrow-down>
        </b-dropdown-item>
      </b-dropdown>
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
                v-if="!profiles[index].photo || !profiles[index].photo.image64"
              ></b-card-img>
              <b-card-img
                :src="profiles[index].photo.image64"
                alt="Image"
                class="rounded-0"
                style="height: 300px; object-fit: cover"
                v-else
              ></b-card-img>
            </b-col>
            <b-col sm="6">
              <b-card-body :title="profiles[index].fname + ' ' + profiles[index].lname">
                <b-card-text v-if="profiles[index].dob">{{ageCalculation(profiles[index].dob)}}</b-card-text>
                <!-- <b-card-text v-if="profiles[index].gender">{{profiles[index].gender}}</b-card-text> -->
                <b-card-text v-if="profiles[index].distance">{{profiles[index].distance}} km</b-card-text>
                <b-card-text v-if="profiles[index].heat">{{profiles[index].heat}} heat</b-card-text>
                <b-card-text v-if="profiles[index].tags">{{profiles[index].tags}} tags in common</b-card-text>
                <!-- <b-card-text v-if="profiles[index].online === true" style="color:lime">Online</b-card-text>
                <b-card-text v-else style="color:red">Offline</b-card-text>-->
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
      filterAge: false,
      minAge: 20,
      maxAge: 30,
      filterDistance: false,
      minDistance: 0,
      maxDistance: 20,
      filterHeat: false,
      minHeat: 1,
      maxHeat: 5,
      filterTags: false,
      minTags: 0,
      maxTags: 10,
      age: false,
      ageOrder: "descending",
      distance: true,
      distanceOrder: "ascending",
      heat: false,
      heatOrder: "descending",
      tags: false,
      tagsOrder: "descending",
      currentPage: 1,
      maxPerPage: 10,
      showLoader: false,
      object: users
      // profiles: users,
      // totalResults: Object.keys(profiles).length,
    };
  },
  created() {
    users.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
  },
  computed: {
    profiles() {
      var temp = this.object;
      var minAge = this.minAge;
      var maxAge = this.maxAge;
      if (this.filterAge === true) {
        temp = temp.filter(function(n) {
          var date = new Date(n.dob);
          var diff_ms = Date.now() - date;
          var age_dt = new Date(diff_ms);
          var age = Math.abs(age_dt.getUTCFullYear() - 1970);
          return age >= minAge && age <= maxAge;
        });
      }
      var minDistance = this.minDistance;
      var maxDistance = this.maxDistance;
      if (this.filterDistance === true) {
        temp = temp.filter(function(n) {
          return n.distance >= minDistance && n.distance <= maxDistance;
        });
      }
      var minHeat = this.minHeat;
      var maxHeat = this.maxHeat;
      if (this.filterHeat === true) {
        temp = temp.filter(function(n) {
          return n.heat >= minHeat && n.heat <= maxHeat;
        });
      }
      var minTags = this.minTags;
      var maxTags = this.maxTags;
      if (this.filterTags === true) {
        temp = temp.filter(function(n) {
          return n.tags >= minTags && n.tags <= maxTags;
        });
      }
      return temp;
    },
    totalResults() {
      return Object.keys(this.profiles).length;
    },
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
    checkSmaller(input, otherInput) {
      return input <= otherInput;
    },
    filterAgeClick() {},
    filterDistanceClick() {},
    filterHeatClick() {},
    filterTagsClick() {},
    distanceClick() {
      this.distance = true;
      this.age = false;
      this.ageOrder = "descending";
      this.heat = false;
      this.heatOrder = "descending";
      this.tags = false;
      this.tagsOrder = "descending";
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
      this.heat = false;
      this.heatOrder = "descending";
      this.tags = false;
      this.tagsOrder = "descending";
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
    heatClick() {
      this.heat = true;
      this.age = false;
      this.ageOrder = "descending";
      this.distance = false;
      this.distanceOrder = "descending";
      this.tags = false;
      this.tagsOrder = "descending";
      if (this.heatOrder === "ascending") {
        this.heatOrder = "descending";
      } else {
        this.heatOrder = "ascending";
      }
      if (this.heatOrder === "ascending") {
        users.sort((a, b) => parseFloat(a.heat) - parseFloat(b.heat));
      } else {
        users.sort((a, b) => parseFloat(b.heat) - parseFloat(a.heat));
      }
    },
    tagsClick() {
      this.tags = true;
      this.age = false;
      this.ageOrder = "descending";
      this.distance = false;
      this.distanceOrder = "descending";
      this.heat = false;
      this.heatOrder = "descending";
      if (this.tagsOrder === "ascending") {
        this.tagsOrder = "descending";
      } else {
        this.tagsOrder = "ascending";
      }
      if (this.tagsOrder === "ascending") {
        users.sort((a, b) => parseFloat(a.tags) - parseFloat(b.tags));
      } else {
        users.sort((a, b) => parseFloat(b.tags) - parseFloat(a.tags));
      }
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