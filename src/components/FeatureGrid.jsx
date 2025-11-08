import { MapPin, ShoppingBag, Users, Bell, MessageSquare, Shield } from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Interactive Campus Map',
    desc: 'Real-time location, 15+ spots, navigation links, and photo uploads for P.D.A. campus.',
    href: '#map',
  },
  {
    icon: ShoppingBag,
    title: 'Student Marketplace',
    desc: 'Buy/sell/exchange textbooks, notes, and question papers with peers.',
    href: '#market',
  },
  {
    icon: Users,
    title: 'Clubs & Collaboration',
    desc: 'Find study partners, join clubs, and collaborate on projects and hackathons.',
    href: '#clubs',
  },
  {
    icon: Bell,
    title: 'Notifications & Events',
    desc: 'Stay updated on events, elections, and news with quick contact to reps.',
    href: '#notifications',
  },
  {
    icon: Shield,
    title: 'Anonymous Feedback',
    desc: 'Share candid feedback securely with faculty/HOD — privacy protected.',
    href: '#feedback',
  },
  {
    icon: MessageSquare,
    title: 'Q&A Forum',
    desc: 'Ask questions, earn reputation, and climb the leaderboard.',
    href: '#chat',
  },
];

export default function FeatureGrid() {
  return (
    <section className="relative" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-zinc-50">Everything you need for a great start</h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300 max-w-2xl">A unified hub designed to help new students navigate campus life with ease and connect meaningfully.</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc, href }) => (
            <a
              key={title}
              href={href}
              className="group rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-6 bg-white/70 dark:bg-zinc-900/70 hover:border-indigo-300/70 dark:hover:border-indigo-500/40 shadow-sm hover:shadow-md transition"
            >
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 text-white grid place-items-center shadow">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">{title}</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{desc}</p>
              <span className="mt-4 inline-block text-sm text-indigo-600 dark:text-indigo-400 group-hover:underline">Explore</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
