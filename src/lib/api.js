import axios from 'axios'
import { useAuthStore } from '../store'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'
})

API.interceptors.request.use((config)=>{
  const { token } = useAuthStore.getState()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default API