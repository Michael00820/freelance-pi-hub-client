// src/pages/PostJob.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../lib/api';

const PLATFORM_FEE = 5; // %
const CLIENT_FEE = 3;   // %

export default function PostJob() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '',
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr('');
    if (!form.title || !form.description || !form.budget) {
      setErr('Please fill title, description, and budget.');
      return;
    }
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      budget: Number(form.budget),
      deadline: form.deadline || null,
      platformFeePct: PLATFORM_FEE,
      clientFeePct: CLIENT_FEE,
    };
    try {
      setLoading(true);
      const created = await API.createJob(payload);
      // Navigate to job detail if backend returns an id; otherwise back to list
      if (created && created.id) nav(`/jobs/${created.id}`);
      else nav('/');
    } catch (e2) {
      setErr(e2.message || 'Failed to create job.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Post a Job</h1>

      {err ? <div className="mb-4 text-red-600">{err}</div> : null}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            className="w-full border rounded p-2"
            placeholder="e.g., Build a landing page"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            className="w-full border rounded p-2"
            rows={5}
            placeholder="Tell freelancers what you need…"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Budget (PI)</label>
            <input
              name="budget"
              value={form.budget}
              onChange={onChange}
              type="number"
              className="w-full border rounded p-2"
              min={1}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Deadline (optional)</label>
            <input
              name="deadline"
              value={form.deadline}
              onChange={onChange}
              type="date"
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        <div className="text-sm text-gray-600">
          Platform fee: <b>{PLATFORM_FEE}%</b> · Client fee: <b>{CLIENT_FEE}%</b>
        </div>

        <button
          disabled={loading}
          className="bg-indigo-600 text-white rounded px-4 py-2 disabled:opacity-60"
        >
          {loading ? 'Posting…' : 'Create Job'}
        </button>
      </form>
    </div>
  );
}