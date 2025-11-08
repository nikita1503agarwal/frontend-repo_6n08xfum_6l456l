export default function Footer() {
  return (
    <footer className="border-t border-zinc-200/60 dark:border-zinc-800/60 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">© {new Date().getFullYear()} CollegeMate · P.D.A. College of Engineering, Gulbarga</p>
        <div className="flex items-center gap-4 text-sm">
          <a href="#privacy" className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400">Privacy</a>
          <a href="#terms" className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400">Terms</a>
          <a href="#contact" className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400">Contact</a>
        </div>
      </div>
    </footer>
  );
}
