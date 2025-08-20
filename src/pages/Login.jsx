import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!email.trim()) {
      setErr("Email is required");
      return;
    }
    try {
      setLoading(true);
      // Mock login: your backend can replace this endpoint later
      const res = await API.post("/auth/login", { email });
      // Save a fake token/email so UI can show “logged in”
      localStorage.setItem("piHub.email", email);
      if (res?.data?.token) localStorage.setItem("piHub.token", res.data.token);
      navigate("/dashboard");
    } catch (e) {
      setErr("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {err && <p className="text-red-600 text-sm">{err}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white rounded px-3 py-2 disabled:opacity-60"
        >
          {loading ? "Logging in…" : "Login"}
        </button>

        <p className="text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 underline">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}