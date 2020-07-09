<template>
  <div class="container d-flex justify-content-center">
    <div style="width: 350px;" class="mb-4 position-relative">
      <div v-if="loading" style="height: 400px;" class="d-flex justify-content-center align-items-center">
        <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
      </div>
      <div v-else>
        <div v-if="images64[0]" class="d-flex justify-content-center">
          <hooper style="height: 400px; width: 300px">
            <slide v-for="image in images64" :key="image" class="rounded-lg shadow-sm">
              <img :src="image" class="rounded-lg shadow-sm">
            </slide>
            <hooper-navigation slot="hooper-addons"></hooper-navigation>
          </hooper>
        </div>
        <div v-else class="d-flex justify-content-center">
          <hooper style="height: 400px; width: 300px">
            <slide class="rounded-lg shadow-sm">
              <img src="@/assets/no-photo.png" class="rounded-lg shadow-sm">
            </slide>
          </hooper>
        </div>
        <div v-if="this.userId === this.$store.user.id">
          <b-button 
            style="position: absolute; right: -5px; bottom: -10px; z-index: 1000" 
            pill 
            class="bg-secondary display-1 shadow"
            size="lg"
            @click="showModal('uploads')">
            <b-icon variant="light" class="mb-1 mt-2" icon="pencil"></b-icon>
          </b-button>
          <b-modal ref="uploads" hide-footer title="Upload or Change Photos" class="text-center">
            <!-- <div v-if="uploading">
              <vue-croppie ref="croppieRef" 
                :boundary="{ width: 300, height: 400}" 
                :viewport="{ width:300, height:400, 'type':'square' }"
                :showZoomer="false"
                :enableResize="false"
                class="position-relative">
              </vue-croppie>
              <b-button 
                style="font-size: 2rem; border: none; position: absolute; right: 80px; bottom: 15px; z-index: 1000" 
                variant="primary" class="rounded-pill lg shadow-lg pt-2" @click="crop">
                <b-icon icon="check2-circle"></b-icon>
              </b-button>
            </div>
            <div v-else>
              <b-row class="mx-1">
              <b-col v-for="n in 3" :key="n" class="border bg-light rounded-lg mx-1 mx-md-2 my-auto d-flex flex-column align-items-center position-relative">
                <div v-if="userProfileForm.images && userProfileForm.images[n-1]">
                  <img :src="photosBase64[n-1]"/>
                </div>
                <div v-else>
                  <label for="img" style="font-size: 3rem" class=""><b-icon variant="primary" icon="plus-circle"></b-icon><span style="font-size: 1rem"></span></label>
                  <div class="text-primary text-center mb-2" style="margin-top: -2vh;"></div>
                </div> 
              </b-col>
              </b-row>
              <b-row class="mx-1 my-3">
                <b-col v-for="n in 2" :key="n" class="border bg-light rounded-lg mx-1 mx-md-2 my-auto d-flex flex-column align-items-center">
                  <label for="img" style="font-size: 3rem" class=""><b-icon variant="primary" icon="plus-circle"></b-icon><span style="font-size: 1rem"></span></label>
                  <div class="text-primary text-center mb-2" style="margin-top: -2vh"></div>
                </b-col>
                <b-col class="mx-1 mx-md-2 rounded-lg small text-center text-primary my-auto">
                  Upload up to five images.
                </b-col>
              </b-row>
              <input type="file" @change="croppie" name="uploadfile" id="img" style="display:none;" accept=".jpg, .png"/>
              <p class="small text-muted text-center">Closing the modal will automatically save any changes you have made.</p>
            </div> -->
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper';
  import 'hooper/dist/hooper.css';

  export default {
    components: {
      Hooper,
      Slide,
      HooperNavigation
    },
    props: ['userId'],
    data() {
      return {
        loading: true,
        userId: this.userId,
        images64: [],
      }
    },
    methods: {
      getBase64: function (images) {
        if (images) {
          images.forEach(image => {
            let image64src = "data:image/" + image.image_type + ";base64, " + image.image64
            this.images64.push(image64src)
          });
        }
        this.loading = false
      },

      getUser: function () {
        this.$http.get(`${this.$api}/user/${this.userId}`)
        .then(res => {
          this.getBase64(res.data.images)
        })
        .catch(err => {
        })
      },

      showModal(ref) {
        this.$refs[ref].show()
      },
    },
    created() {
      this.getUser()
    }
  }
</script>

<style>

</style>