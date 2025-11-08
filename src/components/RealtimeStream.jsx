import { useEffect, useRef, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function RealtimeStream() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [type, setType] = useState('general');
  const tokenRef = useRef(null);

  useEffect(() => {
    tokenRef.current = localStorage.getItem('cm_token');
    const ev = new EventSource(`${API}/events`);
    ev.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        setEvents((prev) => [data, ...prev].slice(0, 20));
      } catch {}
    };
    return () => ev.close();
  }, []);

  async function sendNotification(e) {
    e.preventDefault();
    const token = tokenRef.current || localStorage.getItem('cm_token');
    if (!token) return alert('Sign in to send notifications');
    const res = await fetch(`${API}/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, body, type }),
    });
    if (!res.ok) {
      const data = await res.json().catch(()=>({detail:'error'}));
      alert(data.detail || 'Failed');
      return;
    }
    setTitle(''); setBody('');
  }

  return (
    <section className="w-full mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8" id="notifications">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5">
          <h3 className="font-semibold mb-3">Live campus updates</h3>
          <ul className="space-y-3">
            {events.map((ev, idx) => (
              <li key={idx} className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                <p className="font-medium">{ev.title}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{ev.body}</p>
                <span className="text-xs text-indigo-600">{ev.type}</span>
              </li>
            ))}
            {events.length === 0 && <li className="text-sm text-zinc-500">Waiting for updates…</li>}
          </ul>
        </div>
        <form onSubmit={sendNotification} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5">
          <h3 className="font-semibold mb-3">Post a notification</h3>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full mb-2 px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent" required />
          <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Message" rows={4} className="w-full mb-2 px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent" />
          <select value={type} onChange={e=>setType(e.target.value)} className="w-full mb-3 px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent">
            <option value="general">General</option>
            <option value="event">Event</option>
            <option value="alert">Alert</option>
          </select>
          <button className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500">Broadcast</button>
        </form>
      </div>
    </section>
  );
}
