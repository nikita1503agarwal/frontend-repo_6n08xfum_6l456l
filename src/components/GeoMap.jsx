import { useEffect, useRef, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function GeoMap() {
  const [pos, setPos] = useState(null);
  const [status, setStatus] = useState('');
  const [photos, setPhotos] = useState([]);
  const fileRef = useRef();

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus('Geolocation not supported');
      return;
    }
    navigator.geolocation.getCurrentPosition(async (p) => {
      const { latitude: lat, longitude: lng } = p.coords;
      setPos({ lat, lng });
      setStatus('Checking campus boundary…');
      try {
        const res = await fetch(`${API}/geo/check`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ lat, lng }) });
        const data = await res.json();
        setStatus(`${data.message} (distance: ${data.distance_m.toFixed(0)} m)`);
      } catch (e) {
        setStatus('Failed to check');
      }
      loadPhotos(lat, lng);
    }, (err) => setStatus(err.message));
  }, []);

  async function loadPhotos(lat, lng) {
    const res = await fetch(`${API}/geo/photos?lat=${lat}&lng=${lng}&radius_m=800`);
    const data = await res.json();
    setPhotos(data);
  }

  async function uploadPhoto(e) {
    e.preventDefault();
    const token = localStorage.getItem('cm_token');
    if (!token) return alert('Sign in first');
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    const b64 = await toBase64(file);
    const title = prompt('Photo title?') || 'Campus Photo';
    const res = await fetch(`${API}/geo/photos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, lat: pos.lat, lng: pos.lng, image_b64: b64 })
    });
    if (res.ok) loadPhotos(pos.lat, pos.lng);
  }

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return (
    <section className="w-full mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8" id="map">
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Campus Map & Location</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{status}</p>
        </div>
        <div className="aspect-[16/9] w-full rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
          {pos ? (
            <iframe
              title="map"
              className="w-full h-full"
              loading="lazy"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${pos.lng-0.01}%2C${pos.lat-0.01}%2C${pos.lng+0.01}%2C${pos.lat+0.01}&layer=mapnik&marker=${pos.lat}%2C${pos.lng}`}
            />
          ) : (
            <div className="w-full h-full grid place-items-center text-sm text-zinc-500">Getting location…</div>
          )}
        </div>
        <div className="mt-4 flex items-center gap-3">
          <input ref={fileRef} type="file" accept="image/*" className="text-sm" />
          <button onClick={uploadPhoto} className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500">Upload photo here</button>
        </div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.map(p => (
            <figure key={p.id} className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
              <img src={p.image_b64} alt={p.title} className="w-full h-32 object-cover" />
              <figcaption className="p-2 text-xs text-zinc-700 dark:text-zinc-300">
                <span className="font-medium">{p.title}</span>
                <span className="block text-zinc-500">By {p.uploaded_by?.slice?.(0,6) || 'anon'}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
