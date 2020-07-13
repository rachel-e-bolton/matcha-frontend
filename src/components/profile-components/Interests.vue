<template>
  <div class="my-4">
    <h4 style="font-weight: 700" class="my-3" @click="tagsOn()">Interests</h4>
    <div class="d-flex flex-row flex-wrap justify-content-center my-2" @click="tagsOn()" v-if="!tagsEdit">
      <div v-for="(tag,index) in selectedTags" @click="tagsOn()" :key="index" class="border text-light bg-secondary rounded-pill mx-1 px-3 py-1 my-1">
        {{ tag.value }}
      </div>
    </div>
    <tags-input 
      v-if="tagsEdit"
      element-id="tags"
      v-model="selectedTags"
      :typeahead-hide-discard="true"
      :only-existing-tags="false"
      :existing-tags="availableTags"
      :typeahead="true"
      @tag-removed="saveInterests"
      @keyup.enter="saveInterests"
      @blur="tagsOff()">
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
      tagsEdit: false,
      user: null,
      store: this.$store,
      availableTags : [],
      selectedTags: [],
      preferences: []
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

    tagsOff: function () {
      this.tagsEdit = false
    },

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
    this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.token
    this.$http.get(`${this.$api}/user/${this.store.user.id}`)
      .then(resp => {
        this.user = resp.data
        this.selectedTags = this.availableTags.filter(tag => {
          return (this.user.interests.indexOf(tag.value) >= 0)
        })
      if (!this.user.interests) {
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