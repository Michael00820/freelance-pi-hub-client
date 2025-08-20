import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../lib/api';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setErr('');
      try {
        const data = await API.getJobs();
        if (!mounted) return;
        const list = Array.isArray(data) ? data : data?.jobs || [];
        setJobs(list);
      } catch (e) {
        console.error('Failed to load jobs', e);
        setErr('Couldn’t load jobs. Please try again.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Open Jobs</h1>
        <Link
          to="/post-job"
          className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Post a Job
        </Link>
      </div>

      {loading && <p className="text-gray-500">Loading…</p>}
      {err && <p className="text-red-500">{err}</p>}

      {!loading && !err && jobs.length === 0 && (
        <div className="rounded-md border border-dashed p-6 text-center text-gray-600">
          <p>No jobs yet.</p>
          <p className="mt-2">
            Be the first to{' '}
            <Link to="/post-job" className="text-indigo-600 underline">
              post a job
            </Link>
            .
          </p>
        </div>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {jobs.map((j) => (
          <Link
            key={j.id}
            to={`/jobs/${j.id}`}
            className="block rounded-lg border bg-white p-4 shadow hover:shadow-md"
          >
            <h2 className="text-lg font-semibold">{j.title}</h2>
            <div className="mt-1 text-sm text-gray-600">Budget: {j.budget} PI</div>
            <p className="mt-3 text-gray-700 line-clamp-3">{j.description}</p>
            {(j.platformFeePct != null || j.clientFeePct != null) && (
              <div className="mt-3 text-xs text-gray-500">
                Platform fee {j.platformFeePct ?? 0}% · Client fee {j.clientFeePct ?? 0}%
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}