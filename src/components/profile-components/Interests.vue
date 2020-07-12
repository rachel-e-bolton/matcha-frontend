<template>
  <div>
    <h4>Interests</h4>
    <tags-input 
      element-id="tags"
      v-model="selectedTags"
      :typeahead-hide-discard="true"
      :only-existing-tags="false"
      :existing-tags="availableTags"
      :typeahead="true"
      @tag-removed="saveInterests"
      @keyup.enter="saveInterests">
    </tags-input>
  </div>
</template>

<script>

import VoerroTagsInput from '@voerro/vue-tagsinput';

export default {
  name: "Interests",
  components: {
    "tags-input" : VoerroTagsInput
  },
  data: function () {
    return {
      user: null,
      store: this.$store,
      availableTags : [],
      selectedTags: [],
      preferences: []
    }
  },
  methods: {
    getInterests: function () {
      return this.$http.get(`${this.$api}/info/interests`)
      .then(res => {
        this.availableTags = []
        res.data.interests.forEach(interest => {
          let key = interest.toLowerCase().replace(" ", "-")
          this.availableTags.push({key: key, value: interest})
        })
      })
      .catch(err => {
        console.log(err)
      })
    },
    setSelectedInterests() {
      this.$http.get(`${this.$api}/user/${this.store.user.id}`)
      .then(resp => {
        this.user = resp.data
        this.selectedTags = this.availableTags.filter(tag => {
          return (this.user.interests.indexOf(tag.value) >= 0)
        })
      })
      .catch(err => {
        console.error(err)
      })
    },
    saveInterests: function () {
      this.user.interests = this.selectedTags.map(x => x.value)

      this.$http.put(`${this.$api}/user/${this.user.id}`, {user: this.user})
        .then(resp => {
          this.getInterests()
        })
        .catch(err => {
            console.log(err)
        })
    }
  },
  created: async function () {
    await this.getInterests()
  }
}
</script>

<style src='@voerro/vue-tagsinput/dist/style.css'></style>
<style>

</style>