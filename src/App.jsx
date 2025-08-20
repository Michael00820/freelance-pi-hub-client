import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import Jobs from "./pages/Jobs.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PostJob from "./pages/PostJob.jsx";

/** Simple site header shown on every page */
function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">Freelance Pi Hub</Link>
        <nav className="flex items-center gap-4">
          <Link to="/jobs" className="hover:underline">Jobs</Link>
          <Link to="/login" className="px-3 py-1 rounded border">Login</Link>
          <Link to="/register" className="px-3 py-1 rounded bg-indigo-600 text-white">Sign up</Link>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Navigate to="/jobs" replace />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post-job" element={<PostJob />} />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/jobs" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}