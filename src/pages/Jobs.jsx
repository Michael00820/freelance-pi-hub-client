import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../lib/api';
import { getUser, clearAuth } from '../lib/auth';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await API.get('/jobs');
        setJobs(data);
      } catch (e) {
        setErr('Couldn’t load jobs. Please try again.');
      }
    })();
  }, []);

  const user = getUser();

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Open Jobs</h1>
        <div className="flex gap-2">
          {user ? (
            <>
              <Link to="/jobs/new" className="px-3 py-2 rounded bg-indigo-600 text-white">
                Post a Job
              </Link>
              <button
                onClick={() => { clearAuth(); window.location.reload(); }}
                className="px-3 py-2 rounded border"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-2 rounded border">Login</Link>
              <Link to="/register" className="px-3 py-2 rounded bg-indigo-600 text-white">Sign up</Link>
            </>
          )}
        </div>
      </div>

      {err && <p className="text-red-500">{err}</p>}

      <div className="space-y-4 mt-4">
        {jobs.map(j => (
          <div key={j.id} className="bg-white rounded shadow p-4">
            <div className="text-xl font-semibold">{j.title}</div>
            <div className="text-sm text-gray-700 mt-1">Budget: {j.budget} {j.currency}</div>
            <p className="mt-2 text-gray-800">{j.description}</p>
            <div className="text-xs text-gray-500 mt-2">
              Platform fee {j.platformFeePct}% · Client fee {j.clientFeePct}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}