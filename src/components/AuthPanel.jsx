import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function AuthPanel({ onAuth }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('cm_token');
    if (token) fetchMe(token);
  }, []);

  function saveToken(token) {
    localStorage.setItem('cm_token', token);
    onAuth?.(token);
    fetchMe(token);
  }

  async function fetchMe(token) {
    try {
      const res = await fetch(`${API}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('Failed to load profile');
      const data = await res.json();
      setMe(data);
    } catch (e) {
      console.error(e);
      setMe(null);
    }
  }

  async function submit(e) {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
      const payload = mode === 'login' ? { email, password } : { name, email, password };
      const res = await fetch(`${API}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Request failed');
      saveToken(data.access_token);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem('cm_token');
    setMe(null);
    onAuth?.(null);
  }

  if (me) {
    return (
      <section className="w-full mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8" id="auth">
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">Signed in</p>
            <p className="text-lg font-medium">{me.name} <span className="text-zinc-500">• {me.email}</span></p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">Rep: {me.reputation ?? 0}</span>
            <button onClick={logout} className="px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm">Logout</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8" id="auth">
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => setMode('login')} className={`px-3 py-1.5 rounded-md text-sm ${mode==='login'?'bg-zinc-900 text-white dark:bg-white dark:text-black':'border border-zinc-300 dark:border-zinc-700'}`}>Login</button>
          <button onClick={() => setMode('register')} className={`px-3 py-1.5 rounded-md text-sm ${mode==='register'?'bg-zinc-900 text-white dark:bg-white dark:text-black':'border border-zinc-300 dark:border-zinc-700'}`}>Create account</button>
        </div>
        <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mode==='register' && (
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="col-span-1 sm:col-span-2 px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent" required />
          )}
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="col-span-1 px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent" required />
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="col-span-1 px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent" required />
          <div className="col-span-1 sm:col-span-2 flex items-center gap-3">
            <button disabled={loading} className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-60">{loading? 'Please wait…' : (mode==='login'?'Login':'Sign up')}</button>
            {error && <span className="text-sm text-red-600">{error}</span>}
          </div>
        </form>
      </div>
    </section>
  );
}
