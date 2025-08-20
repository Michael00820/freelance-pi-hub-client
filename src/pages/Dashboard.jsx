import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../lib/api';

function Section({ title, children, action }) {
  return (
    <div className="bg-white rounded shadow p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
}

export default function Dashboard() {
  const [tab, setTab] = useState('client'); // 'client' | 'freelancer'
  const [loading, setLoading] = useState(true);
  const [clientJobs, setClientJobs] = useState([]);
  const [apps, setApps] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [j, a] = await Promise.all([
          API.get('/my/jobs'),
          API.get('/my/applications'),
        ]);
        setClientJobs(j.data || []);
        setApps(a.data || []);
      } catch (e) {
        setErr('Could not load dashboard.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab('client')}
          className={`px-4 py-2 rounded ${tab==='client'?'bg-indigo-600 text-white':'bg-gray-200'}`}
        >
          Client
        </button>
        <button
          onClick={() => setTab('freelancer')}
          className={`px-4 py-2 rounded ${tab==='freelancer'?'bg-indigo-600 text-white':'bg-gray-200'}`}
        >
          Freelancer
        </button>
      </div>

      {loading && <div className="text-gray-500">Loading dashboard…</div>}
      {err && <div className="text-red-600">{err}</div>}

      {!loading && !err && tab === 'client' && (
        <>
          <Section
            title="Your posted jobs"
            action={<Link to="/post-job" className="text-indigo-600">+ Post a job</Link>}
          >
            {clientJobs.length === 0 ? (
              <div className="text-gray-500">You haven’t posted any jobs yet.</div>
            ) : (
              <ul className="space-y-3">
                {clientJobs.map(j => (
                  <li key={j.id} className="border rounded p-3">
                    <Link to={`/jobs/${j.id}`} className="font-semibold">{j.title}</Link>
                    <div className="text-sm text-gray-600">
                      Budget: {j.budget} {j.currency} · Platform fee 5% · Client fee 3%
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        </>
      )}

      {!loading && !err && tab === 'freelancer' && (
        <>
          <Section title="Your applications">
            {apps.length === 0 ? (
              <div className="text-gray-500">No applications yet.</div>
            ) : (
              <ul className="space-y-3">
                {apps.map(a => (
                  <li key={a.id} className="border rounded p-3">
                    <Link to={`/jobs/${a.job.id}`} className="font-semibold">{a.job.title}</Link>
                    <div className="text-sm text-gray-600">
                      Your bid: {a.bid} {a.job.currency} · Submitted {new Date(a.createdAt).toLocaleDateString()}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        </>
      )}
    </div>
  );
}