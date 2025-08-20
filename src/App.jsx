import React from "react";
import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";

import Jobs from "./pages/Jobs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PostJob from "./pages/PostJob";
import JobDetail from "./pages/JobDetail";

import { getUser, clearAuth } from "./lib/auth";

function Header() {
  const user = getUser();

  return (
    <header className="w-full bg-indigo-700 text-white">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="font-semibold tracking-wide">
          Freelance Pi Hub
        </Link>

        <nav className="flex items-center gap-3">
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              `px-2 py-1 rounded ${isActive ? "bg-indigo-900" : "hover:bg-indigo-800"}`
            }
          >
            Jobs
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `px-2 py-1 rounded ${isActive ? "bg-indigo-900" : "hover:bg-indigo-800"}`
            }
          >
            Dashboard
          </NavLink>

          {user && (
            <NavLink
              to="/post-job"
              className={({ isActive }) =>
                `px-2 py-1 rounded ${isActive ? "bg-indigo-900" : "hover:bg-indigo-800"}`
              }
            >
              Post a Job
            </NavLink>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {!user ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-3 py-1 rounded border border-white/40 ${
                    isActive ? "bg-white text-indigo-700" : "hover:bg-white hover:text-indigo-700"
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `px-3 py-1 rounded bg-white text-indigo-700 ${
                    isActive ? "opacity-90" : "hover:opacity-90"
                  }`
                }
              >
                Sign up
              </NavLink>
            </>
          ) : (
            <>
              <span className="hidden sm:inline text-white/90 mr-1">
                {user?.user?.email || "Signed in"}
              </span>
              <button
                onClick={() => {
                  clearAuth();
                  window.location.href = "/";
                }}
                className="px-3 py-1 rounded border border-white/40 hover:bg-white hover:text-indigo-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="min-h-[calc(100vh-56px)] bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <Routes>
            {/* Home uses the Jobs list */}
            <Route path="/" element={<Jobs />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetail />} />

            {/* Auth */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Dashboard + Posting */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/post-job" element={<PostJob />} />

            {/* Fallback */}
            <Route path="*" element={<div>404 — Page not found</div>} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}