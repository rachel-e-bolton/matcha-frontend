import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
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
  },
  {
    path: '/discover',
    name: 'discover',
    component: () => import('@/views/Discover.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
