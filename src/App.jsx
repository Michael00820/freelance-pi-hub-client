// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Jobs from './pages/Jobs';
import PostJob from './pages/PostJob';
import JobDetail from './pages/JobDetail';
import Login from './pages/Login';
import Register from './pages/Register';

function Nav() {
  return (
    <nav className="bg-indigo-700 text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold">Freelance Pi Hub</Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:underline">Jobs</Link>
          <Link to="/post" className="hover:underline">Post a Job</Link>
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/register" className="bg-white text-indigo-700 px-3 py-1 rounded">Sign up</Link>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/post" element={<PostJob />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}