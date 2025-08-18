import React, { useState } from 'react'
import API from '../lib/api'
import { useAuthStore } from '../store'

export default function Login(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [err,setErr]=useState('')
  const { setAuth } = useAuthStore()

  const submit = async (e)=>{
    e.preventDefault()
    setErr('')
    try{
      const r = await API.post('/auth/login', { email, password })
      setAuth(r.data.user, r.data.token)
    }catch(e){ setErr(e.response?.data?.error || e.message) }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {err && <div className="bg-red-100 text-red-700 p-2 mb-2 rounded">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full border p-2 rounded" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded w-full">Login</button>
      </form>
    </div>
  )
}