import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero = ({ onGetStarted }) => {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-[1]">
        <Spline scene="https://prod.spline.design/ESO6PnMadasO0hU3/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/80 dark:from-slate-950/70 dark:via-slate-950/40 dark:to-slate-950/80 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 py-24 grid lg:grid-cols-2 gap-10 items-center relative">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Navigate, connect, and thrive at P.D.A. College
          </h1>
          <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed">
            Interactive campus map, student marketplace, clubs, events, feedback, and a collaborative Q&A forum — everything for a smooth college journey.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <button onClick={() => onGetStarted?.('signup')} className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-500 transition-colors">
              Get Started
            </button>
            <button onClick={() => onGetStarted?.('map')} className="inline-flex items-center gap-2 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/40">
              Explore Campus Map
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/60 dark:bg-slate-900/50 p-6 shadow-xl backdrop-blur">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Quick Links</h3>
            <ul className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <li><a className="block rounded-lg border p-3 hover:bg-indigo-50 dark:hover:bg-indigo-950/40" href="#marketplace">Marketplace</a></li>
              <li><a className="block rounded-lg border p-3 hover:bg-indigo-50 dark:hover:bg-indigo-950/40" href="#clubs">Clubs</a></li>
              <li><a className="block rounded-lg border p-3 hover:bg-indigo-50 dark:hover:bg-indigo-950/40" href="#notifications">Events</a></li>
              <li><a className="block rounded-lg border p-3 hover:bg-indigo-50 dark:hover:bg-indigo-950/40" href="#chat">Chat Forum</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
