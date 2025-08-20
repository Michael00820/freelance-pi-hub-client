import { Link, NavLink } from 'react-router-dom';

export default function NavBar() {
  const active = ({ isActive }) =>
    isActive ? 'text-white font-semibold' : 'text-white/80 hover:text-white';

  return (
    <header className="bg-indigo-700">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-4">
        <Link to="/" className="text-white font-bold text-lg">Freelance Pi Hub</Link>
        <nav className="ml-auto flex items-center gap-4">
          <NavLink to="/jobs" className={active}>Jobs</NavLink>
          <NavLink to="/login" className={active}>Login</NavLink>
          <Link
            to="/post-job"
            className="ml-2 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-50"
          >
            Post a Job
          </Link>
        </nav>
      </div>
    </header>
  );
}