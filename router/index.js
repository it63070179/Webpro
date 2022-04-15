import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue') // set home as path '/'
  },

  {
    path: '/product',
    name: 'Product',
    component: () => import('../views/ProductPage.vue')
  },

  {
    path: '/promotion',
    name: 'Promotion',
    component: () => import('../views/PromotionPage.vue') 
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue') 
  },

  {
    path: '/forgetpassword',
    name: 'Forgetpassword',
    component: () => import('../views/ForgetPasswordPage.vue') 
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
