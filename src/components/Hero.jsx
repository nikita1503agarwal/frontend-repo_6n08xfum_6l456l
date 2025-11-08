import React from 'react';
import { Rocket, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-white pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center relative">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Your all-in-one campus companion
          </h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Organize classes, discover clubs, trade in the student marketplace, and stay updated with real-time campus buzz — all in one sleek interface.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-500 transition-colors">
              <Rocket className="h-4 w-4" />
              Get Started
            </button>
            <button className="inline-flex items-center gap-2 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-50">
              <Star className="h-4 w-4" />
              See Features
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-video rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg" />
          <div className="absolute -bottom-4 -right-4 bg-white shadow rounded-xl px-4 py-3 text-sm text-slate-700">
            Real-time updates enabled
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
