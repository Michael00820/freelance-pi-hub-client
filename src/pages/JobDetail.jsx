import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../lib/api';

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async ()=>{
      try {
        const r = await API.get(`/jobs/${id}`);
        setJob(r.data);
      } catch {
        setErr('Job not found.');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="text-gray-500">Loading…</div>;
  if (err) return <div className="text-red-600">{err}</div>;
  if (!job) return null;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
      <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
      <div className="text-gray-700 mb-4">{job.description}</div>
      <div className="text-sm text-gray-600 mb-4">
        Budget: {job.budget} {job.currency} · Platform fee 5% · Client fee 3%
      </div>

      <div className="flex gap-3">
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded" disabled>
          Apply (coming soon)
        </button>
        <Link to="/" className="text-indigo-600">← Back to jobs</Link>
      </div>
    </div>
  );
}