import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

// Si existe un token, mandalo en la petición
axios.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

const registerUserService = (data) => axios.post(`${BASE_URL}/register`, data)
const loginUserService = (data) => axios.post(`${BASE_URL}/login`, data)

const getSingleUser = (id) => axios.get(`${BASE_URL}/users/${id}`)

export {
  registerUserService,
  loginUserService,
  getSingleUser
}
