import React, { useState } from 'react'
import API from '../lib/api'
import { useAuthStore } from '../store'

export default function Register(){
  const [form,setForm]=useState({email:'',password:'',name:'',role:'freelancer',pi_username:''})
  const [err,setErr]=useState('')
  const { setAuth } = useAuthStore()

  const submit = async (e)=>{
    e.preventDefault()
    setErr('')
    try{
      const r = await API.post('/auth/register', form)
      setAuth(r.data.user, r.data.token)
    }catch(e){ setErr(e.response?.data?.error || e.message) }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create account</h1>
      {err && <div className="bg-red-100 text-red-700 p-2 mb-2 rounded">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border p-2 rounded" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input type="password" className="w-full border p-2 rounded" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <input className="w-full border p-2 rounded" placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <select className="w-full border p-2 rounded" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
          <option value="freelancer">Freelancer</option>
          <option value="client">Client</option>
        </select>
        <input className="w-full border p-2 rounded" placeholder="Pi username (optional)" value={form.pi_username} onChange={e=>setForm({...form,pi_username:e.target.value})} />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded w-full">Create account</button>
      </form>
    </div>
  )
}