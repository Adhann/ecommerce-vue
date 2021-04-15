import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://ecommerce-cms-server-adhan.herokuapp.com'
})

export default instance
