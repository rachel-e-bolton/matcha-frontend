<template>
    <div>
    <b-card no-body class="overflow-hidden" style="max-width: 300px;">
      <b-row no-gutters>
        <b-col md="12">
          <b-card-img :src="url" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="12">
          <b-card-body title="Name">
            <b-card-text >
              {{number}}
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
    data: function() {
        return {
            number : Math.floor(Math.random() * 70 + 18),
            url : "https://i.pravatar.cc/"
        }
    }
}
</script>
