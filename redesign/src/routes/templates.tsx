import { createFileRoute, Link } from "@tanstack/react-router";
import { Foot, Nav } from "@/components/chrome";
import { templates, WA } from "@/data";

export const Route = createFileRoute("/templates")({ component: Templates });

function Templates() {
  return (
    <main className="paper min-h-svh">
      <Nav />
      <div className="mx-auto max-w-5xl px-5 pb-20 pt-28">
        <p className="label">Gallery</p>
        <h1 className="mt-2 text-6xl">Templates</h1>
        <p className="mt-3 max-w-lg text-ink-soft">
          Wedding, anniversary, and housewarming. Each one ships with a reveal, schedule, maps, and WhatsApp RSVP.
        </p>
        <ul className="mt-12 divide-y divide-gold-lite/60">
          {templates.map((t) => (
            <li key={t.title} className="flex flex-wrap items-end justify-between gap-4 py-8">
              <div>
                <p className="label">{t.tier}</p>
                <h2 className="text-4xl">{t.title}</h2>
                <p className="text-ink-soft">{t.mood}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-3xl">{t.price}</p>
                <a href={WA} className="text-sm underline decoration-gold">
                  Order
                </a>
              </div>
            </li>
          ))}
        </ul>
        <Link to="/invite/$slug" params={{ slug: "karthik-meenakshi" }} className="mt-4 inline-block rounded-full bg-ink px-5 py-3 text-ivory">
          Preview a finished invitation
        </Link>
      </div>
      <Foot />
    </main>
  );
}
