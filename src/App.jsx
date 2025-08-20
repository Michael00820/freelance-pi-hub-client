import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import NavBar from "./components/NavBar";

import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostJob from "./pages/PostJob";

// Simple auth check (we'll swap to real auth later)
const isAuthed = () => !!localStorage.getItem("authUser");

function Protected() {
  return isAuthed() ? <Outlet /> : <Navigate to="/login" replace />;
}

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <NavBar />
      <main className="max-w-5xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout with NavBar */}
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/jobs" replace />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected route for posting a job */}
          <Route element={<Protected />}>
            <Route path="/post-job" element={<PostJob />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<div className="p-6 text-sm">Page not found.</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}