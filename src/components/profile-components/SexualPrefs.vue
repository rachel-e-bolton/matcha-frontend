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
  components: {
    "tags-input" : VoerroTagsInput
  },
  data: function () {
    return {
      user: null,
      store: this.$store,
      availableTags : [],
      selectedTags: [],
      preferences: [],
      tagsEdit: false
    }
  },
  methods: {
    tagsOn: function () {
      if (this.tagsEdit === false) {
        this.tagsEdit = true
      } else {
        this.tagsEdit = false
      }
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
        console.log(err.response)
      })
    },

    savePreferences: function () {
      this.user.preferences = this.selectedTags.map(x => x.value)

      this.$http.put(`${this.$api}/user/${this.user.id}`, {user: this.user})
        .then(resp => {
          console.log(resp)
        })
    }
  },
  created: async function () {
    await this.getGenders()
    this.$http.get(`${this.$api}/user/${this.store.user.id}`)
      .then(resp => {
        this.user = resp.data
        this.selectedTags = this.availableTags.filter(tag => {
          return (this.user.preferences.indexOf(tag.value) >= 0)
        })
        if (!this.user.preferences) {
          this.tagsEdit = true
        }
      })
      .catch(err => {
        console.error(err)
      })
  }
}
</script>

<style src='@voerro/vue-tagsinput/dist/style.css'></style>
<style>

</style>