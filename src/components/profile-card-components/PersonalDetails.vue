<template>
  <div class="container">
    <b-row class="mt-4">
      <b-col class="d-flex flex-row align-items-center flex-wrap">
        <div
          v-if="!fnameEdit"
          @click="fnameOn()"
          style="font-size: 1.25rem; font-weight: 700"
        >
          {{ user.fname }}
        </div>
        <b-form-input
          class="mr-2 col-7"
          autofocus="autofocus"
          v-model="user.fname"
          placeholder="Enter your first name"
          v-if="fnameEdit"
          @blur="fnameOff()"
          @keyup.enter="fnameOff()"
        ></b-form-input>
        <div
          v-if="!lnameEdit"
          @click="lnameOn()"
          class="ml-2"
          style="font-size: 1.25rem;"
        >
          {{ user.lname }}
        </div>
        <b-form-input
          class="ml-2 col-7"
          autofocus="autofocus"
          v-model="user.lname"
          placeholder="Enter your last name"
          v-if="lnameEdit"
          @blur="lnameOff()"
          @keyup.enter="lnameOff()"
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row class="mb-2">
      <b-col class="d-flex flex-row align-items-center flex-wrap">
        <div
          v-if="!dobEdit"
          @click="dobOn()"
          style="font-size: 1.25rem; font-weight: 700">
          {{ age() }},
        </div>
        <label for="datepicker" v-if="dobEdit">Birthday: </label>
        <b-form-datepicker
          id="datepicker"
          dark
          class="mx-2 col-8 small mb-2"
          v-model="user.dob"
          v-if="dobEdit"
          @input="dobOff()"
          @blur="dobOff()"
          :max="max">
          </b-form-datepicker>
        <div
          v-if="!genderEdit"
          @click="genderOn()"
          class="ml-2"
          style="font-size: 1.25rem;">
          {{ user.gender }}
        </div>
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
  data() {

    return {
      fnameEdit: false,
      lnameEdit: false,
      dobEdit: false,
      genderEdit: false,
      max: maxDate,
      genders: [
        { value: null, text: 'Select your gender' }
      ],
    };
  },
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

    fnameOn: function() {
      this.fnameEdit = true && this.myprofile
    },

    fnameOff: function() {
      this.fnameEdit = false
      this.$emit("sync")
    },

    lnameOn: function() {
      this.lnameEdit = true && this.myprofile
    },

    lnameOff: function() {
      this.lnameEdit = false
      this.$emit("sync")
    },

    dobOn: function() {
      this.dobEdit = true && this.myprofile
    },

    dobOff: function() {
      this.dobEdit = false
      this.$emit("sync")
    },

    genderOn: function() {
      this.genderEdit = true && this.myprofile
    },

    genderOff: function() {
      if (!this.user.gender) {
        this.genderEdit = true;
      } else {
        this.genderEdit = false;
        this.$emit("sync")
      }
    },
  }
};
</script>
