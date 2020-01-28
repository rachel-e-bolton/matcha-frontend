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
            {{ msg }}
        </div>
        <div class="signup-buttons">
            <md-button :href="loginUrl" class="md-raised md-plain">
                <router-link to="/login">Log In</router-link>
            </md-button>
            <md-button :href="loginUrl" class="md-raised md-plain">
                <router-link to="/signup">Sign Up</router-link>
            </md-button>
        </div>
        <div class="phone-viewport">
            <md-bottom-bar md-sync-route>
                <md-bottom-bar-item to="/components/LandingPage" md-label="Profile" md-icon="profile"></md-bottom-bar-item>
                <md-bottom-bar-item to="/components/LandingPage" md-label="Discover" md-icon="discover"></md-bottom-bar-item>
                <md-bottom-bar-item to="/components/LandingPage" md-label="Search" md-icon="search"></md-bottom-bar-item>
                <md-bottom-bar-item to="/components/LandingPage" md-label="Matches" md-icon="matches"></md-bottom-bar-item>
            </md-bottom-bar>
        </div>
    </div>
    
</template>

<script>
export default {
    props: {
        msg: String,
    }
}
</script>

<style>
    .signup-buttons{
        /* position: fixed;
        transform: translate(-50%, 0);
        left: 50%; */
        display: inline-flex;
        align-items: flex-end;
        bottom: 200px;
        padding: 0px;
    }
    .phone-viewport {
        position: fixed;
        transform: translate(-50%, 0);
        left: 50%;
        bottom: 0px;
        padding: 0px;
        width: 322px;
        height: 60px;
        display: inline-flex;
        align-items: flex-end;
        overflow: hidden;
        border: 1px solid black;
        background-color: white; /* rgba(white, .06); */
        bottom: 0px;
    }
    .md-raised {
        width: 33%;
    }
</style>