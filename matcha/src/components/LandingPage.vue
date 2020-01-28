<template>
    <div>
        <div>
            <md-toolbar class="md-transparent">
                <h3 class="md-title">
                    <router-link to="/">Home</router-link> |
                    <router-link to="/about">About</router-link>
                </h3>
            </md-toolbar>
        </div>
        <div>
           <h1>{{ msg }}</h1>
        </div>
        <SigninButtons/>
        <NavBar/>
    </div>
    
</template>

<script>
import SigninButtons from './SigninButtons.vue'
import NavBar from './NavBar.vue'

export default {
    props: {
        msg: String,
    },
    components: {
        SigninButtons,
        NavBar
    }
}
</script>

<style>
</style>