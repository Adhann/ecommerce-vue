import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Cart from '../views/Cart.vue'
import Page404 from '../views/Page404.vue'
// import Swal from 'sweetalert2'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '*',
    name: 'unknown',
    component: Page404
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('access_token')
  if ((user && to.name === 'Login') || (user && to.name === 'RegisterPage')) {
    next({ name: 'Home' })
  } else if (!user && to.name === 'Cart') {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
