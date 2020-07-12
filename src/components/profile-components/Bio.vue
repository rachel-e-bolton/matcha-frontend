<template>
  <div class="container">
    <div>
      <div
        class="d-flex justify-content-center flex-column align-items-center"
      >
        <h4 @click="bioOn()" style="font-weight: 700">Bio</h4>
        <div v-if="!bioEdit" @click="bioOn()" class="mx-4">
          {{ user.bio }}
        </div>
        <b-form-textarea
          class="col-12"
          v-model="user.bio"
          placeholder="Enter a short biography..."
          v-if="bioEdit"
          @blur="bioOff()"
          @keyup.enter="bioOff()"
          rows="4"
          max-rows="6"
        ></b-form-textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bioEdit: false,
      user: {
        bio: "",
      },
    };
  },
  methods: {
    bioOn: function() {
      if (this.bioEdit === false) {
        this.bioEdit = true
      } else {
        this.bioEdit = false
      }
    },

    bioOff: function() {
      this.bioEdit = false;
      if (this.$store.user.bio != this.user.bio) {
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
  },
  created() {
    this.user = _.cloneDeep(this.$store.user);
    if (!this.user.bio || this.user.bio === "") {
      this.bioEdit = true;
    }
  },
};
</script>
