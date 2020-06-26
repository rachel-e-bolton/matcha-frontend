<template>
    <div>
        <md-toolbar class="md-transparent">
            <router-link class="logo-link" to="/"><img src="../assets/logo-plum.png" alt="Matcha" width="200"></router-link>
            <div class="md-toolbar-section-end">
                <md-button to="/About" class="md-icon-button info">
                    <md-icon>info</md-icon>
                </md-button>
            </div>
        </md-toolbar>
    </div>
</template>

<style>
    .info{
        color: white;
    }
</style>