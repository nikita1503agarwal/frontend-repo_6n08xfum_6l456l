import React, { useEffect, useMemo, useState } from 'react';

// Utility: Google Maps link builder
const mapsLink = (lat, lng) => `https://www.google.com/maps?q=${lat},${lng}`;

// P.D.A. College of Engineering approximate center and radius (~700m)
const CAMPUS_CENTER = { lat: 17.3296, lng: 76.8343 };
const CAMPUS_RADIUS_M = 700;

function haversine(a, b) {
  const R = 6371000;
  const toRad = (x) => (x * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

const LOCATIONS = [
  { id: 'adm', name: 'Admission Block', lat: 17.3299, lng: 76.8339 },
  { id: 'lib', name: 'Central Library', lat: 17.3291, lng: 76.8337 },
  { id: 'me', name: 'Mechanical Dept', lat: 17.3301, lng: 76.8348 },
  { id: 'cs', name: 'Computer Science Dept', lat: 17.3298, lng: 76.8352 },
  { id: 'ec', name: 'Electronics Dept', lat: 17.3294, lng: 76.8358 },
  { id: 'civ', name: 'Civil Dept', lat: 17.3304, lng: 76.8334 },
  { id: 'it', name: 'IT Labs', lat: 17.3296, lng: 76.8356 },
  { id: 'audi', name: 'Auditorium', lat: 17.3289, lng: 76.8344 },
  { id: 'sport', name: 'Sports Complex', lat: 17.3312, lng: 76.8346 },
  { id: 'hostel', name: 'Boys Hostel', lat: 17.3321, lng: 76.8350 },
  { id: 'gh', name: 'Girls Hostel', lat: 17.3316, lng: 76.8330 },
  { id: 'canteen', name: 'Canteen', lat: 17.3290, lng: 76.8361 },
  { id: 'chem', name: 'Chemistry Lab', lat: 17.3287, lng: 76.8352 },
  { id: 'phy', name: 'Physics Lab', lat: 17.3286, lng: 76.8349 },
  { id: 'math', name: 'Mathematics Dept', lat: 17.3292, lng: 76.8363 },
];

// Campus Map Page
const MapPage = () => {
  const [selected, setSelected] = useState(LOCATIONS[0].id);
  const [photos, setPhotos] = useState({}); // {locationId: [ObjectURL]}
  const [pos, setPos] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    const watchId = navigator.geolocation.watchPosition(
      (p) => {
        setPos({ lat: p.coords.latitude, lng: p.coords.longitude, acc: p.coords.accuracy });
        setError('');
      },
      (e) => setError(e.message || 'Unable to fetch location'),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const currentLoc = useMemo(() => LOCATIONS.find((l) => l.id === selected), [selected]);
  const insideCampus = useMemo(() => {
    if (!pos) return null;
    const d = haversine(pos, CAMPUS_CENTER);
    return d <= CAMPUS_RADIUS_M;
  }, [pos]);

  const onUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setPhotos((prev) => ({
      ...prev,
      [selected]: [...(prev[selected] || []), ...files.map((f) => URL.createObjectURL(f))],
    }));
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
        <div className="flex-1">
          <label className="text-sm text-slate-600 dark:text-slate-300">Select location</label>
          <select
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:bg-slate-900 dark:border-slate-800"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {LOCATIONS.map((l) => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
        </div>
        <a
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm shadow hover:bg-indigo-500"
          href={mapsLink(currentLoc.lat, currentLoc.lng)}
          target="_blank"
          rel="noreferrer"
        >
          Navigate
        </a>
        <label className="inline-flex items-center gap-2 text-sm">
          <span className="sr-only">Upload photos</span>
          <input type="file" accept="image/*" multiple onChange={onUpload} className="block w-44 text-sm" />
        </label>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-slate-700 dark:text-slate-300">
            Campus center: {CAMPUS_CENTER.lat.toFixed(4)}, {CAMPUS_CENTER.lng.toFixed(4)} • Radius ~ {Math.round(CAMPUS_RADIUS_M)} m
          </div>
          <div className="text-sm">
            {pos ? (
              <span className={insideCampus ? 'text-emerald-600' : 'text-amber-600'}>
                You are {insideCampus ? 'inside' : 'outside'} campus • {pos.lat.toFixed(4)}, {pos.lng.toFixed(4)}
              </span>
            ) : (
              <span className="text-slate-500">Locating… {error && `(${error})`}</span>
            )}
          </div>
        </div>
        <div className="mt-4 aspect-video w-full rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 text-sm">
          Interactive Map Placeholder — use the Navigate button to open Google Maps for the selected place.
        </div>
        {!!(photos[selected]?.length) && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {photos[selected].map((src, i) => (
              <img key={i} src={src} alt="upload" className="h-28 w-full object-cover rounded-lg border" />)
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Marketplace Page (local-only demo)
const MarketplacePage = () => {
  const [items, setItems] = useState([
    { id: 1, title: 'Engineering Mathematics (Kreyszig)', price: 350 },
    { id: 2, title: 'Digital Logic Notes - ECE', price: 150 },
  ]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const addItem = () => {
    if (!title || !price) return;
    setItems((prev) => [{ id: Date.now(), title, price: Number(price) }, ...prev]);
    setTitle('');
    setPrice('');
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border p-4 dark:border-slate-800">
        <div className="grid sm:grid-cols-3 gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Item title"
            className="rounded-lg border px-3 py-2 text-sm dark:bg-slate-900 dark:border-slate-800"
          />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price (₹)"
            type="number"
            className="rounded-lg border px-3 py-2 text-sm dark:bg-slate-900 dark:border-slate-800"
          />
          <button onClick={addItem} className="rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm hover:bg-indigo-500">Post Listing</button>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it) => (
          <div key={it.id} className="rounded-xl border p-4 bg-white dark:bg-slate-900 dark:border-slate-800">
            <div className="font-medium text-slate-900 dark:text-white">{it.title}</div>
            <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">₹ {it.price}</div>
            <button className="mt-3 w-full rounded-lg border px-3 py-2 text-sm hover:bg-indigo-50 dark:hover:bg-indigo-950/30">Contact Seller</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Feedback Page (anonymous)
const FeedbackPage = () => {
  const [msg, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    if (!msg.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setMsg('');
      setSubmitted(false);
      alert('Feedback submitted anonymously. Thank you!');
    }, 300);
  };

  return (
    <div className="space-y-4">
      <textarea
        rows={5}
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Write your suggestion or concern (anonymous)"
        className="w-full rounded-lg border p-3 text-sm dark:bg-slate-900 dark:border-slate-800"
      />
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">Your identity is not collected.</span>
        <button onClick={submit} disabled={submitted} className="rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm hover:bg-indigo-500 disabled:opacity-60">
          {submitted ? 'Submitting…' : 'Submit Feedback'}
        </button>
      </div>
    </div>
  );
};

// Chat/Q&A Page (local-only demo)
const ChatPage = () => {
  const [questions, setQuestions] = useState([
    { id: 1, q: 'Any tips for first-year math?', votes: 3, answers: ['Practice past papers', 'Focus on fundamentals'] },
  ]);
  const [qInput, setQInput] = useState('');
  const [aInput, setAInput] = useState('');
  const [active, setActive] = useState(1);

  const ask = () => {
    if (!qInput.trim()) return;
    const id = Date.now();
    setQuestions([{ id, q: qInput.trim(), votes: 0, answers: [] }, ...questions]);
    setQInput('');
    setActive(id);
  };

  const answer = () => {
    if (!aInput.trim()) return;
    setQuestions((prev) => prev.map((x) => (x.id === active ? { ...x, answers: [aInput.trim(), ...x.answers] } : x)));
    setAInput('');
  };

  const vote = (id, delta) => {
    setQuestions((prev) => prev.map((x) => (x.id === id ? { ...x, votes: Math.max(0, x.votes + delta) } : x)));
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="rounded-xl border p-4 dark:border-slate-800">
          <div className="flex gap-2">
            <input value={qInput} onChange={(e) => setQInput(e.target.value)} placeholder="Ask a question" className="flex-1 rounded-lg border px-3 py-2 text-sm dark:bg-slate-900 dark:border-slate-800" />
            <button onClick={ask} className="rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm hover:bg-indigo-500">Ask</button>
          </div>
        </div>
        <div className="space-y-3">
          {questions.map((q) => (
            <div key={q.id} className={`rounded-xl border p-4 cursor-pointer dark:border-slate-800 ${active === q.id ? 'bg-indigo-50 dark:bg-indigo-950/20' : 'bg-white dark:bg-slate-900'}`} onClick={() => setActive(q.id)}>
              <div className="flex items-center justify-between">
                <div className="font-medium text-slate-900 dark:text-white">{q.q}</div>
                <div className="flex items-center gap-2 text-sm">
                  <button onClick={(e) => { e.stopPropagation(); vote(q.id, 1); }} className="rounded-lg border px-2 py-1 hover:bg-indigo-50 dark:hover:bg-indigo-950/30">+1</button>
                  <span className="text-slate-600 dark:text-slate-300">{q.votes}</span>
                  <button onClick={(e) => { e.stopPropagation(); vote(q.id, -1); }} className="rounded-lg border px-2 py-1 hover:bg-indigo-50 dark:hover:bg-indigo-950/30">-1</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <div className="rounded-xl border p-4 dark:border-slate-800">
          <div className="font-medium text-slate-900 dark:text-white">Answers</div>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 dark:text-slate-300 space-y-1">
            {(questions.find((x) => x.id === active)?.answers || []).map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border p-4 dark:border-slate-800">
          <div className="flex gap-2">
            <input value={aInput} onChange={(e) => setAInput(e.target.value)} placeholder="Write an answer" className="flex-1 rounded-lg border px-3 py-2 text-sm dark:bg-slate-900 dark:border-slate-800" />
            <button onClick={answer} className="rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm hover:bg-indigo-500">Answer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Clubs & Notifications (compact demo)
const ClubsPage = () => (
  <div className="grid md:grid-cols-2 gap-6">
    <div className="rounded-xl border p-4 dark:border-slate-800">
      <div className="font-semibold text-slate-900 dark:text-white">Clubs & Societies</div>
      <ul className="mt-2 text-sm space-y-2">
        {['Coding Club', 'Robotics Society', 'Art Circle', 'Literary Club', 'IEEE Student Branch'].map((c) => (
          <li key={c} className="flex items-center justify-between rounded-lg border p-3 dark:border-slate-800">
            <span>{c}</span>
            <button className="rounded-md border px-3 py-1 text-xs hover:bg-indigo-50 dark:hover:bg-indigo-950/30">Join</button>
          </li>
        ))}
      </ul>
    </div>
    <div id="notifications" className="rounded-xl border p-4 dark:border-slate-800">
      <div className="font-semibold text-slate-900 dark:text-white">Upcoming Events</div>
      <ul className="mt-2 text-sm space-y-2">
        {[
          'Orientation Week • Monday 10:00 AM • Auditorium',
          'Hackathon • Friday 9:00 AM • CS Block',
          'Elections Info Session • Wednesday 4:00 PM • Main Hall',
        ].map((n, i) => (
          <li key={i} className="rounded-lg border p-3 dark:border-slate-800">{n}</li>
        ))}
      </ul>
    </div>
  </div>
);

export const Pages = ({ page }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {page === 'map' && <MapPage />}
      {page === 'marketplace' && <MarketplacePage />}
      {page === 'feedback' && <FeedbackPage />}
      {page === 'chat' && <ChatPage />}
      {page === 'clubs' && <ClubsPage />}
      {page === 'notifications' && <ClubsPage />}
      {page === 'home' && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border p-5 dark:border-slate-800">
            <div className="font-semibold">Campus Map</div>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Find buildings and navigate with live location.</p>
          </div>
          <div className="rounded-xl border p-5 dark:border-slate-800">
            <div className="font-semibold">Marketplace</div>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Buy & sell textbooks and notes.</p>
          </div>
          <div className="rounded-xl border p-5 dark:border-slate-800">
            <div className="font-semibold">Q&A Forum</div>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Ask doubts, earn reputation, help peers.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pages;
