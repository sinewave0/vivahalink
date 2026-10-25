/**
 * Fallback shown while the slug-dependent part of an invitation route
 * streams in (params read inside <Suspense> — see the Next.js
 * instant-navigation guide). Pure Server Component: the pulsing ring
 * is a stock CSS animation, so no client JS is sent for this frame.
 */
export default function InvitationLoading() {
  return (
    <div
      role="status"
      className="flex min-h-dvh flex-col items-center justify-center gap-7 bg-maroon-950"
    >
      <div className="relative h-20 w-20">
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-ping rounded-full border-2 border-gold-500/40 [animation-duration:2.4s]"
        />
        <span className="absolute inset-0 flex items-center justify-center rounded-full border border-gold-600/50 bg-maroon-900 font-serif text-3xl text-gold-400">
          &amp;
        </span>
      </div>
      <p className="tracking-[0.25em] text-[11px] uppercase text-ivory-300/60 sm:text-xs">
        Opening your invitation…
      </p>
    </div>
  );
}
