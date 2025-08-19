import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../lib/api';
import { saveAuth } from '../lib/auth';

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', name: '', role: 'Client' });
  const [err, setErr] = useState('');

  async function submit(e) {
    e.preventDefault();
    setErr('');
    try {
      const data = await API.post('/auth/register', form);
      saveAuth(data);
      nav('/jobs/new');
    } catch {
      setErr('Could not register.');
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create account</h1>
      {err && <p className="text-red-500 mb-3">{err}</p>}
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border p-2 rounded" placeholder="Email"
          value={form.email} onChange={e=>setForm(f=>({...f, email:e.target.value}))}/>
        <input className="w-full border p-2 rounded" placeholder="Name"
          value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))}/>
        <select className="w-full border p-2 rounded"
          value={form.role} onChange={e=>setForm(f=>({...f, role:e.target.value}))}>
          <option>Client</option>
          <option>Freelancer</option>
        </select>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded w-full">Sign up</button>
      </form>
    </div>
  );
}