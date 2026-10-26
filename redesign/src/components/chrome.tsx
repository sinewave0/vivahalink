import { Link } from "@tanstack/react-router";
import { WA } from "@/data";

export function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-4">
      <nav className="pointer-events-auto flex items-center gap-5 rounded-full border border-gold-lite/70 bg-ivory/85 px-5 py-2 text-sm text-ink shadow-lg backdrop-blur">
        <Link to="/" className="font-display text-lg tracking-wide">
          VivahaLink
        </Link>
        <Link to="/templates" className="hidden sm:inline">
          Templates
        </Link>
        <Link to="/invite/$slug" params={{ slug: "karthik-meenakshi" }} className="hidden sm:inline">
          Sample
        </Link>
        <a href={WA} className="rounded-full bg-ink px-3 py-1.5 text-ivory">
          Order
        </a>
      </nav>
    </header>
  );
}

export function Foot() {
  return (
    <footer className="bg-night px-6 py-12 text-center text-ivory">
      <p className="label text-gold-lite">VivahaLink</p>
      <p className="mt-3 font-display text-3xl">The invitation is the first moment.</p>
      <p className="mt-6 text-sm text-gold-lite/80">Chennai · WhatsApp orders · UPI</p>
    </footer>
  );
}
