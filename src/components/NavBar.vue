<template>
    <div>
        <div class="navbar">
            <md-bottom-bar md-sync-route>
                <md-bottom-bar-item to="/myprofile" md-label="Profile" md-icon="settings"></md-bottom-bar-item>
                <md-bottom-bar-item to="/discover" md-label="Discover" md-icon="person"></md-bottom-bar-item>
                <md-bottom-bar-item to="/search" md-label="Search" md-icon="search"></md-bottom-bar-item>
                <md-bottom-bar-item to="/matches" md-label="Matches" md-icon="menu"></md-bottom-bar-item>
            </md-bottom-bar>
        </div>
    </div>
</template>

<style>
.navbar {
        position: fixed;
        transform: translate(-50%, 0);
        left: 50%;
        width: 322px;
        height: 60px;
        display: inline-flex;
        align-items: flex-end;
        overflow: hidden;
        border: 1px solid black;
        background-color: white;
        padding: 0px;
        bottom: 0px;
    }
</style>