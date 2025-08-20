import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../lib/api";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const r = await API.get("/jobs");
        const found = r.data.jobs?.find(j => String(j.id) === String(id));
        if (!found) return setErr("Job not found.");
        setJob(found);
      } catch (e) {
        setErr("Could not load job.");
      }
    })();
  }, [id]);

  if (err) return <p className="p-6 text-red-500">{err}</p>;
  if (!job) return <p className="p-6">Loading…</p>;

  const platformFee = (job.budget * (job.platformFeePct ?? 5)) / 100;
  const clientFee = (job.budget * (job.clientFeePct ?? 3)) / 100;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link to="/jobs" className="text-sm underline">← Back to jobs</Link>
      <h1 className="text-2xl font-bold mt-2">{job.title}</h1>
      <p className="mt-2 text-gray-700 whitespace-pre-line">{job.description}</p>

      <div className="mt-4 p-4 bg-white rounded shadow">
        <div>Budget: <strong>{job.budget} PI</strong></div>
        <div className="text-sm text-gray-600">
          Platform fee {job.platformFeePct}% (~{platformFee} PI) ·
          Client fee {job.clientFeePct}% (~{clientFee} PI)
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button className="px-4 py-2 rounded bg-indigo-600 text-white" disabled>
          Apply (coming soon)
        </button>
        <button className="px-4 py-2 rounded border" disabled>
          Save job (coming soon)
        </button>
      </div>
    </div>
  );
}