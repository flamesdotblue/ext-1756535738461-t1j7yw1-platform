export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/60">
        <p>© {new Date().getFullYear()} RealtyCommissions – Built for modern agents.</p>
        <nav className="flex items-center gap-4">
          <a className="hover:text-white/90" href="#">Privacy</a>
          <a className="hover:text-white/90" href="#">Terms</a>
          <a className="hover:text-white/90" href="#">Support</a>
        </nav>
      </div>
    </footer>
  );
}
