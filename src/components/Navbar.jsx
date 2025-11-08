import React from 'react';
import { GraduationCap, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-indigo-600" />
          <span className="font-semibold text-slate-800 tracking-tight">CollegeMate</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
          <a href="#community" className="hover:text-slate-900 transition-colors">Community</a>
          <a href="#get-started" className="hover:text-slate-900 transition-colors">Get Started</a>
        </nav>
        <button className="md:hidden p-2 rounded-lg hover:bg-slate-100">
          <Menu className="h-5 w-5 text-slate-700" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
