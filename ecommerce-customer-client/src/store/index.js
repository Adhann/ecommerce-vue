import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    carts: [],
    isLogin: true
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setCarts (state, payload) {
      state.carts = payload
    },
    setIsLogin (state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    changeIsLogin (context, payload) {
      context.commit('setIsLogin', payload)
    },
    login (context, payload) {
      axios({
        url: '/users/login',
        method: 'POST',
        data: {
          email: payload.loginEmail,
          password: payload.loginPassword
        }
      })
        .then(({ data }) => {
          localStorage.access_token = data.access_token
          localStorage.name = data.name
          context.commit('setIsLogin', true)
          router.push('/')
        })
        .catch((err) => {
          const errors = err.response.data.errors
          console.log(errors, '<< error')
          Swal.fire({
            title: 'Error!',
            text: errors,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        })
    },
    register (context, payload) {
      const { registerName, registerEmail, registerPassword } = payload
      axios({
        url: '/users/register',
        method: 'POST',
        data: {
          name: registerName,
          email: registerEmail,
          password: registerPassword
        }
      })
        .then(response => {
          router.push('/login')
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Success create account!'
          })
        })
        .catch(err => {
          const errors = err.response.data.errors
          console.log(errors, '<< error')
          Swal.fire({
            title: 'Error!',
            text: errors,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        })
    },
    fetchProducts (context, payload) {
      axios({
        url: '/products',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('setProducts', data)
        })
        .catch(err => {
          const errors = err.response.data.errors
          console.log(errors, '<< error')
          Swal.fire({
            title: 'Error!',
            text: errors,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        })
    },
    fetchCarts (context, payload) {
      axios({
        url: '/carts',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('setCarts', data)
        })
        .catch(err => {
          const errors = err.response.data.errors
          console.log(errors, '<< error')
          Swal.fire({
            title: 'Error!',
            text: errors,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        })
    },
    addToCart (context, payload) {
      console.log(payload, '<<payload')
      const id = payload
      console.log(id, '<<id payload')
      axios({
        url: `/carts/${id}`,
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(() => {
          context.dispatch('fetchCarts')
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Success add to cart!'
          })
        })
        .catch(err => {
          const errors = err.response.data.errors
          console.log(errors, '<< error')
          Swal.fire({
            title: 'Error!',
            text: errors,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        })
    },
    updateQty (context, payload) {
      const id = payload
      axios({
        url: `/carts/${id}`,
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(() => {
          context.dispatch('fetchCarts')
        })
        .catch(err => {
          const errors = err.response.data.errors
          console.log(errors, '<< error')
          Swal.fire({
            title: 'Error!',
            text: errors,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        })
    },
    deleteCart (context, payload) {
      const id = payload
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios({
            url: `/carts/${id}`,
            method: 'DELETE',
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          })
            .then((response) => {
              context.dispatch('fetchCarts')
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            })
            .catch((err) => {
              const errors = err.response.data.errors
              this.swalFail(errors)
            })
        }
      })
    }
  }
})
