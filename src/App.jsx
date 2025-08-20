import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Jobs from "./pages/Jobs.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function Header() {
  return (
    <header style={{borderBottom: "1px solid #eee"}}>
      <nav style={{maxWidth: 960, margin: "0 auto", padding: "12px 16px", display: "flex", gap: 16}}>
        <Link to="/" style={{fontWeight: 700}}>Freelance Pi Hub</Link>
        <Link to="/jobs">Jobs</Link>
        <div style={{marginLeft: "auto", display: "flex", gap: 8}}>
          <Link to="/login">Login</Link>
          <Link to="/register" style={{padding: "2px 8px", border: "1px solid #ddd", borderRadius: 6}}>
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main style={{maxWidth: 960, margin: "0 auto", padding: "16px"}}>
        <Routes>
          <Route path="/" element={<Navigate to="/jobs" replace />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/jobs" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}