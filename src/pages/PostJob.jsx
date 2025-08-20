import React, { useState } from "react";
import API from "../lib/api";
import { useNavigate } from "react-router-dom";

const PLATFORM_FEE_PCT = 5;   // visible on UI
const CLIENT_FEE_PCT   = 3;   // visible on UI

export default function PostJob() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    currency: "PI",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const budgetNum = Number(form.budget) || 0;
  const platformFee = Math.round((budgetNum * PLATFORM_FEE_PCT) * 100) / 100 / 100; // avoid floats
  const clientFee   = Math.round((budgetNum * CLIENT_FEE_PCT) * 100) / 100 / 100;

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim() || !form.description.trim() || !budgetNum) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      // Create payload the backend expects
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        budget: budgetNum,
        currency: form.currency,
      };

      // POST to /api/jobs (our API helper auto-prefixes /api)
      const res = await API.post("/jobs", payload);

      // If backend returns the new job id, go to its page; otherwise back to jobs
      const newId = res?.data?.id;
      if (newId) {
        navigate(`/jobs/${newId}`);
      } else {
        navigate("/jobs");
      }
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Could not post job. Please try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Post a Job</h1>

      {error && (
        <div className="mb-4 rounded bg-red-50 text-red-700 p-3 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            name="title"
            type="text"
            value={form.title}
            onChange={onChange}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g., Build a landing page"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description *</label>
          <textarea
            name="description"
            rows={5}
            value={form.description}
            onChange={onChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Briefly describe the work…"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Budget (PI) *</label>
            <input
              name="budget"
              type="number"
              min="1"
              value={form.budget}
              onChange={onChange}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g., 120"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Currency</label>
            <select
              name="currency"
              value={form.currency}
              onChange={onChange}
              className="w-full border rounded px-3 py-2 bg-white"
            >
              <option value="PI">PI</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <div>Platform fee: <strong>{PLATFORM_FEE_PCT}%</strong></div>
          <div>Client fee: <strong>{CLIENT_FEE_PCT}%</strong></div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {submitting ? "Posting…" : "Post Job"}
        </button>
      </form>
    </div>
  );
}