import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../lib/api';
import { getToken } from '../lib/auth';

export default function NewJob() {
  const nav = useNavigate();
  const [form, setForm] = useState({ title:'', description:'', budget:'' });
  const [err, setErr] = useState('');
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (!getToken()) nav('/login');
  }, [nav]);

  const platformFeePct = 5;
  const clientFeePct = 3;
  const b = Number(form.budget || 0);
  const platformFee = b * platformFeePct / 100;
  const clientFee = b * clientFeePct / 100;

  async function submit(e) {
    e.preventDefault();
    setErr('');
    try {
      await API.post('/jobs', {
        title: form.title,
        description: form.description,
        budget: Number(form.budget),
        currency: 'PI',
      }, getToken());
      setOk(true);
      setForm({ title:'', description:'', budget:'' });
      setTimeout(()=>nav('/jobs'), 700);
    } catch {
      setErr('Failed to create job.');
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
      {ok && <p className="text-green-600 mb-3">Job created!</p>}
      {err && <p className="text-red-500 mb-3">{err}</p>}

      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border p-2 rounded" placeholder="Title"
          value={form.title} onChange={e=>setForm(f=>({...f, title:e.target.value}))}/>
        <textarea className="w-full border p-2 rounded" rows={4} placeholder="Description"
          value={form.description} onChange={e=>setForm(f=>({...f, description:e.target.value}))}/>
        <input className="w-full border p-2 rounded" type="number" min="0" placeholder="Budget (PI)"
          value={form.budget} onChange={e=>setForm(f=>({...f, budget:e.target.value}))}/>
        <div className="text-sm text-gray-600">
          Platform fee (5%): <b>{platformFee || 0} PI</b><br/>
          Client fee (3%): <b>{clientFee || 0} PI</b>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">Create Job</button>
      </form>
    </div>
  );
}