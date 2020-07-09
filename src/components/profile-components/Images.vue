<template>
  <div class="container d-flex justify-content-center">
    <div style="width: 350px;" class="mb-4 position-relative">
      <div v-if="loading" style="height: 400px;" class="d-flex justify-content-center align-items-center">
        <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
      </div>
      <div v-else>
        <div v-if="images64[0]" class="d-flex justify-content-center">
          <hooper style="height: 400px; width: 300px">
            <slide v-for="image in userImages" :key="image" class="rounded-lg shadow-sm">
              <img :src="image.image64" class="rounded-lg shadow-sm">
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
        <div v-if="userId === this.$store.user.id">
          <b-button 
            style="position: absolute; right: -5px; bottom: -10px; z-index: 1000" 
            pill 
            class="bg-secondary display-1 shadow"
            size="lg"
            @click="showModal('uploads')">
            <b-icon variant="light" class="mb-1 mt-2" icon="pencil"></b-icon>
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
              <div v-if="images64[0]" class="d-flex justify-content-center flex-wrap">
                <div v-for="image in userImages" :key="image" class="mx-2 mb-3 mt-2 rounded-lg" style="width: 80px">
                  <img :src="image.image64" style="width: 80px" class="rounded-lg"/>
                </div>
                <div v-if="images64.length < 5" class="mx-2 mb-3 mt-2 d-flex align-items-center justify-content-center border border-primary rounded-lg bg-light" style="width: 80px">
                  <label for="img" style="font-size: 3rem" class=""><b-icon variant="primary" icon="plus-circle"></b-icon><span style="font-size: 1rem"></span></label>                  
                </div>
                <div v-else>
                  <div class="mx-2 mb-3 mt-2 d-flex align-items-center justify-content-center text-primary" style="width: 80px, height: auto">
                    <span class="small">Maximum pictures reached.</span>             
                  </div>
                </div>
              </div>
              <input type="file" @change="croppie" name="uploadfile" id="img" style="display:none;" accept=".jpg, .png"/>
            </div>
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
        images64: [],
        uploading: false
      }
    },
    computed: {
      userImages: function() {
        let userImages = []

        userImages = 
      }
    },
    methods: {
      // getBase64: function (images) {
      //   this.images64 = []
      //   if (images) {
      //     images.forEach(image => {
      //       let image64src = "data:image/" + image.image_type + ";base64, " + image.image64
      //       let imageId = image.id
      //       let src = {
      //         id: imageId,
      //         src: image64src
      //       }
      //       this.images64.push(src)
      //     });
      //   }
      //   this.loading = false
      // },

      getUser: function () {
        this.loading = true
        let self = this
        this.$http.get(`${this.$api}/user/${this.userId}`)
        .then(res => {
          this.images64 = _.cloneDeep(res.data.images)
          this.loading = false
        })
        .catch(err => {
          self.$bvToast.toast(err.response.data.message, {
            title: "Error!",
            autoHideDelay: 5000,
            variant: "danger"
          })
        })
      },

      showModal(ref) {
        this.$refs[ref].show()
      },

      uploadImage: function (upload) {
        let self = this
        this.$http.put(`${this.$api}/images`, upload)
        .then(res => { 
          self.$bvToast.toast('Image uploaded.', {
            title: "Success!",
            autoHideDelay: 2000,
            toaster: "b-toaster-top-center",
            variant: "info",
            noCloseButton: true,
          })
          self.getUser()
        })
        .catch(err => {
          self.$bvToast.toast(err.response.data.message, {
            title: "Error!",
            autoHideDelay: 5000,
            variant: "danger"
          })
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
          this.uploadImage(upload)
          });
        this.uploading = false
      }
    },
    created() {
      this.getUser()
    }
  }
</script>

<style>

</style>