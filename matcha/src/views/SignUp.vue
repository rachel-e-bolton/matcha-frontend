<template>
  <div class="signup">
    <div class="header">
      Header Elements Here
    </div>
    <div class="content">
      <SignUpForm />
    </div>
    <div class="footer">
      Footer Elements Here
    </div>
  </div>
</template>

<script>
import SignUpForm from '../components/SignUpForm'

export default {
  name: 'signup',
  components: {
    SignUpForm
  }
}
</script>

<style>
.signup {
  height: 100%;
}

.header {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 70px;
  overflow: hidden;
  background-color: #eec643;
}


.footer {
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 70px;
  overflow: hidden;
  background-color: #eec643;
}

.content {
  position: absolute;
  top: 70px;
  bottom: 70px;
  right: 0px;
  left: 0px;
  overflow: auto;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.content::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE and Edge */
.content {
    -ms-overflow-style: none;
}

@media only screen and (min-width: 768px) and (max-width: 1024px) {
  .header {
    height: 120px;
  }

  .footer {
    height: 120px;
  }
  
  .content {
    top: 120px;
    bottom: 120px;
  }
}
</style>



