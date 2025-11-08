import React, { useEffect, useState } from 'react';
import { GraduationCap, Sun, Moon, Menu } from 'lucide-react';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'map', label: 'Campus Map' },
  { id: 'marketplace', label: 'Marketplace' },
  { id: 'clubs', label: 'Student Clubs' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'chat', label: 'Chat Room' },
];

const Navbar = ({ currentPage = 'home', onNavigate = () => {} }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur dark:bg-slate-900/70 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <button onClick={() => onNavigate('home')} className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-indigo-600" />
          <span className="font-semibold tracking-tight text-slate-900 dark:text-white">CollegeMate</span>
        </button>

        <nav className="hidden md:flex items-center gap-5 text-sm text-slate-600 dark:text-slate-300">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => onNavigate(l.id)}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors ${
                currentPage === l.id ? 'text-slate-900 dark:text-white font-medium' : ''
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button onClick={() => onNavigate('signup')} className="hidden sm:inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-500 transition-colors">
            Sign Up
          </button>
          <button className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
            <Menu className="h-5 w-5 text-slate-700 dark:text-slate-200" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
