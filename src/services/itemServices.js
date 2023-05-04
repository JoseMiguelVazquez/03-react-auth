import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

// Si existe un token, mandalo en la petición (manda el token en todas las peticiones)
axios.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

const getSingleItem = (id) => axios.get(`${BASE_URL}/items/${id}`)
const getAllItems = () => axios.get(`${BASE_URL}/items`)

export {
  getSingleItem,
  getAllItems
}
