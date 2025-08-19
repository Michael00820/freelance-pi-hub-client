const BASE = import.meta.env.VITE_API_URL;

async function handle(r) {
  if (!r.ok) {
    const t = await r.text().catch(() => '');
    throw new Error(t || `HTTP ${r.status}`);
  }
  const ct = r.headers.get('content-type') || '';
  return ct.includes('application/json') ? r.json() : r.text();
}

export default {
  async get(path) {
    const r = await fetch(`${BASE}${path}`);
    return handle(r);
  },
  async post(path, body, token) {
    const r = await fetch(`${BASE}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });
    return handle(r);
  },
};