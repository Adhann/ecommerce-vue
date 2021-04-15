import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    banners: []
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setBanners (state, payload) {
      state.banners = payload
    }
  },
  actions: {
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
          router.push('/admin')
        })
        .catch((err) => {
          console.log({ err }, '<< error')
          Swal.fire({
            title: 'Error!',
            text: '',
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
          console.log(err.response.data.errors)
        })
    },
    fetchProductsById (context, payload) {
      console.log(payload, '<<<<payload by id')
      axios({
        url: `/products/${payload}`,
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          category: payload
        }
      })
        .then(({ data }) => {
          context.commit('setProducts', data)
        })
        .catch(err => {
          console.log(err.response.data.errors)
        })
    },
    addProduct (context, payload) {
      const { name, description, price, stock, category, imageUrl } = payload
      axios({
        url: '/products',
        method: 'POST',
        data: {
          name,
          description,
          price,
          stock,
          category,
          image_url: imageUrl
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ response }) => {
          router.push('/products')
        })
        .catch((err) => {
          const thisError = JSON.parse(err.request.response)
          Swal.fire({
            title: 'Error!',
            text: thisError.error.errors[0].message,
            icon: 'error',
            confirmButtonText: 'OK'
          })
          console.log({ err })
        })
    },
    editProduct (context, payload) {
      const { id, imageUrl, name, category, price, stock } = payload
      axios({
        url: `/products/${id}`,
        method: 'PUT',
        data: {
          name,
          category,
          image_url: imageUrl,
          price,
          stock
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          router.push('/products')
        })
        .catch(err => {
          const thisError = JSON.parse(err.request.response)
          Swal.fire({
            title: 'Error!',
            text: thisError.error.errors[0].message,
            icon: 'error',
            confirmButtonText: 'OK'
          })
          console.log({ err })
        })
    },
    deleteProduct (context, payload) {
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
            url: `/products/${id}`,
            method: 'DELETE',
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          })
            .then((response) => {
              context.dispatch('fetchProducts')
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
    },
    fetchBanners (context, payload) {
      axios({
        url: '/banners',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('setBanners', data)
        })
        .catch(err => {
          console.log(err.response.data.errors)
        })
    },
    addBanner (context, payload) {
      console.log(payload, '<<< payload')
      const { title, status, imageUrl } = payload
      axios({
        url: '/banners',
        method: 'POST',
        data: {
          title,
          status,
          image_url: imageUrl
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ response }) => {
          router.push('/banners')
        })
        .catch((err) => {
          const thisError = JSON.parse(err.request.response)
          Swal.fire({
            title: 'Error!',
            text: thisError.error.errors[0].message,
            icon: 'error',
            confirmButtonText: 'OK'
          })
          console.log({ err })
        })
    },
    editBanner (context, payload) {
      const { id, title, status, imageUrl } = payload
      axios({
        url: `/banners/${id}`,
        method: 'PUT',
        data: {
          title,
          status,
          image_url: imageUrl
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          router.push('/banners')
        })
        .catch(err => {
          const thisError = JSON.parse(err.request.response)
          Swal.fire({
            title: 'Error!',
            text: thisError.error.errors[0].message,
            icon: 'error',
            confirmButtonText: 'OK'
          })
          console.log({ err })
        })
    },
    deleteBanner (context, payload) {
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
            url: `/banners/${id}`,
            method: 'DELETE',
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          })
            .then((response) => {
              context.dispatch('fetchBanners')
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
