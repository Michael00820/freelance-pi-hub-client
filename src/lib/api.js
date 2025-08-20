// src/lib/api.js
const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

async function request(path, options = {}) {
  const url = `${BASE}${path.startsWith('/') ? path : `/${path}`}`;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 20000); // 20s timeout

  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      signal: controller.signal,
      ...options,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`HTTP ${res.status} ${res.statusText} – ${text}`);
    }
    const ct = res.headers.get('content-type') || '';
    return ct.includes('application/json') ? res.json() : res.text();
  } finally {
    clearTimeout(id);
  }
}

// Public API
export const API = {
  getJobs: () => request('/jobs'),
  getJob: (id) => request(`/jobs/${encodeURIComponent(id)}`),
  postJob: (payload) =>
    request('/jobs', { method: 'POST', body: JSON.stringify(payload) }),
};

export default API;