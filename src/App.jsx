import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Jobs from './pages/Jobs';
import Register from './pages/Register';
import Login from './pages/Login';
import NewJob from './pages/NewJob';

export default function App() {
  return (
    <>
      <nav className="w-full bg-indigo-700 text-white">
        <div className="max-w-5xl mx-auto p-4 flex items-center gap-4">
          <Link to="/" className="font-semibold">Freelance Pi Hub</Link>
          <Link to="/jobs">Jobs</Link>
          <div className="ml-auto flex gap-3">
            <Link to="/login" className="underline">Login</Link>
            <Link to="/register" className="bg-white text-indigo-700 px-3 py-1 rounded">Sign up</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Jobs />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/new" element={<NewJob />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}