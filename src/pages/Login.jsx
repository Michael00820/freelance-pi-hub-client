import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../lib/api.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!email.trim()) return setErr("Email is required");
    try {
      setLoading(true);
      await API.post("/auth/login", { email });
      localStorage.setItem("piHub.email", email);
      navigate("/jobs");
    } catch {
      setErr("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{maxWidth: 480, margin: "0 auto"}}>
      <h1 style={{fontSize: 24, fontWeight: 700, marginBottom: 16}}>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          style={{width: "100%", border: "1px solid #ddd", borderRadius: 6, padding: 10, marginTop: 6}}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        {err && <p style={{color: "crimson"}}>{err}</p>}
        <button
          disabled={loading}
          style={{marginTop: 12, width: "100%", padding: 10, borderRadius: 6, background: "#4f46e5", color: "#fff"}}
        >
          {loading ? "Logging in…" : "Login"}
        </button>
        <p style={{marginTop: 10}}>
          Don’t have an account? <Link to="/register">Create one</Link>
        </p>
      </form>
    </div>
  );
}