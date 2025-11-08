import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeatureGrid />
        <section id="community" className="py-16">
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl font-bold text-slate-900">Built for student life</h2>
              <p className="mt-2 text-slate-600 leading-relaxed">
                Join clubs, find events, and connect with peers. A simple, modern home for your campus community.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-lg border bg-white">Easy sign-in</div>
                <div className="p-4 rounded-lg border bg-white">Club directory</div>
                <div className="p-4 rounded-lg border bg-white">Marketplace</div>
                <div className="p-4 rounded-lg border bg-white">Real-time feed</div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-video rounded-2xl border bg-slate-50" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
