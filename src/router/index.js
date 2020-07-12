import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (isAuth()) {
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
      if (isAuth()) {
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
    component: () => import('@/views/Discover.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/Settings.vue'),
    beforeEnter: (to, from, next) => {
      if (isAuth()) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Profile.vue'),
    beforeEnter: (to, from, next) => {
      if (isAuth()) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/views/Chat.vue'),
    beforeEnter: (to, from, next) => {
      if (isAuth()) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/Admin.vue'),
    beforeEnter: (to, from, next) => {
      if (isAdmin()) {
        next()
      } else {
        next('/unauthorised')
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function isAuth() {
  let auth = localStorage.getItem("firewood")
  if (auth) {
    return true
  } else {
    return false
  }
}

function isAdmin() {
  if (isAuth()) {
    Vue.prototype.$auth = Vue.observable(JSON.parse(localStorage.getItem("firewood")))
    return Vue.prototype.$auth.user.is_admin
  } else {
    return false
  }
}

export default router
