// Simple fetch wrapper that respects Vite env
const BASE =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE) ||
  (typeof process !== "undefined" &&
    process.env &&
    process.env.VITE_API_BASE) ||
  "";

const base = BASE.replace(/\/+$/, ""); // trim trailing slash

async function http(method, path, body) {
  const url = path.startsWith("http") ? path : `${base}${path}`;
  const init = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (body) init.body = JSON.stringify(body);

  const res = await fetch(url, init);
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    const message = data?.message || `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return { data };
}

const API = {
  get: (p) => http("GET", p),
  post: (p, b) => http("POST", p, b),
  put: (p, b) => http("PUT", p, b),
  del: (p) => http("DELETE", p),
};

export default API;