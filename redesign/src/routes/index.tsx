import { createFileRoute, Link } from "@tanstack/react-router";
import { Foot, Nav } from "@/components/chrome";
import { templates, WA } from "@/data";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main>
      <Nav />
      <section className="journey flex min-h-svh items-end">
        <img className="sky" src="/images/dusk.jpg" alt="" />
        <div className="veil" />
        <span className="lantern" style={{ left: "12%", top: "18%", animationDelay: "0s" }} />
        <span className="lantern" style={{ left: "78%", top: "12%", animationDelay: ".4s", width: 22, height: 34 }} />
        <span className="lantern" style={{ left: "88%", top: "28%", animationDelay: "1s" }} />
        <div className="relative z-10 w-full px-6 pb-20 pt-32 text-center text-ink">
          <p className="label">Tamil weddings & celebrations</p>
          <h1 className="mt-4 text-6xl uppercase leading-none tracking-wide sm:text-8xl">
            Vivaha
            <span className="block text-gold">Link</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md font-display text-2xl italic text-ink-soft">
            A shareable invitation your guests actually want to open.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/invite/$slug"
              params={{ slug: "karthik-meenakshi" }}
              className="rounded-full bg-ink px-6 py-3 text-ivory"
            >
              Open a sample
            </Link>
            <a href={WA} className="rounded-full border border-ink px-6 py-3">
              Order on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="paper px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="label text-center">Six launch templates</p>
          <h2 className="mt-3 text-center text-5xl">Pick a mood. We weave the rest.</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((t) => (
              <article key={t.title} className="arch p-6">
                <p className="label">{t.tier}</p>
                <h3 className="mt-3 text-4xl">{t.title}</h3>
                <p className="mt-2 text-ink-soft">{t.mood}</p>
                <p className="mt-6 font-display text-2xl text-gold">{t.price}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 text-center">
            <Link to="/templates" className="underline decoration-gold underline-offset-4">
              See the full gallery
            </Link>
          </p>
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <img src="/images/jasmine.jpg" alt="Jasmine and gold jewelry" className="h-80 w-full object-cover md:h-full" />
        <div className="flex flex-col justify-center bg-ivory px-8 py-16">
          <p className="label">How it works</p>
          <ol className="mt-6 space-y-6 font-display text-3xl">
            <li>1. Choose a template</li>
            <li>2. Share names, venues, photos on WhatsApp</li>
            <li>3. Pay by UPI and send the link</li>
          </ol>
          <p className="mt-6 max-w-sm text-ink-soft">
            Guests get a dusk cover, a live countdown, maps, calendar, and an RSVP that lands in your chat. No app to install.
          </p>
        </div>
      </section>

      <section className="relative">
        <img src="/images/mandap.jpg" alt="A lamp-lit mandap" className="h-[70svh] w-full object-cover" />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-night/80 to-transparent p-8 text-ivory">
          <div>
            <p className="label text-gold-lite">From ₹899</p>
            <h2 className="mt-2 text-5xl sm:text-6xl">Ready when the muhurtham is.</h2>
          </div>
        </div>
      </section>
      <Foot />
    </main>
  );
}
