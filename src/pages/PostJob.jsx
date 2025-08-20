import React, { useMemo, useState } from 'react';
import API from '../lib/api';
import { useNavigate } from 'react-router-dom';

const PLATFORM_FEE_PCT = 5;
const CLIENT_FEE_PCT = 3;

export default function PostJob() {
  const nav = useNavigate();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [budget, setBudget] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const numBudget = Number(budget) || 0;

  const totals = useMemo(() => {
    const platformFee = Math.round((numBudget * PLATFORM_FEE_PCT) * 100) / 100 / 100; // unused in UI; kept for clarity
    const clientFee = Math.round((numBudget * CLIENT_FEE_PCT) * 100) / 100 / 100; // ditto
    const clientTotal = Math.round(numBudget * 1.03 * 100) / 100;
    return { clientTotal };
  }, [numBudget]);

  async function submit(e) {
    e.preventDefault();
    setErr('');
    if (!title.trim() || !desc.trim() || !numBudget) {
      setErr('Please fill all fields with a valid budget.');
      return;
    }
    try {
      setLoading(true);
      const res = await API.post('/jobs', {
        title: title.trim(),
        description: desc.trim(),
        budget: numBudget,
        currency: 'PI',
      });
      nav(`/jobs/${res.data.id}`);
    } catch (e) {
      setErr('Could not post job (mock).');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Post a Job</h1>

      <form onSubmit={submit} className="space-y-4">
        {err && <div className="text-red-600">{err}</div>}

        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={e=>setTitle(e.target.value)}
            placeholder="e.g., Build a React landing page"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows={5}
            value={desc}
            onChange={e=>setDesc(e.target.value)}
            placeholder="Describe the scope, deliverables, and timeline…"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Budget (PI)</label>
          <input
            type="number"
            min="1"
            className="w-full border rounded px-3 py-2"
            value={budget}
            onChange={e=>setBudget(e.target.value)}
            placeholder="120"
          />
          <div className="text-sm text-gray-600 mt-2">
            Platform fee <b>5%</b> · Client fee <b>3%</b><br/>
            Client pays total: <b>{totals.clientTotal || 0} PI</b>
          </div>
        </div>

        <div className="flex gap-3">
          <button disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded">
            {loading ? 'Posting…' : 'Post Job'}
          </button>
        </div>
      </form>
    </div>
  );
}