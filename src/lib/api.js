// src/lib/api.js
const BASE = (import.meta.env.VITE_API_URL || process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
const HEADERS = { "Content-Type": "application/json" };

async function request(path, options = {}) {
  const res = await fetch(`${BASE}/api${path}`, { headers: HEADERS, ...options });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export default {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
};