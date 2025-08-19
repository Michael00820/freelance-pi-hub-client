import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../lib/api';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await API.get('/jobs'); // helper prefixes /api
        setJobs(Array.isArray(data) ? data : data.jobs || []);
      } catch (e) {
        console.error(e);
        setErr("Couldn't load jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Open Jobs</h1>

      {loading && <div>Loading…</div>}
      {err && <div className="text-red-600">{err}</div>}

      {!loading && !err && (
        <div className="grid sm:grid-cols-2 gap-4">
          {jobs.map(j => (
            <Link key={j.id} to={`/jobs/${j.id}`} className="block bg-white rounded shadow p-4">
              <div className="font-semibold">{j.title}</div>
              <div className="text-sm text-gray-600">
                Budget: {j.budget} {j.currency}
              </div>
              <p className="mt-2 text-gray-700 line-clamp-3">{j.description}</p>
            </Link>
          ))}
          {jobs.length === 0 && <div>No jobs yet.</div>}
        </div>
      )}
    </div>
  );
}