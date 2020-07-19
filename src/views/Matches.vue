<template>

    <div>
        <div class="header"><Header /></div>
        <div class="content" v-if="matches">
            <div class="max-w-90 d-flex justify-content-center" v-if="user">
                <b-col sm="auto" md="6" lg="4" class="rounded-lg shadow bg-light">
                    <div class="matches d-flex flex-column my-3">
                        <div class="match d-flex flex-row my-1" @click="chat(match.username)" v-for="match in matches" :key="match.index">

                            <img class="avatar" v-if="match.image64" :src="'data:image/' + match.image_type + ';base64, ' + match.image64" :alt="match.fname">
                            <img class="avatar" v-else src="@/assets/no-photo.png" :alt="match.fname">

                            <div class="p-3">{{match.fname}} {{ match.lname }}</div>

                            <div v-if="match.online" class="p-3">Online</div>
                            <div v-else class="p-3">Offline</div>

                        </div>
                    </div>
                </b-col>
            </div>
        </div>
        <div class="footer"><NavBar/></div>
    </div>

</template>

<script>

import {actions, state} from "@/store"

import NavBar from '@/components/NavBar.vue'
import Header from '@/components/HeaderNav.vue'

export default {
    components: { NavBar, Header },
    data: function () {
        return {
            online: state.online_users,
            user: state.user,
            matches: null
        }
    },
    mounted: async function () {
        this.matches = await actions.getUserMatches()
        this.checkOnline()
    },
    computed: {
        onlineUsers: function () {
            return state.online_users
        }
    },
    watch: {
        onlineUsers: function (newVal, oldVal) {
            this.checkOnline()
        }
    },
    methods: {
        chat: function (username) {
            this.$router.push(`/chat/${username}`)
        },
        checkOnline: function (username) {
            this.onlineUsers.forEach(u => {
                this.matches.forEach(m => m.online = m.id === u.id)
            })
        }
    }
}
</script>

<style>
    .avatar {
        width: 50px;
        height: auto;
        border-radius: 50%;
    }

    .match {
        cursor: pointer;
    }
</style>