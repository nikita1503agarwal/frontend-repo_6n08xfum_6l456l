import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-between">
        <p>© {new Date().getFullYear()} CollegeMate. Built for students at P.D.A. College of Engineering, Gulbarga.</p>
        <div className="flex items-center gap-4">
          <a href="#privacy" className="hover:text-slate-700 dark:hover:text-slate-300">Privacy</a>
          <a href="#terms" className="hover:text-slate-700 dark:hover:text-slate-300">Terms</a>
          <a href="#contact" className="hover:text-slate-700 dark:hover:text-slate-300">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
