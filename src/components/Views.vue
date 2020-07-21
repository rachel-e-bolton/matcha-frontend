<template>
  <b-table
    :items="items"
    :fields="fields"
    striped
    responsive="sm"
    v-if="items.length > 0"
  >
    <template v-slot:cell(viewee_first_nameviewee_last_namedate)="data">
      <span>
        <router-link
          :to="{
            name: 'profile',
            params: { username: data.item.viewee_username }}">
            {{ data.item.viewee_first_name }}
          {{ data.item.viewee_last_name }}
        </router-link>
        on {{ data.item.date }}
      </span>
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
      actions.notify.error("There was a problem loading some data. Notice of this error has been sent to admins.")
    })
  }
};
</script>

<style>
@import "../assets/styles/ViewStyles.css";
</style>