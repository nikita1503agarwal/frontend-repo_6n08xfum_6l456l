import { useEffect, useMemo, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function MarketClubsQA() {
  return (
    <section className="w-full mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8" id="market">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Marketplace />
        <Clubs />
        <QA />
      </div>
    </section>
  );
}

function useToken() {
  const [token, setToken] = useState(() => localStorage.getItem('cm_token'));
  useEffect(() => {
    const i = setInterval(() => setToken(localStorage.getItem('cm_token')), 1000);
    return () => clearInterval(i);
  }, []);
  return token;
}

function Marketplace() {
  const token = useToken();
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('books');

  useEffect(() => { load(); }, []);

  async function load() {
    const res = await fetch(`${API}/market/items`);
    const data = await res.json();
    setItems(data);
  }

  async function create(e) {
    e.preventDefault();
    if (!token) return alert('Sign in first');
    const res = await fetch(`${API}/market/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, description: '', price: Number(price), category, owner_id: 'self', photos: [] }),
    });
    if (res.ok) { setTitle(''); setPrice(''); load(); }
  }

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5">
      <h3 className="font-semibold mb-3">Marketplace</h3>
      <form onSubmit={create} className="flex flex-col gap-2 mb-3">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Item title" className="px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent" required />
        <div className="flex gap-2">
          <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price" className="flex-1 px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent" required />
          <select value={category} onChange={e=>setCategory(e.target.value)} className="px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent">
            <option value="books">Books</option>
            <option value="notes">Notes</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>
        <button className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500">Post</button>
      </form>
      <ul className="space-y-3">
        {items.map(it => (
          <li key={it.id} className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
            <p className="font-medium">{it.title} <span className="text-zinc-500">₹{it.price}</span></p>
            <p className="text-xs text-zinc-500">{it.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Clubs() {
  const token = useToken();
  const [clubs, setClubs] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => { load(); }, []);
  async function load() {
    const res = await fetch(`${API}/clubs`);
    const data = await res.json();
    setClubs(data);
  }

  async function create(e) {
    e.preventDefault();
    if (!token) return alert('Sign in first');
    const res = await fetch(`${API}/clubs`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name, description: '', created_by: 'self', member_ids: [] })
    });
    if (res.ok) { setName(''); load(); }
  }

  return (
    <div id="clubs" className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5">
      <h3 className="font-semibold mb-3">Clubs</h3>
      <form onSubmit={create} className="flex gap-2 mb-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="New club name" className="flex-1 px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent" required />
        <button className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500">Create</button>
      </form>
      <ul className="space-y-3">
        {clubs.map(c => (
          <li key={c.id} className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
            <p className="font-medium">{c.name}</p>
            <p className="text-xs text-zinc-500">Members: {c.member_ids?.length || 0}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function QA() {
  const token = useToken();
  const [qs, setQs] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => { load(); }, []);

  async function load() {
    const res = await fetch(`${API}/qa/questions`);
    const data = await res.json();
    setQs(data);
  }

  async function create(e) {
    e.preventDefault();
    if (!token) return alert('Sign in first');
    const res = await fetch(`${API}/qa/questions`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ title, body: '', tags: [], author_id: 'self', upvotes: 0 }) });
    if (res.ok) { setTitle(''); load(); }
  }

  return (
    <div id="chat" className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5">
      <h3 className="font-semibold mb-3">Q&A</h3>
      <form onSubmit={create} className="flex gap-2 mb-3">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Ask a question" className="flex-1 px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent" required />
        <button className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500">Ask</button>
      </form>
      <ul className="space-y-3">
        {qs.map(q => (
          <li key={q.id} className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
            <p className="font-medium">{q.title}</p>
            <p className="text-xs text-zinc-500">Upvotes: {q.upvotes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
