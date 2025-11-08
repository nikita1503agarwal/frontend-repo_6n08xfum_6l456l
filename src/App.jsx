import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Pages from './components/Pages';

function App() {
  const [page, setPage] = useState('home');

  // Handle hash-based navigation for direct linking
  React.useEffect(() => {
    const applyFromHash = () => {
      const h = window.location.hash.replace('#', '');
      if (h) setPage(h);
    };
    applyFromHash();
    window.addEventListener('hashchange', applyFromHash);
    return () => window.removeEventListener('hashchange', applyFromHash);
  }, []);

  const handleNavigate = (next) => {
    setPage(next);
    window.location.hash = next;
  };

  const showHero = useMemo(() => page === 'home', [page]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Navbar currentPage={page} onNavigate={handleNavigate} />
      <main className="flex-1">
        {showHero && <Hero onGetStarted={handleNavigate} />}
        {!showHero && <div className="pt-10" />}
        <Pages page={page} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
