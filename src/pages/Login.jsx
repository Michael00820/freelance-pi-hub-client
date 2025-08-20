import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../lib/api";
import { saveAuth } from "../lib/auth";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // kept for future DB auth
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      // Mock backend accepts POST /auth/login with { email }
      const res = await API.post("/auth/login", { email });
      // save token + user to localStorage for “logged-in” experience
      if (res?.data?.token) saveAuth(res.data);
      nav("/dashboard");
    } catch (e) {
      setErr("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {err && <div className="mb-4 p-3 rounded bg-red-100 text-red-700">{err}</div>}

        <form onSubmit={submit} className="space-y-4">
          <input
            className="w-full border rounded px-3 py-2"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password kept for future real auth; not used by mock API */}
          <input
            className="w-full border rounded px-3 py-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white rounded px-4 py-2"
          >
            {loading ? "Signing in…" : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}