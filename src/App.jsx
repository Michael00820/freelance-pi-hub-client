import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AuthProvider, { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobDetails from "./pages/JobDetails";
import PostJob from "./pages/PostJob";

function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="bg-indigo-700 text-white">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold">Freelance Pi Hub</Link>
        <nav className="flex items-center gap-4">
          <Link to="/jobs" className="hover:underline">Jobs</Link>
          {user ? (
            <>
              <Link to="/post-job" className="hover:underline">Post a Job</Link>
              <button onClick={logout} className="px-3 py-1 bg-black/20 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 bg-black/20 rounded">Login</Link>
              <Link to="/register" className="px-3 py-1 bg-black/20 rounded">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

function Home() { return <Jobs />; }

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main className="max-w-5xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/post-job"
              element={
                <ProtectedRoute>
                  <PostJob />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<p className="p-6">Not found.</p>} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}