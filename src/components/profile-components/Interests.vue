<template>
  <div class="my-4">
    <h4 style="font-weight: 700" class="my-3" @click="tagsOn()">Interests</h4>
    <div class="d-flex flex-row flex-wrap justify-content-center my-2" v-if="!tagsEdit">
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
      @blur="tagsEdit = false">
    </tags-input>
  </div>
</template>

<script>

import VoerroTagsInput from '@voerro/vue-tagsinput';
import {action, state} from "@/store"

export default {
  name: "Interests",
  props: ["user"],
  components: {
    "tags-input" : VoerroTagsInput
  },
  data: function () {
    return {
      tagsEdit: false,
      availableTags : [],
      selectedTags: []
    }
  },
  computed: {
    interests: function () {
      let interests = []
      this.selectedTags.forEach(i => {
        interests.push(i.value)
      })
      return interests
    }
  },
  methods: {
    tagsOn: function () {
      this.tagsEdit = !this.tagsEdit
    },
    saveInterests: function () {

      this.$props.user.interests = this.interests

      this.$emit("sync")
      this.$forceUpdate()
  
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
    }
  },
  mounted: async function () {
    await this.getInterests()
    Array.from(this.user.interests || []).forEach(i => {
      this.selectedTags.push({key: i, value: i})
    })
  }
}
</script>

<style src='@voerro/vue-tagsinput/dist/style.css'></style>
<style>

</style>