// src/pages/JobDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../lib/api';

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [showApply, setShowApply] = useState(false);
  const [proposal, setProposal] = useState({ message: '', amount: '' });
  const [applyMsg, setApplyMsg] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await API.getJob(id);
        if (alive) setJob(data);
      } catch (e) {
        if (alive) setErr(e.message || 'Failed to load job.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [id]);

  async function submitProposal(e) {
    e.preventDefault();
    setApplyMsg('');
    try {
      const res = await API.submitProposal(id, {
        message: proposal.message.trim(),
        amount: Number(proposal.amount || 0),
      });
      setApplyMsg(res?.mock ? 'Proposal sent (mock).' : 'Proposal sent.');
      setShowApply(false);
      setProposal({ message: '', amount: '' });
    } catch (e2) {
      setApplyMsg(e2.message || 'Failed to submit proposal.');
      setShowApply(false);
    }
  }

  if (loading) return <div className="p-4">Loading…</div>;
  if (err) return <div className="p-4 text-red-600">{err}</div>;
  if (!job) return <div className="p-4">Not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {applyMsg ? <div className="mb-3 text-green-700">{applyMsg}</div> : null}

      <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
      <div className="text-gray-700 mb-2">{job.description}</div>

      <div className="text-sm text-gray-600 mb-4">
        Budget: <b>{job.budget} PI</b> · Platform fee <b>{job.platformFeePct}%</b> · Client fee <b>{job.clientFeePct}%</b>
      </div>

      <button
        className="bg-indigo-600 text-white rounded px-4 py-2"
        onClick={() => setShowApply(true)}
      >
        Apply
      </button>

      {/* Simple modal */}
      {showApply && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <form
            onSubmit={submitProposal}
            className="bg-white w-full max-w-md rounded p-4 space-y-3"
          >
            <h2 className="text-lg font-semibold">Submit Proposal</h2>
            <textarea
              className="w-full border rounded p-2"
              rows={4}
              placeholder="Your message to the client…"
              value={proposal.message}
              onChange={(e) => setProposal((p) => ({ ...p, message: e.target.value }))}
            />
            <input
              className="w-full border rounded p-2"
              type="number"
              min={0}
              placeholder="Your bid amount (PI)"
              value={proposal.amount}
              onChange={(e) => setProposal((p) => ({ ...p, amount: e.target.value }))}
            />
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                className="rounded px-4 py-2 border"
                onClick={() => setShowApply(false)}
              >
                Cancel
              </button>
              <button className="rounded px-4 py-2 bg-indigo-600 text-white">Send</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}