import Link from "next/link";
import Ornament from "@/components/invite/Ornament";

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-ivory-50 px-6 text-center">
      <div className="absolute inset-0 kolam-pattern opacity-40" />
      <p className="font-serif text-7xl font-bold text-maroon-800/90">404</p>
      <Ornament className="my-6" />
      <h1 className="font-serif text-2xl md:text-3xl text-temple-900">
        This page seems to have wandered off with the procession
      </h1>
      <p className="mt-3 max-w-sm text-sm text-temple-600">
        The link may be mistyped or the invitation may no longer exist. Let&apos;s get you back
        on the mandapam path.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-maroon-800 px-6 py-3 text-sm font-medium text-ivory-100 hover:bg-maroon-700 transition-colors"
        >
          Back Home
        </Link>
        <Link
          href="/templates"
          className="rounded-full border border-gold-300/70 bg-white px-6 py-3 text-sm font-medium text-maroon-800 hover:bg-gold-50 transition-colors"
        >
          Browse Templates
        </Link>
      </div>
    </div>
  );
}
