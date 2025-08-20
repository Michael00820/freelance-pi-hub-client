import axios from "axios";

// Vercel/Vite only exposes variables that start with VITE_
const BASE =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE ||
  "http://localhost:3000";

const api = axios.create({
  baseURL: BASE.replace(/\/+$/, ""), // strip trailing slash
  timeout: 15000,
  headers: { "Content-Type": "application/json" }
});

// convenience helpers
api.get = (path, cfg) => axios.get(`${api.defaults.baseURL}${path}`, cfg);
api.post = (path, body, cfg) => axios.post(`${api.defaults.baseURL}${path}`, body, cfg);
api.put = (path, body, cfg) => axios.put(`${api.defaults.baseURL}${path}`, body, cfg);
api.delete = (path, cfg) => axios.delete(`${api.defaults.baseURL}${path}`, cfg);

export default api;