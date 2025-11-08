import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import AuthPanel from './components/AuthPanel';
import GeoMap from './components/GeoMap';
import MarketClubsQA from './components/MarketClubsQA';
import RealtimeStream from './components/RealtimeStream';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
      <Navbar />
      <main>
        <Hero />
        <FeatureGrid />
        <AuthPanel />
        <GeoMap />
        <MarketClubsQA />
        <RealtimeStream />
      </main>
      <Footer />
    </div>
  );
}

export default App;
