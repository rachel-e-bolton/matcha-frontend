import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {actions, state} from "@/store"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (state.loggedIn) {
        next('/profile')
      } else {
        next()
      }
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/SignUp.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    beforeEnter: (to, from, next) => {
      if (state.loggedIn) {
        next(`/profile/${state.user.username}`)
      } else {
        next()
      }
    }
  },
  {
    path: '/validate',
    name: 'validate',
    component: () => import('@/views/ValidateEmail.vue')
  },
  {
    path: '/reset-password',
    name: 'resetpassword',
    component: () => import('@/views/PasswordReset.vue')
  },
  {
    path: '/unauthorised',
    name: 'unauthorised',
    component: () => import('@/views/Unauthorised.vue')
  },
  {
    path: '*',
    name: 'notfound',
    component: () => import('@/views/404.vue')
  },
  {
    path: '/discover',
    name: 'discover',
    component: () => import('@/views/Discover.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/matches',
    name: 'matches',
    component: () => import('@/views/Matches'),
    beforeEnter: requireAuth
  },
  {
    path: '/settings',
    meta: "auth-required",
    name: 'settings',
    component: () => import('@/views/Settings.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/profile',
    name: 'profile-redirect',
    beforeEnter: (to, from, next) => {
      if (state.loggedIn) {
        next(`/profile/${state.user.username}`)
      } else {
        next()
      }
    }
  },
  {
    path: '/profile/:username',
    name: 'profile',
    component: () => import('@/views/Profile.vue'),
    beforeEnter: async (to, from, next) => {
      
      actions.isBlocked(to.params.username)
      .then(res => {
        if (res.blocked_me || res.blocked_them) {
          if (res.blocked_them) {
            actions.notify.error("You have blocked " + to.params.username + ". You cannot view their profile.")
          } else if (res.blocked_me) {
            actions.notify.error(to.params.username + " has blocked you. You cannot view their profile.")
          }
          setTimeout(() => {
            next('/discover')
          }, 100)
        } else {
          actions.profiledViewed(to.params.username)
          next()
        }
      })
    }
  },
  {
    path: '/chat/:username',
    name: 'chat',
    component: () => import('@/views/Chat.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/Admin.vue'),
    beforeEnter: isAdmin
  },
  {
    path: '/stats',
    name: 'stats',
    component: () => import('@/views/UserStats.vue'),
    beforeEnter: requireAuth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function requireAuth(to, from, next) {
  if (state.loggedIn) {
    next()
  } else {
    next("/login")
  }
}

function isAdmin(to, from, next) {
  if (state.loggedIn && state.user.is_admin) {
    next()
  } else if (state.loggedIn) {
    next('/profile')
  } else {
    next('/login')
  }
}

export default router
