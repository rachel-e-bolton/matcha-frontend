<template>
   <div class="col-10 col-md-6 col-lg-3 m-3 m-md-2">
     <b-card class="bg-light shadow-sm">
       <FameRating :user="user" class="mt-md-3"/>
        <div v-if="user.image_type && user.image_type != '&nbsp' ">
        <router-link :to="`/profile/${this.user.username}`">
          <img :src="'data:image/' + user.image_type + ';base64, ' + user.image64" class="rounded-pill shadow" style="height: 200px; width: 200px; object-fit: cover"/>
        </router-link>
        </div>
        <div v-else>
          <router-link :to="`/profile/${this.user.username}`">
            <b-avatar class="rounded-pill shadow" size="200px"></b-avatar>
          </router-link>
        </div>
        <PersonalDetails class="mt-2" :user="user"/>
        <Location class="mt-3" :user="user"/>
        <div class="bio" style="height: 100px">
          <Bio :user="user"/>
        </div>
     </b-card>
   </div>
</template>

<script>
import PersonalDetails from '@/components/profile-card-components/PersonalDetails'
import Bio from '@/components/profile-card-components/Bio'
import FameRating from '@/components/profile-card-components/FameRating'
import Location from '@/components/profile-card-components/Location'

export default {
  props: ["user"],
  components: {
    PersonalDetails,
    Bio,
    FameRating,
    Location
  },
}
</script>

<style scoped>
.bio {
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
}

.bio::-webkit-scrollbar { /* WebKit */
  width: 0;
  height: 0;
}
</style>
