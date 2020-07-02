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
              controls
              indicators
              background="#dadad9"
              style="text-shadow: 1px 1px 2px #333; width: 80vw; height: 55vh"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
              class="rounded-lg mx-md-5"
            >
              <b-carousel-slide class="rounded-lg" img-src=""></b-carousel-slide>

              <b-carousel-slide img-src=""></b-carousel-slide>

              <b-carousel-slide img-src=""></b-carousel-slide>
            </b-carousel>
          </div>
          <div v-if="myProfile" class="">
            <b-button 
              style="font-size: 3rem; border: none; position: absolute; right: 0; bottom: 0; z-index: 1000" 
              pill 
              class="bg-transparent display-1 mr-4"
              size="lg"
              @click="showModal('uploads')">
                <b-icon 
                  variant="secondary" 
                  class="m-0 bg-white rounded-pill shadow" 
                  icon="plus-circle-fill"
                  @click="showModal('uploads')"></b-icon>
            </b-button>
            <b-modal ref="uploads" hide-footer title="Upload or Change Photo">

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
      relationship: {
        matched: false,
        liked: false,
        userRating: 0,
      },
      photo: {
        is_primary: false,
        user_id: null,
        image64: '',
        image_type: ''
      },
      userProfileForm: {
        photos: [],
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
      this.$http.get(`${this.$api}/user/`, this.userInView.id)
      .then(res => {
        this.userProfileForm = _.cloneDeep(res.data)
      })
      .catch(err => {
      })
    },

    checkRelation: function () {
      this.$http.get(`${this.$api}/match/`, this.userInView.id)
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
        this.userProfileForm = _.cloneDeep(this.$store.user)
      } else {
        this.myProfile = false
        this.getUser()
        this.checkRelation()

      }
    }
  },
  created() {
    this.loadData()
  } 
}
</script>