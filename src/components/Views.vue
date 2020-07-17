<template>
  <b-table
    :items="items"
    :fields="fields"
    striped
    responsive="sm"
    v-if="items.length > 0"
  >
    <template v-slot:cell(viewee_first_nameviewee_last_namedate)="data">
      {{ data.item.viewee_first_name}} {{ data.item.viewee_last_name }} on {{ data.item.date }}
    </template>
  </b-table>
  <div v-else>
    You have not viewed any users yet.
  </div>
</template>

<script>
import {actions, state} from '@/store'

export default {
  data() {
    return {
      fields: [
        { key: 'viewee_first_nameviewee_last_namedate', label: 'You viewed' }
      ],
      items: []
    };
  },
  created: function () {
    this.$http.get(`${this.$api}/views`)
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