import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function PostJob() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    currency: "PI",
  });
  const [message, setMessage] = useState("");

  const platformFeePct = 5;
  const clientFeePct = 3;
  const budgetNum = Number(form.budget || 0);
  const platformFee = (budgetNum * platformFeePct) / 100;
  const clientFee = (budgetNum * clientFeePct) / 100;

  const onSubmit = (e) => {
    e.preventDefault();
    // DB is not connected yet — just confirm UI and show fee preview.
    setMessage(
      "Thanks! Posting is disabled until database is connected. Your draft was not saved."
    );
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Post a Job</h1>
      <p className="text-sm text-gray-500">
        Signed in as <strong>{user?.email}</strong>
      </p>

      <form onSubmit={onSubmit} className="mt-4 space-y-4">
        <input
          className="w-full border rounded p-3"
          placeholder="Job title"
          value={form.title}
          onChange={set("title")}
          required
        />
        <textarea
          className="w-full border rounded p-3"
          rows="6"
          placeholder="Describe the work…"
          value={form.description}
          onChange={set("description")}
          required
        />
        <div className="flex gap-3">
          <input
            className="flex-1 border rounded p-3"
            placeholder="Budget (PI)"
            type="number"
            min="0"
            value={form.budget}
            onChange={set("budget")}
            required
          />
          <input
            className="w-28 border rounded p-3"
            value={form.currency}
            onChange={set("currency")}
            disabled
          />
        </div>

        <div className="p-3 bg-gray-50 rounded text-sm">
          <div>Platform fee: {platformFeePct}% (~{platformFee} PI)</div>
          <div>Client fee: {clientFeePct}% (~{clientFee} PI)</div>
        </div>

        <button className="px-4 py-2 rounded bg-indigo-600 text-white">
          Submit (preview only)
        </button>
      </form>

      {message && <p className="mt-4 text-amber-600">{message}</p>}
    </div>
  );
}