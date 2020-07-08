<template>
  <div class="max-w-90 d-flex justify-content-center">
    <b-col sm="auto" md="6" lg="4" class="rounded-lg shadow bg-light">
      <div id="profile">
        <div id="fame-rating">
          <div id="my-rating">
            <b-form-rating class="bg-transparent" style="border: none" v-model="userProfileForm.heat" readonly size="lg" color="#e05e1b"></b-form-rating>
          </div>
        </div>
        <div id="photos">
          <div id="photo-carousel" class="my-2 mb-4 d-flex justify-content-center position-relative">
            <b-carousel
              id="carousel-1"
              v-model="slide"
              :interval="5000"
              indicators
              background="#dadad9"
              style="text-shadow: 1px 1px 2px #333;"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
              class="rounded-lg mx-md-5 shadow-sm"
            >
            <div v-if="photosBase64">
              <div>FUCK</div>
              <b-carousel-slide style="" v-for="image in photosBase64" class="rounded-lg" :key="image.index" v-slot:img>
                <img class="rounded-lg" :src="image" />
              </b-carousel-slide>
            </div>
            <div v-else>
              <b-carousel-slide class="rounded-lg" v-slot:img>
                <img class="rounded-lg" src="@/assets/no-photo.png" />
              </b-carousel-slide>
            </div>
            </b-carousel>
          </div>
          <div v-if="myProfile" class="">
            <b-button 
              style="border: none; position: absolute; right: 20px; bottom: 0; z-index: 1000" 
              pill 
              class="bg-secondary display-1 mr-5 mb-3 shadow"
              size="lg"
              @click="showModal('uploads')">
                <b-icon 
                  variant="light" 
                  class="my-2 bg-secondary rounded-pill" 
                  icon="pencil"
                  @click="showModal('uploads')"></b-icon>
            </b-button>
            <b-modal ref="uploads" hide-footer title="Upload or Change Photos" class="text-center">
              <div v-if="uploading">
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
              </div>
            </b-modal>
          </div>
        </div>
        <div id="online">

        </div>
        <div id="personal-details">
          <div id="full-name">
            
          </div>
          <div id="age-gender">
            
          </div>
        </div>
        <div id="location">

        </div>
        <div id="bio">

        </div>
        <div id="interests">

        </div>
        <div id="sexual-preferences">

        </div>
        <div v-if="myProfile" id="other-actions">
          <div id="report">

          </div>
          <div id="like">
            <div v-if="relationship.matched">
              <div id="rate-user">
                <!-- Add to a modal
                <b-form-rating style="border: none" v-model="relationship.userRating" size="lg" variant="secondary"></b-form-rating> -->
              </div>
            </div>
            <div v-else-if="relationship.liked">

            </div>
            <div v-else>

            </div>
          </div>
        </div>
      </div>
    </b-col>
  </div>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {
      userInView: this.user,
      myProfile: true,
      userRating: null,
      slide: 0,
      sliding: null,
      uploading: false,
      croppieImage: '',
      cropped: null,
      extension: '',
      relationship: {
        matched: false,
        liked: false,
        userRating: 0,
      },
      photosBase64: [],
      userProfileForm: {
        images: [],
        fname: '',
        lname: '',
        dob: '',
        gender: '',
        longitude: '',
        latitude: '',
        bio: '',
        heat: 3,
        interests: [],
        preferences: []
      }
    }
  },
  computed: {
  },
  methods: {
    calcAge: function () {
    },

    getUser: function () {
      this.$http.get(`${this.$api}/user/${this.userInView.id}`)
      .then(res => {
        this.userProfileForm = _.cloneDeep(res.data)
        this.getBase64(res.data.images)
      })
      .catch(err => {
      })
    },

    checkRelation: function () {
      this.$http.get(`${this.$api}/match/${this.userInView.id}`)
      .then(res => { 
        this.relationship = _.cloneDeep(res.data)
      })
      .catch(err => {
      })
    },

    onSlideStart(slide) {
      this.sliding = true
    },

    onSlideEnd(slide) {
      this.sliding = false
    },

    showModal(ref) {
      this.$refs[ref].show()
    },

    loadData: function () {
      if (this.userInView.username === this.$store.user.username) {
        this.myProfile = true
        this.getUser()
      } else {
        this.myProfile = false
        this.getUser()
        this.checkRelation()
      }
    },

    getBase64: function (images) {
      console.log(images)
      if (images) {
        images.forEach(photo => {
          let photoSrc = "data:image/" + photo.image_type + ";base64, " + photo.image64
          this.photosBase64.push(photoSrc)
        });
      }  
      console.log(this.photosBase64)
    },

    uploadImage: function (upload) {
      this.$http.put(`${this.$api}/images`, upload)
      .then(res => { 
      })
      .catch(err => {
      })
    },
  
    croppie: function (e) {
      this.uploading = true
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      const name = e.target.files[0].name;
      const lastDot = name.lastIndexOf('.');
      const ext = name.substring(lastDot + 1);

      this.extension = ext;

      var reader = new FileReader();
      reader.onload = e => {
        this.$refs.croppieRef.bind({
          url: e.target.result
        });
      };

      reader.readAsDataURL(files[0]);
    },

    crop: function () {
      let options = {
        type: 'base64',
        size: { width: 300, height: 400 },
        format: this.extension
      };

      this.$refs.croppieRef.result(options, output => {
        const base64 = output.substring(output.lastIndexOf(',') + 1)
        const upload = {
          is_primary: false,
          image64: base64,
          image_type: this.extension 
        }
        console.log(upload)
        this.uploadImage(upload)
        });
      this.uploading = false
    }

  },
  created() {
    this.loadData()
    this.getBase64()
  } 
}
</script>