// src/pages/Jobs.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../lib/api';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const r = await API.get('/jobs');
        setJobs(r.data || []);
      } catch (e) {
        setErr('Couldn’t load jobs. Please try again.');
      }
    })();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Open Jobs</h1>

      {err && <p className="text-red-500 mb-4">{err}</p>}

      <div className="space-y-4">
        {jobs.map((j) => (
          <Link
            key={j.id}
            to={`/jobs/${j.id}`}
            className="block bg-white rounded shadow p-4 hover:shadow-md transition"
          >
            <div className="text-xl font-semibold">{j.title}</div>
            <div className="text-sm text-gray-600 mt-1">
              Budget: {j.budget} PI
            </div>
            <p className="mt-3 text-gray-700">{j.description}</p>
            <div className="mt-3 text-sm text-gray-500">
              Platform fee {j.platformFeePct}% · Client fee {j.clientFeePct}%
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}