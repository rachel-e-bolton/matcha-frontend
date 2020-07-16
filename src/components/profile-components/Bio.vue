<template>
  <div class="container">
    <div>
      <div class="d-flex justify-content-center flex-column align-items-center">
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
          max-rows="6">
        </b-form-textarea>
      </div>
    </div>
  </div>
</template>

<script>
import {actions, state} from "@/store"

export default {
  props: ["user"],
  data() {
    return {
      bioEdit: false
    }
  },
  methods: {
    bioOn: function() {
      this.bioEdit = !this.bioEdit
    },
    bioOff: function() {
      if (this.bioEdit) {
        this.bioEdit = false;
        this.$emit("sync")
      }
    }
  }
}
</script>
