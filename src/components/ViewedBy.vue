<template>
  <b-table
    :items="items"
    :fields="fields"
    striped
    responsive="sm"
    v-if="items.length > 0"
  >
    <template v-slot:cell(viewer_first_nameviewer_last_namedate)="data">
      {{ data.item.viewer_first_name}} {{ data.item.viewer_last_name }} on {{ data.item.date }}
    </template>
  </b-table>
  <div v-else>
    Your profile has not been viewed by an users yet.
  </div>
</template>

<script>
import {actions, state} from '@/store'

export default {
  data() {
    return {
      fields: [
        { key: 'viewer_first_nameviewer_last_namedate', label: 'Your profile was viewed by' }
      ],
      items: []
    };
  },
  created: function () {
    this.$http.get(`${this.$api}/views/viewed-by`)
    .then((res) => {
      this.items = res.data
    })
    .catch((err) => {
      console.error(err)
    })
  }
};
</script>

<style>
@import "../assets/styles/ViewStyles.css";
</style>