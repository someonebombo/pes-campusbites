import axios from 'axios'

const api = axios.create({
  baseURL: 'https://pes-campusbites.onrender.com/api',
})

export default api