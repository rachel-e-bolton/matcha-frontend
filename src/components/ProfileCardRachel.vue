<template>
   <div class="col-10 col-md-6 col-lg-3 m-2">
     <b-card class="bg-light shadow-sm">
       <FameRating :user="user" class="mt-md-4"/>
        <div v-if="user_image">
        <router-link :to="`/profile/${this.user.username}`">
          <img :src="user_image" class="rounded-pill shadow" style="height: 200px; width: 200px; object-fit: cover"/>
        </router-link>
        </div>
        <div v-else>
          <router-link :to="`/profile/${this.user.username}`">
            <b-avatar class="rounded-pill shadow" size="200px"></b-avatar>
          </router-link>
        </div>
        <PersonalDetails class="mt-2" :user="user"/>
        <Location class="mt-3" :user="user"/>
        <div style="height: 110px">
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
  data() {
    return {
      user_image: null
    }
  },
  created() {
    if (this.user.image64) {
      this.user_image = "data:image/" + this.user.image_type + ";base64, " + this.user.image64;
    } 
  }
}
</script>
