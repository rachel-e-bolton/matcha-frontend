<template>
    <div>
        <Header/>
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
import Header from './Header.vue'

export default {
    props: {
        msg: String,
    },
    components: {
        Header,
        SigninButtons,
        NavBar
    }
}
</script>

<style>
</style>