import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden" id="hero">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/hGDm7Foxug7C6E8s/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Navigate campus life with confidence
          </h1>
          <p className="mt-4 text-zinc-700 dark:text-zinc-300 text-base sm:text-lg">
            CollegeMate is your companion for maps, marketplace, clubs, notifications, feedback, and a vibrant Q&A forum — crafted for students of P.D.A. College of Engineering, Gulbarga.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#map" className="inline-flex items-center rounded-full bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 text-sm font-medium shadow">
              Explore Campus Map
            </a>
            <a href="#market" className="inline-flex items-center rounded-full border border-zinc-300/70 dark:border-zinc-700/70 px-5 py-2.5 text-sm font-medium text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60">
              Browse Marketplace
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white dark:from-black/60 dark:via-black/20 dark:to-black" />
    </section>
  );
}
