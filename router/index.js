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

  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfilePage.vue') 
  },

  {
    path: '/editproduct/:id',
    name: 'EditProduct',
    component: () => import('../views/EditProductPage.vue') 
  },

  {
    path: '/addproduct',
    name: 'AddProduct',
    component: () => import('../views/AddProductPage.vue') 
  },

  {
    path: '/payment',
    name: 'Payment',
    component: () => import('../views/PaymentPage.vue') 
  },

  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/OrderPage.vue') 
  },

  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupPage') 
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
