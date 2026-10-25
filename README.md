# VivahaLink

**Beautiful digital invitation websites for Tamil weddings & celebrations.**

VivahaLink sells ready-made invitation microsites. Customers pick a template, customise it over
WhatsApp, pay via UPI, and receive a shareable link their guests actually enjoy opening.

> The invitation is the first experience of the wedding — not just a card.

## Tech stack

- **Next.js 16** (App Router, Cache Components) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (custom design system in `globals.css`)
- **Framer Motion** for refined animations
- **lucide-react** icons
- Fully static-friendly: no backend in v1 — ordering & RSVPs are WhatsApp deep links

## Routes

| Route              | What it is                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `/`                | Marketing home — hero, featured templates, how-it-works, testimonials, FAQ                    |
| `/templates`       | Filterable gallery (All / Wedding / Anniversary / Housewarming) with order & demo actions     |
| `/about`           | About & contact (WhatsApp concierge)                                                         |
| `/events/[slug]`   | **Invitation microsites** – full reveal-gate experience for each template's demo wedding       |
| `/invite/[slug]`   | Short shareable invitation link (same experience as above)                                   |

Marketing pages live inside the `src/app/(site)/` route group and get the Navbar / Footer /
sticky WhatsApp bar. Invitation microsites (`/events/*`, `/invite/*`) render **full-bleed** —
guests arriving from shared links should experience the invitation, not the storefront.

## The invitation microsite experience

- **Intro gate** — full-screen reveal (couple monogram, kolam ring) that unlocks scrolling
- **Hero** with couple names, tagline, date & a **live countdown**
- **Story section** with photo gallery
- **Ceremony timeline** — every event with time, venue, **Google Maps directions** and
  **Add-to-Google-Calendar**
- **Multi-step RSVP modal** (attendance → name/guests/events → review) that opens a pre-filled
  WhatsApp message — no backend needed
- **Background music** — a tanpura-style drone synthesised with the Web Audio API (zero audio
  files needed, autoplay-policy friendly); set `musicUrl` on an invitation to use a real track
- **Share menu** — native share, copy link, forward on WhatsApp

## Project structure

```
src/
├── app/
│   ├── (site)/            # storefront pages (Navbar/Footer/WhatsApp bar chrome)
│   ├── events/[slug]/     # invitation microsites
│   ├── invite/[slug]/     # short shareable invitation links
│   ├── layout.tsx         # minimal root layout (fonts + styles only)
│   └── not-found.tsx      # branded 404
├── components/
│   ├── home/              # marketing sections
│   ├── invite/            # the microsite experience (gate, countdown, RSVP, music, share…)
│   ├── layout/            # Navbar, Footer, sticky WhatsApp bar
│   └── ui/                # shared primitives (SectionHeading, AnimatedCard)
├── data/
│   ├── templates.ts       # the 6 launch templates (categories, tiers, pricing, palettes)
│   └── demo-events.ts     # one fictional demo invitation per template
└── lib/
    ├── constants.ts       # brand, WhatsApp number & message builders, colour tokens
    ├── types.ts           # Template / InvitationData / EventCeremony …
    └── utils.ts           # INR price, dates, countdown, Google-Calendar link builder
```

## Customisation points

- **WhatsApp number** — `WHATSAPP_NUMBER` in `src/lib/constants.ts` (placeholder; replace with
  the real number, plus `WHATSAPP_DISPLAY` for the human-readable version)
- **Templates & pricing** — `src/data/templates.ts`
- **Demo invitations** — `src/data/demo-events.ts` (fictional couples/venues; safest copy source
  when adding new demo content)
- **Design tokens** — Tailwind theme in `src/app/globals.css` (maroon / gold / ivory / temple
  stone / green) and shared helpers (`kolam-pattern`, `gold-shimmer`, `container-width`,
  `section-padding`)

## Data model (v1, no backend)

Static, typed, and easy to extend — real customer invitations later follow the same shape:

```ts
InvitationData {
  slug, templateId, coupleName1, coupleName2, tagline, weddingDate,
  story, photos, ceremonies: EventCeremony[], musicUrl?, family1?, family2?
}
```

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static-friendly)
```

## Deployment configuration

Copy `.env.example` to `.env.local`, then set the public business contact and deployed site URL
before creating a production build:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
NEXT_PUBLIC_WHATSAPP_DISPLAY=+91 98765 43210
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

For a real customer invitation, add an optional `rsvpWhatsAppNumber` to its `InvitationData` entry.
That number receives RSVP messages for that invitation; otherwise RSVPs use the business number.
Do not put secrets in `NEXT_PUBLIC_*` variables.

## Roadmap (suggested)

- Customer dashboard for hosts to edit invitation details / photos
- `musicUrl` delivery: licensed tracks per template tier
- OG social preview images per invitation
- Real photography direction for template thumbnails (current ones are hand-drawn SVGs)
