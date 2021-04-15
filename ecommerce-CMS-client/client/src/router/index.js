import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Sidebar from '../components/Sidebar.vue'
import Products from '../views/Products.vue'
import AddProduct from '../components/products/AddProduct.vue'
import EditProduct from '../components/products/EditProduct.vue'
import AddBanner from '../components/banners/AddBanner.vue'
import EditBanner from '../components/banners/EditBanner.vue'
import Banners from '../views/Banners.vue'
import Page404 from '../views/Page404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/sidebar',
    name: 'Sidebar',
    component: Sidebar
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/addProductPage/',
    name: 'addProductPage',
    component: AddProduct
  },
  {
    path: '/editProductPage/:id',
    name: 'editProductPage',
    component: EditProduct
  },
  {
    path: '/banners',
    name: 'Banners',
    component: Banners
  },
  {
    path: '/addBannerPage/',
    name: 'addBannerPage',
    component: AddBanner
  },
  {
    path: '/editBannerPage/:id',
    name: 'editBannerPage',
    component: EditBanner
  },
  {
    path: '*',
    name: 'unknown',
    component: Page404
  }
  // {
  //   path: '/register',
  //   name: 'Register',
  //   // route level code-splitting
  //   // this generates a separate chunk (register.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token')
  if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Dashboard' })
  } else if (to.name !== 'Login' && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
