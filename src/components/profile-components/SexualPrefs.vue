<template>
  <div class="mb-4">
    <h4 style="font-weight: 700" class="my-3" @click="tagsOn()">Sexual Preferences</h4>
    <div class="d-flex flex-row flex-wrap justify-content-center my-2" @click="tagsOn()" v-if="!tagsEdit">
      <div v-for="(tag, index) in selectedTags" @click="tagsOn()" :key="index" style="background-color: #e05e1b" class="border text-light rounded-pill mx-1 px-3 py-1 my-1">
        {{ tag.value }}
      </div>
    </div>
    <tags-input 
      v-if="tagsEdit"
      element-id="tags"
      v-model="selectedTags"
      :typeahead-hide-discard="true"
      :only-existing-tags="true"
      :existing-tags="availableTags"
      :typeahead="true"
      @tags-updated="savePreferences">
    </tags-input>
  </div>
</template>

<script>

import VoerroTagsInput from '@voerro/vue-tagsinput';

export default {
  name: "SexualPrefs",
  props: ["user", "myprofile"],
  components: {
    "tags-input" : VoerroTagsInput
  },
  data: function () {
    return {
      availableTags : [],
      selectedTags: [],
      tagsEdit: false
    }
  },
  computed: {
    preferences: function () {
      let preferences = []
      this.selectedTags.forEach(i => {
        preferences.push(i.value)
      })
      return preferences
    }
  },
  methods: {
    tagsOn: function () {
      this.tagsEdit = !this.tagsEdit && this.myprofile
    },
    getGenders: function () {
      return this.$http.get(`${this.$api}/info/genders`)
      .then(res => {
        res.data.genders.forEach(gender => {
          let key = gender.toLowerCase().replace(" ", "-")
          this.availableTags.push({key: key, value: gender})
        })
      })
      .catch(err => {
        actions.notify.error("There was a problem loading some data. Notice of this error has been sent to admins.")
      })
    },

    savePreferences: function () {
      this.$props.user.preferences = this.preferences

      this.$emit("sync")
      this.$forceUpdate()
    }
  },
  created: async function () {
    await this.getGenders()
    Array.from(this.user.preferences || []).forEach(i => {
      this.selectedTags.push({key: i, value: i})
    })
  }
}
</script>

<style src='@voerro/vue-tagsinput/dist/style.css'></style>
<style>

</style>