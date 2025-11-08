import { useEffect, useState } from 'react';
import { Sun, Moon, Rocket } from 'lucide-react';

function ThemeToggle() {
  const [theme, setTheme] = useState(
    typeof window !== 'undefined' && localStorage.getItem('theme')
      ? localStorage.getItem('theme')
      : 'light'
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme || 'light');
  }, [theme]);

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="inline-flex items-center gap-2 rounded-full border border-zinc-300/60 dark:border-zinc-700/60 px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/40 border-b border-zinc-200/60 dark:border-zinc-800/60">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 grid place-items-center text-white shadow">
            <Rocket size={18} />
          </div>
          <span className="text-base sm:text-lg">CollegeMate</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-zinc-700 dark:text-zinc-300">
          <a href="#map" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Campus Map</a>
          <a href="#market" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Marketplace</a>
          <a href="#clubs" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Student Clubs</a>
          <a href="#notifications" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Notifications</a>
          <a href="#feedback" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Feedback</a>
          <a href="#chat" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Chat Room</a>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#auth"
            className="hidden sm:inline-flex items-center rounded-full bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 text-sm font-medium shadow"
          >
            Sign Up
          </a>
        </div>
      </nav>
    </header>
  );
}
