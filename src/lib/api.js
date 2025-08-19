// Base URL for the backend, e.g. "https://freelance-pi-hub-server-1.onrender.com"
const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

/**
 * Minimal fetch helper.
 * Throws an Error on non-2xx responses with a useful message.
 */
async function request(path, { method = 'GET', body, headers = {} } = {}) {
  if (!BASE) throw new Error('VITE_API_URL is not set');

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Accept': 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    // no credentials needed for our current public endpoints
    credentials: 'omit',
  });

  // Try to parse JSON either way for better errors
  const text = await res.text();
  const data = text ? (() => { try { return JSON.parse(text); } catch { return text; } })() : null;

  if (!res.ok) {
    const msg =
      (data && typeof data === 'object' && (data.error || data.message)) ||
      `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data;
}

/**
 * Fetch all jobs (reads from /api/jobs).
 */
export function getJobs() {
  return request('/api/jobs');
}

// (Optional) export the helper for future calls like POST/PUT later
export { request };