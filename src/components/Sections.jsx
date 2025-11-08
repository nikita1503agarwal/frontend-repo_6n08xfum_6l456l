import { useState } from 'react';
import { MapPin, Upload, Navigation, ImagePlus, BookOpen, Users2, Bell, Send } from 'lucide-react';

export default function Sections() {
  const [selected, setSelected] = useState('map');

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-wrap gap-2" id="map">
        {[
          { id: 'map', label: 'Campus Map', icon: MapPin },
          { id: 'market', label: 'Marketplace', icon: BookOpen },
          { id: 'clubs', label: 'Clubs & Society', icon: Users2 },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'feedback', label: 'Feedback', icon: Send },
          { id: 'chat', label: 'Chat Room', icon: Users2 },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setSelected(id)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm border transition ${
              selected === id
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {selected === 'map' && <MapPreview />}
        {selected === 'market' && <MarketplacePreview />}
        {selected === 'clubs' && <ClubsPreview />}
        {selected === 'notifications' && <NotificationsPreview />}
        {selected === 'feedback' && <FeedbackPreview />}
        {selected === 'chat' && <ChatPreview />}
      </div>
    </section>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-900/70 p-5 shadow-sm">
      <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">{title}</h3>
      <div className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">{children}</div>
    </div>
  );
}

function MapPreview() {
  const campus = {
    lat: 17.3255,
    lng: 76.8360,
  };
  return (
    <>
      <Card title="Interactive Campus Map">
        <p>
          Centered on P.D.A. College of Engineering, Gulbarga. Tap a spot to navigate, upload photos, or
          detect whether you’re inside campus. Uses device location when allowed.
        </p>
        <div className="mt-4 aspect-video w-full overflow-hidden rounded-lg">
          <iframe
            title="P.D.A. College Map"
            src={`https://www.google.com/maps?q=${campus.lat},${campus.lng}&z=16&output=embed`}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="inline-flex items-center gap-2 rounded-full bg-indigo-600 text-white px-4 py-2 text-sm">
            <Navigation size={16} /> Navigate
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm">
            <ImagePlus size={16} /> Upload Photos
          </button>
        </div>
      </Card>
      <Card title="Quick Locations">
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
          {[
            'Main Gate', 'Library', 'Admission Block', 'CSE Dept', 'ECE Dept', 'Mechanical Dept', 'Civil Dept', 'Auditorium', 'Playground', 'Hostel', 'Cafeteria', 'Labs', 'Admin Office', 'Parking', 'Seminar Hall'
          ].map((item) => (
            <li key={item} className="rounded-md border border-zinc-200/70 dark:border-zinc-800/70 px-2 py-1">{item}</li>
          ))}
        </ul>
      </Card>
    </>
  );
}

function MarketplacePreview() {
  return (
    <>
      <Card title="Student Marketplace">
        <p>Browse textbooks, notes, and previous year papers. Contact sellers directly to exchange materials.</p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: 'Data Structures Textbook', price: '₹300' },
            { title: 'C++ Notes (Handwritten)', price: '₹150' },
            { title: 'PYQ: Engineering Maths I', price: '₹120' },
            { title: 'Digital Logic Design Book', price: '₹250' },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-zinc-200/70 dark:border-zinc-800/70 p-3">
              <div className="font-medium text-zinc-900 dark:text-zinc-100">{item.title}</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-300">{item.price}</div>
              <button className="mt-2 inline-flex rounded-full bg-indigo-600 text-white px-3 py-1.5 text-xs">Contact Seller</button>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Post a Listing">
        <form className="grid grid-cols-1 gap-3">
          <input className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2" placeholder="Item title" />
          <input className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2" placeholder="Price (₹)" />
          <button className="inline-flex justify-center rounded-full bg-indigo-600 text-white px-4 py-2 text-sm">Publish</button>
        </form>
      </Card>
    </>
  );
}

function ClubsPreview() {
  return (
    <>
      <Card title="Clubs & Collaboration">
        <p>Join coding clubs, robotics, cultural societies, or form study groups across departments.</p>
        <ul className="mt-3 space-y-2">
          {['Coding Club', 'Robotics Society', 'Literary Club', 'Photography Club', 'Music Club'].map((club) => (
            <li key={club} className="flex items-center justify-between rounded-md border border-zinc-200/70 dark:border-zinc-800/70 px-3 py-2">
              <span>{club}</span>
              <button className="rounded-full border border-indigo-300/60 text-indigo-700 dark:text-indigo-300 px-3 py-1 text-xs">Join</button>
            </li>
          ))}
        </ul>
      </Card>
      <Card title="Create Study Group">
        <form className="grid grid-cols-1 gap-3">
          <input className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2" placeholder="Group name" />
          <input className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2" placeholder="Topic / Subject" />
          <button className="inline-flex justify-center rounded-full bg-indigo-600 text-white px-4 py-2 text-sm">Create</button>
        </form>
      </Card>
    </>
  );
}

function NotificationsPreview() {
  return (
    <>
      <Card title="Notifications & Events">
        <ul className="space-y-3">
          {[
            { t: 'Freshers Orientation', d: 'Mon 10:00 AM · Auditorium' },
            { t: 'Hackathon Registration', d: 'Opens Fri · CSE Dept' },
            { t: 'Student Elections', d: 'Nomination window closes next week' },
          ].map((n) => (
            <li key={n.t} className="rounded-md border border-zinc-200/70 dark:border-zinc-800/70 px-3 py-2">
              <div className="font-medium">{n.t}</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-300">{n.d}</div>
            </li>
          ))}
        </ul>
      </Card>
      <Card title="Contact Student Reps">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { name: 'Ananya (CSE)', role: 'General Secretary' },
            { name: 'Rahul (ECE)', role: 'Cultural Secretary' },
            { name: 'Priya (ME)', role: 'Sports Secretary' },
            { name: 'Irfan (CIV)', role: 'Tech Secretary' },
          ].map((rep) => (
            <div key={rep.name} className="rounded-md border border-zinc-200/70 dark:border-zinc-800/70 p-3">
              <div className="font-medium">{rep.name}</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-300">{rep.role}</div>
              <button className="mt-2 inline-flex rounded-full bg-indigo-600 text-white px-3 py-1.5 text-xs">Message</button>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function FeedbackPreview() {
  return (
    <>
      <Card title="Anonymous Feedback">
        <p>Submit suggestions to faculty/HOD confidentially. Your identity will not be shared.</p>
        <form className="mt-3 grid grid-cols-1 gap-3">
          <textarea rows={4} className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2" placeholder="Write your feedback here..." />
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" className="h-4 w-4" /> I agree to anonymous submission
          </label>
          <button className="inline-flex justify-center rounded-full bg-indigo-600 text-white px-4 py-2 text-sm">Send Feedback</button>
        </form>
      </Card>
      <Card title="Privacy Note">
        <p>
          We only forward your message to the concerned department. No personal identifiers are stored with your
          message.
        </p>
      </Card>
    </>
  );
}

function ChatPreview() {
  return (
    <>
      <Card title="Q&A Forum">
        <div className="space-y-3">
          {[
            { q: 'How to prepare for first semester maths?', a: 'Start with PYQs and practice daily.' },
            { q: 'Best resources for C programming?', a: 'Let Us C, CodeChef practice, and lab sheets.' },
          ].map((item, idx) => (
            <div key={idx} className="rounded-md border border-zinc-200/70 dark:border-zinc-800/70 p-3">
              <div className="font-medium">Q: {item.q}</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">A: {item.a}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Ask a Question">
        <form className="grid grid-cols-1 gap-3">
          <input className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2" placeholder="Your question" />
          <button className="inline-flex justify-center rounded-full bg-indigo-600 text-white px-4 py-2 text-sm">Post</button>
        </form>
      </Card>
    </>
  );
}
