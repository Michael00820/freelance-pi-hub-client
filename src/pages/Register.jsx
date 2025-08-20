import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../lib/api.js";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("freelancer");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!email.trim() || !name.trim()) return setErr("Name and email are required");
    try {
      setLoading(true);
      await API.post("/auth/register", { email, name, role });
      localStorage.setItem("piHub.email", email);
      navigate("/jobs");
    } catch {
      setErr("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{maxWidth: 480, margin: "0 auto"}}>
      <h1 style={{fontSize: 24, fontWeight: 700, marginBottom: 16}}>Create account</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          style={{width: "100%", border: "1px solid #ddd", borderRadius: 6, padding: 10, marginTop: 6, marginBottom: 10}}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
        />
        <label>Email</label>
        <input
          type="email"
          style={{width: "100%", border: "1px solid #ddd", borderRadius: 6, padding: 10, marginTop: 6, marginBottom: 10}}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <label>Role</label>
        <select
          style={{width: "100%", border: "1px solid #ddd", borderRadius: 6, padding: 10, marginTop: 6}}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="freelancer">Freelancer</option>
          <option value="client">Client</option>
        </select>

        {err && <p style={{color: "crimson"}}>{err}</p>}

        <button
          disabled={loading}
          style={{marginTop: 12, width: "100%", padding: 10, borderRadius: 6, background: "#4f46e5", color: "#fff"}}
        >
          {loading ? "Creating account…" : "Create account"}
        </button>

        <p style={{marginTop: 10}}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}