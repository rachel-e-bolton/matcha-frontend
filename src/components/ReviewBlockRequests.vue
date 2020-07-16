<template>
  <b-table
    :items="items"
    :fields="fields"
    striped
    responsive="sm"
  >
    <template v-slot:cell(reported_first_namereported_last_name)="data">
      {{ data.item.reported_first_name}} {{ data.item.reported_last_name }}
    </template>

    <template v-slot:cell(reporter_first_namereporter_last_name)="data">
      {{ data.item.reporter_first_name}} {{ data.item.reporter_last_name }}
    </template>
    <template v-slot:table-colgroup="scope">
      <col
        v-for="field in scope.fields"
        :key="field.key"
        :style="{
          width:
            field.key === 'comment' || field.key === 'reason'
              ? '300px'
              : '10px',
        }"
      />
    </template>
    <template v-slot:cell(comment)="data">
      <b-form-input
        v-model="data.item.admin_comments" placeholder="Add a reviewer comment..."
      ></b-form-input>
    </template>
    <template v-slot:cell(actions)="data">
      <div class="d-flex flex-row justify-content-center">
        <b-button
          size="sm"
          @click="updateRequest(data.item.id, 0, data.item.admin_comments)"
          class="mr-2 border-danger bg-danger p-1 px-2 rounded-pill shadow"
          title="Reject Block Request"
        >
          <b-icon icon="x" class="text-light"></b-icon>
        </b-button>
        <b-button
          size="sm"
          @click="updateRequest(data.item.id, 1, data.item.admin_comments)"
          class="mr-2 border-success bg-success p-1 px-2 rounded-pill shadow"
          title="Approve Block Request"
        >
          <b-icon icon="check2" class="text-light"></b-icon>
        </b-button>
      </div>
    </template>
  </b-table>
</template>

<script>
import {actions, state} from '@/store'

export default {
  props: ['items'],
  data() {
    return {
      review: {
        blocked: false,
        admin_comments: null,
      },
      fields: [
        { key: 'reported_first_namereported_last_name', label: 'Reported User'},
        { key: 'reporter_first_namereporter_last_name', label: 'Reported By' },
        "reason",
        "comment",
        "actions"
      ],
    };
  },
  methods: {
    updateRequest: function(id, status, comment) {
      this.review.blocked = status;
      this.review.admin_comments = comment
      this.$http
        .put(`${this.$api}/block-request/${id}`, this.review)
        .then((res) => {
          actions.notify.success(res.data.message)
          this.$emit("reload")
        })
        .catch((err) => {
          actions.notify.error(err.reponse.data.message)
        });
    },
  },
};
</script>

<style>
@import "../assets/styles/ViewStyles.css";
</style>
