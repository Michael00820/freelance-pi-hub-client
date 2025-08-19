
// Example envs in Vercel:
// VITE_API_URL=https://freelance-pi-hub-server-1.onrender.com
// (optional) VITE_API_PREFIX=/api
const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
const RAW_PREFIX = import.meta.env.VITE_API_PREFIX || '';
const PREFIX = RAW_PREFIX ? `/${RAW_PREFIX.replace(/^\/|\/$/g, '')}` : '';

function joinUrl(usePrefix, path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${usePrefix ? PREFIX : ''}${p}`;
}

async function doFetch(url, { method = 'GET', body, headers = {} } = {}) {
  const res = await fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'omit',
  });

  const text = await res.text();
  const data = text ? (() => { try { return JSON.parse(text); } catch { return text; } })() : null;

  if (!res.ok) {
    const msg =
      (data && typeof data === 'object' && (data.error || data.message)) ||
      `HTTP ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return { data, status: res.status, ok: true };
}

/**
 * If a prefix (e.g., "/api") is configured but the route returns 404,
 * retry once without the prefix (helps if backend exposes "/jobs" not "/api/jobs").
 */
async function fetchWithPrefixFallback(path, opts) {
  // Try with prefix (if any)
  if (PREFIX) {
    try {
      return await doFetch(joinUrl(true, path), opts);
    } catch (e) {
      if (e.status === 404) {
        // Retry without prefix
        return await doFetch(joinUrl(false, path), opts);
      }
      throw e;
    }
  }
  // No prefix configured; go straight
  return await doFetch(joinUrl(false, path), opts);
}

const API = {
  async get(path, opts = {}) {
    return fetchWithPrefixFallback(path, { ...opts, method: 'GET' });
  },
  async post(path, body, opts = {}) {
    return fetchWithPrefixFallback(path, { ...opts, method: 'POST', body });
  },
  async put(path, body, opts = {}) {
    return fetchWithPrefixFallback(path, { ...opts, method: 'PUT', body });
  },
  async del(path, opts = {}) {
    return fetchWithPrefixFallback(path, { ...opts, method: 'DELETE' });
  },
};

export default API;