import React, { useState } from 'react'
import API from '../lib/api'

export default function NewJob(){
  const [form,setForm]=useState({title:'',description:'',budget_pi:0})
  const [msg,setMsg]=useState(''); const [err,setErr]=useState('')

  const submit = async (e)=>{
    e.preventDefault(); setMsg(''); setErr('')
    try{
      await API.post('/jobs', {...form, budget_pi:Number(form.budget_pi)})
      setMsg('Job posted!'); setForm({title:'',description:'',budget_pi:0})
    }catch(e){ setErr(e.response?.data?.error || e.message) }
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
      {msg && <div className="bg-green-100 text-green-700 p-2 mb-2 rounded">{msg}</div>}
      {err && <div className="bg-red-100 text-red-700 p-2 mb-2 rounded">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border p-2 rounded" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
        <textarea className="w-full border p-2 rounded h-40" placeholder="Describe your project..." value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        <input className="w-full border p-2 rounded" placeholder="Budget (Pi)" value={form.budget_pi} onChange={e=>setForm({...form,budget_pi:e.target.value})} />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">Create Job</button>
      </form>
    </div>
  )
}