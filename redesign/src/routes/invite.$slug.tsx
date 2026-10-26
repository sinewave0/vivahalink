import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { invites } from "@/data";

export const Route = createFileRoute("/invite/$slug")({
  loader: ({ params }) => {
    const invite = invites.find((i) => i.slug === params.slug);
    if (!invite) throw notFound();
    return { invite };
  },
  component: InvitePage,
  notFoundComponent: () => (
    <main className="grid min-h-svh place-items-center bg-paper p-8 text-center">
      <div>
        <h1 className="text-5xl">This invitation is sealed.</h1>
        <Link to="/" className="mt-6 inline-block underline">
          Back home
        </Link>
      </div>
    </main>
  ),
});

function InvitePage() {
  const { invite } = Route.useLoaderData();
  const [open, setOpen] = useState(false);
  const [rsvp, setRsvp] = useState(false);
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  const left = useCountdown(invite.iso);

  return (
    <main>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-night text-ivory"
        >
          <p className="label text-gold-lite">A VivahaLink invitation</p>
          <span className="mt-8 grid h-24 w-24 place-items-center rounded-full border border-gold-lite font-display text-2xl text-gold-lite">
            {invite.a[0]}&{invite.b[0]}
          </span>
          <p className="mt-6 font-display text-3xl italic">Tap the seal</p>
        </button>
      )}

      <section className="journey flex min-h-svh flex-col items-center justify-center text-center">
        <img className="sky" src="/images/dusk.jpg" alt="" />
        <div className="veil" />
        <span className="lantern" style={{ left: "8%", top: "16%" }} />
        <span className="lantern" style={{ right: "10%", top: "22%", left: "auto" }} />
        <span className="lantern" style={{ left: "18%", top: "38%", width: 20, height: 30 }} />
        <div className="relative z-10 px-6 text-ink">
          <p className="label">The wedding of</p>
          <h1 className="mt-3 text-6xl uppercase leading-none sm:text-8xl">
            {invite.a}
            <span className="my-2 block text-2xl tracking-[0.6em] text-gold normal-case">weds</span>
            {invite.b}
          </h1>
          <p className="mt-6 label">{invite.date}</p>
        </div>
      </section>

      <section className="paper px-5 py-20 text-center">
        <img src="/images/kolam.jpg" alt="" className="mx-auto h-28 w-28 rounded-full object-cover" />
        <p className="mt-6 font-display text-2xl italic text-ink-soft">{invite.line}</p>
        <p className="mt-8 font-display text-xl italic text-ink-soft">with the blessings of their families</p>
        <h2 className="mt-6 text-6xl uppercase sm:text-7xl">{invite.a}</h2>
        <p className="mx-auto mt-2 max-w-sm text-ink-soft">{invite.familyA}</p>
        <p className="my-4 font-display text-4xl italic text-gold">&</p>
        <h2 className="text-6xl uppercase sm:text-7xl">{invite.b}</h2>
        <p className="mx-auto mt-2 max-w-sm text-ink-soft">{invite.familyB}</p>
        <p className="mx-auto mt-10 max-w-xl text-lg">{invite.story}</p>
        <p className="mt-8 font-display text-4xl">
          {left.d}d {left.h}h {left.m}m
        </p>
        <p className="label">until the muhurtham</p>
      </section>

      <section className="bg-mist px-5 py-16">
        <h2 className="text-center text-5xl">The days</h2>
        <div className="thread mx-auto mt-10 max-w-xl space-y-8">
          {invite.ceremonies.map((c) => (
            <article key={c.name} className="relative rounded-3xl bg-ivory p-6 text-center shadow-sm">
              <h3 className="text-4xl">{c.name}</h3>
              <p className="mt-2 text-gold">{c.when}</p>
              <p className="mt-1">{c.place}</p>
              <p className="text-ink-soft">{c.note}</p>
              <a
                className="mt-3 inline-block text-sm underline decoration-gold"
                href={`https://maps.google.com/?q=${encodeURIComponent(c.place)}`}
                target="_blank"
                rel="noreferrer"
              >
                Directions
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="grid sm:grid-cols-2">
        <img src="/images/jasmine.jpg" alt="Jasmine and gold" className="h-72 w-full object-cover sm:h-96" />
        <img src="/images/mandap.jpg" alt="Mandap" className="h-72 w-full object-cover sm:h-96" />
      </section>

      <section className="bg-night px-5 py-20 text-center text-ivory">
        {sent ? (
          <h2 className="text-5xl">Thank you, {name.split(" ")[0] || "friend"}.</h2>
        ) : rsvp ? (
          <form
            className="mx-auto max-w-sm space-y-4 text-left"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <h2 className="text-center text-5xl">RSVP</h2>
            <label className="block text-sm">
              Your name
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl bg-ivory px-3 py-3 text-ink"
              />
            </label>
            <label className="block text-sm">
              Guests
              <input type="number" min={1} defaultValue={1} className="mt-1 w-full rounded-xl bg-ivory px-3 py-3 text-ink" />
            </label>
            <button type="submit" className="w-full rounded-full bg-gold px-4 py-3 text-night">
              Send
            </button>
          </form>
        ) : (
          <>
            <p className="label text-gold-lite">Will you be there</p>
            <h2 className="mt-3 text-5xl">Save us a seat.</h2>
            <button type="button" onClick={() => setRsvp(true)} className="mt-8 rounded-full bg-ivory px-6 py-3 text-ink">
              RSVP
            </button>
          </>
        )}
        <p className="mt-10">
          <Link to="/" className="text-sm text-gold-lite underline">
            Made with VivahaLink
          </Link>
        </p>
      </section>
    </main>
  );
}

function useCountdown(iso: string) {
  const target = useMemo(() => new Date(iso).getTime(), [iso]);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
  };
}
