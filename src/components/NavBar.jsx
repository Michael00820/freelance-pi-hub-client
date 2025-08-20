import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setAuthed(!!localStorage.getItem("authUser"));
  }, []);

  const logout = () => {
    localStorage.removeItem("authUser");
    setAuthed(false);
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded ${isActive ? "text-white bg-indigo-600" : "text-indigo-100 hover:bg-indigo-500/40"}`;

  return (
    <header className="bg-indigo-700 text-white">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg tracking-tight">
          Freelance Pi Hub
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink to="/jobs" className={linkClass}>
            Jobs
          </NavLink>

          {authed ? (
            <>
              <NavLink to="/post-job" className={linkClass}>
                Post a Job
              </NavLink>
              <button
                onClick={logout}
                className="ml-1 px-3 py-2 rounded bg-white text-indigo-700 hover:bg-indigo-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-3 py-2 rounded bg-white text-indigo-700 hover:bg-indigo-50"
              >
                Sign up
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}