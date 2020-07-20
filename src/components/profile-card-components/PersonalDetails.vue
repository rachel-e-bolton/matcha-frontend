<template>
  <div class="container">
    <b-row class="mt-4">
      <b-col class="d-flex flex-row align-items-center flex-wrap">
        <router-link :to="`/profile/${this.user.username}`" class="text-dark" style="text-decoration: none">
          <div
            style="font-size: 1.25rem; font-weight: 700"
          >
            {{ user.fname }}
          </div>
        </router-link>
        <router-link :to="`/profile/${this.user.username}`" class="text-dark" style="text-decoration: none">
          <div
            class="ml-2"
            style="font-size: 1.25rem;"
          >
            {{ user.lname }}
          </div>
        </router-link>
      </b-col>
    </b-row>
    <b-row class="mb-2">
      <b-col class="d-flex flex-row align-items-center flex-wrap">
        <router-link :to="`/profile/${this.user.username}`" class="text-dark" style="text-decoration: none">
          <div
            style="font-size: 1.25rem; font-weight: 700">
            {{ age() }},
          </div>
        </router-link>
        <router-link :to="`/profile/${this.user.username}`" class="text-dark" style="text-decoration: none">
          <div
            class="ml-2"
            style="font-size: 1.25rem;">
            {{ user.gender }}
          </div>
        </router-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const maxDate = new Date(today);
maxDate.setFullYear(today.getFullYear() - 19);

export default {
  props: ["user", "myprofile"],
  methods: {
    age: function() {
      if (this.user.dob) {
        var split_dob = this.user.dob.split("-");
        var year = split_dob[0];
        var month = split_dob[1];
        var day = split_dob[2];
        var dob_asdate = new Date(year, month, day);
        var today = new Date();
        var mili_dif = Math.abs(today.getTime() - dob_asdate.getTime());
        var age = mili_dif / (1000 * 3600 * 24 * 365.25);
        age = Math.floor(age);
      }
      return age;
    },  
  }
};
</script>
