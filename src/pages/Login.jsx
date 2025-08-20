import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  function submit(e) {
    e.preventDefault();
    alert('Login (mock) — coming soon');
  }

  return (
    <div className="max-w-sm mx-auto bg-white rounded shadow p-6">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border rounded px-3 py-2" placeholder="Email"
               value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border rounded px-3 py-2" type="password" placeholder="Password"
               value={pass} onChange={e=>setPass(e.target.value)} />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
}