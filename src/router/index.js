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
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    beforeEnter: (to, from, next) => {
      if (state.loggedIn) {
        next('/profile')
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
    path: '/settings',
    meta: "auth-required",
    name: 'settings',
    component: () => import('@/views/Settings.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/MyProfile.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/views/Chat.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/Admin.vue'),
    beforeEnter: requireAuth
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


function isAuth() {
  return state.loggedIn
}

function isAdmin() {
  return (state.loggedIn && state.user.is_admin)
}

export default router
