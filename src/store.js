import { create } from 'zustand'
const tokenKey = 'pifh_token'
export const useAuthStore = create((set)=>({
  user: null,
  token: localStorage.getItem(tokenKey) || null,
  setAuth: (user, token) => { localStorage.setItem(tokenKey, token); set({ user, token }) },
  logout: () => { localStorage.removeItem(tokenKey); set({ user:null, token:null }) }
}))