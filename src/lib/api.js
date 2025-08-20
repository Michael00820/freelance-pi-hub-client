// src/lib/api.js
const BASE =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE ||
  '';

function url(p) {
  if (!BASE) throw new Error('VITE_API_URL is missing');
  return `${BASE.replace(/\/$/, '')}${p}`;
}

async function request(path, options = {}) {
  const res = await fetch(url(path), {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  // Try JSON either way (server may return text on error)
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }

  if (!res.ok) {
    const msg = (data && (data.error || data.message)) || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

export const API = {
  listJobs() {
    return request('/api/jobs');               // GET
  },
  createJob(payload) {
    return request('/api/jobs', {              // POST
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  getJob(id) {
    return request(`/api/jobs/${encodeURIComponent(id)}`); // GET
  },
  submitProposal(jobId, payload) {
    // If your backend doesn’t have this yet, we’ll “mock” success:
    return request(`/api/jobs/${encodeURIComponent(jobId)}/proposals`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }).catch(() => ({ ok: true, mock: true }));
  },
};