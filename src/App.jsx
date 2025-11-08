import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import Sections from './components/Sections';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
      <Navbar />
      <main>
        <Hero />
        <FeatureGrid />
        <Sections />
      </main>
      <Footer />
    </div>
  );
}

export default App;
