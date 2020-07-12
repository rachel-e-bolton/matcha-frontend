<template>
  <div class="container">
    <b-row class="mt-2">
      <b-col class="d-flex flex-row align-items-center flex-wrap">
        <div
          v-if="!fnameEdit"
          @click="fnameOn()"
          style="font-size: 1.5rem; font-weight: 700"
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
          style="font-size: 1.5rem;"
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
          style="font-size: 1.5rem; font-weight: 700"
        >
          {{ age() }},
        </div>
        <b-form-datepicker
          dark
          class="mr-2 col-8 small mb-2"
          v-model="user.dob"
          v-if="dobEdit"
          @input="dobOff()"
          @blur="dobOff()"
          :max="max"
        ></b-form-datepicker>
        <div
          v-if="!genderEdit"
          @click="genderOn()"
          class="ml-2"
          style="font-size: 1.5rem;"
        >
          {{ user.gender }}
        </div>
        <b-form-select
          class="ml-2 col-5 col-8"
          v-model="user.gender"
          placeholder="Select your gender"
          v-if="genderEdit"
          @input="genderOff()"
          :options="genders"
        ></b-form-select>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const maxDate = new Date(today);
    maxDate.setFullYear(today.getFullYear() - 18);

    return {
      fnameEdit: false,
      lnameEdit: false,
      dobEdit: false,
      genderEdit: false,
      user: {
        fname: "",
        lname: "",
        dob: "",
        gender: "",
      },
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

    getGenders: function() {
      return this.$http
        .get(`${this.$api}/info/genders`)
        .then((res) => {
          res.data.genders.forEach((gender) => {
            this.genders.push({ value: gender, text: gender });
          });
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    fnameOn: function() {
      this.fnameEdit = true;
    },

    fnameOff: function() {
      this.fnameEdit = false;
      if (this.$store.user.fname != this.user.fname) {
        this.$http
        .put(`${this.$api}/user/${this.user.id}`, {
          user: _.omit(this.user, "images"),
        })
        .then((res) => {
          this.$store.user = _.cloneDeep(this.user);
          localStorage.setItem("firewood", JSON.stringify(this.$store));
        })
        .catch((err) => {
          let test1 = this.$store.user;
          let test2 = this.user;
        });
      }
    },

    lnameOn: function() {
      this.lnameEdit = true;
    },

    lnameOff: function() {
      this.lnameEdit = false;
      if (this.$store.user.lname != this.user.lname) {
        this.$http
        .put(`${this.$api}/user/${this.user.id}`, {
          user: _.omit(this.user, "images"),
        })
        .then((res) => {
          this.$store.user = _.cloneDeep(this.user);
          localStorage.setItem("firewood", JSON.stringify(this.$store));
        })
        .catch((err) => {
          let test1 = this.$store.user;
          let test2 = this.user;
        });
      }
    },

    dobOn: function() {
      this.dobEdit = true;
    },

    dobOff: function() {
      this.dobEdit = false;
      if (this.$store.user.dob != this.user.dob) {
        this.$http
        .put(`${this.$api}/user/${this.user.id}`, {
          user: _.omit(this.user, "images"),
        })
        .then((res) => {
          this.$store.user = _.cloneDeep(this.user);
          localStorage.setItem("firewood", JSON.stringify(this.$store));
        })
        .catch((err) => {
          let test1 = this.$store.user;
          let test2 = this.user;
        });
      }
    },

    genderOn: function() {
      this.genderEdit = true;
    },

    genderOff: function() {
      if (!this.user.gender) {
        this.genderEdit = true;
      } else {
        this.genderEdit = false;
        if (this.$store.user.gender != this.user.gender) {
          this.$http
          .put(`${this.$api}/user/${this.user.id}`, {
            user: _.omit(this.user, "images"),
          })
          .then((res) => {
            this.$store.user = _.cloneDeep(this.user);
            localStorage.setItem("firewood", JSON.stringify(this.$store));
          })
          .catch((err) => {
            let test1 = this.$store.user;
            let test2 = this.user;
          });
        }
      }
    },
  },
  created() {
    this.getGenders();
    this.user = _.cloneDeep(this.$store.user);
    if (!this.user.dob) {
      this.dobEdit = true;
    }
    if (!this.user.gender) {
      this.genderEdit = true;
    }
  },
};
</script>
