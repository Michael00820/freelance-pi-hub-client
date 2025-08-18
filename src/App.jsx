import React from 'react'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Jobs from './pages/Jobs'
import NewJob from './pages/NewJob'
import JobDetail from './pages/JobDetail'
import Dashboard from './pages/Dashboard'
import Contract from './pages/Contract'
import { useAuthStore } from './store'

export default function App(){
  const { user, logout } = useAuthStore()
  const nav = useNavigate()

  return (
    <div className="min-h-screen">
      <nav className="bg-indigo-700 text-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <Link to="/" className="font-bold">Freelance Pi Hub</Link>
          <div className="flex items-center gap-4">
            <Link to="/jobs">Jobs</Link>
            {user?.role === 'client' && <Link to="/jobs/new">Post a Job</Link>}
            {user ? (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <button onClick={()=>{logout(); nav('/')}} className="bg-white text-indigo-700 px-3 py-1 rounded">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register" className="bg-white text-indigo-700 px-3 py-1 rounded">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/jobs" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/new" element={<NewJob />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contract/:id" element={<Contract />} />
        </Routes>
      </main>
    </div>
  )
}