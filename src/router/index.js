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
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter: (to, from, next) => {
      if (isAuth()) {
        next()
      } else {
        next('/unauthorised')
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
    path: '/passwordreset',
    name: 'passwordreset',
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

export default router
