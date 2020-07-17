<template>
  <b-table
    :items="items"
    :fields="fields"
    striped
    responsive="sm"
    v-if="items.length > 0"
  >
    <template v-slot:cell(matcher_first_namematcher_last_namedate)="data">
      {{ data.item.matcher_first_name}} {{ data.item.matcher_last_name }} on {{ data.item.date }}
    </template>
  </b-table>
  <div v-else>
    Your profile has not been liked by any users yet.
  </div>
</template>

<script>
import {actions, state} from '@/store'

export default {
  data() {
    return {
      fields: [
        { key: 'matcher_first_namematcher_last_namedate', label: 'Your profile was liked by' }
      ],
      items: []
    };
  },
  created: function () {
    this.$http.get(`${this.$api}/likes/liked-by`)
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