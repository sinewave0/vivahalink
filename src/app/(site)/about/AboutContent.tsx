"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Heart, MapPin, MessageCircle, ScrollText, Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { waLink, waMessages, WHATSAPP_DISPLAY } from "@/lib/constants";

const values = [
  {
    icon: "ScrollText",
    title: "Rooted in tradition",
    text: "Kolams, jasmine, temple silhouettes, kanjivaram textures — our designs begin with Tamil culture, never a generic template.",
  },
  {
    icon: "Sparkles",
    title: "Crafted like couture",
    text: "Smooth animations, considered typography and a premium feel. Your invitation should feel like the first gift of the wedding.",
  },
  {
    icon: "MessageCircle",
    title: "Ordering without friction",
    text: "No accounts, no PDF uploads, no design tools. Choose a design, send your details on WhatsApp, and receive a link.",
  },
  {
    icon: "MapPin",
    title: "Made for the diaspora",
    text: "A link works everywhere — Chennai, Singapore, London, Toronto. Every guest gets directions, RSVP and calendars built in.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-maroon-900 to-maroon-800">
        <div className="absolute inset-0 kolam-pattern opacity-5" />
        <div className="container-width relative py-16 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-ivory-100">
              About VivahaLink
            </h1>
            <p className="mt-4 text-ivory-300/85 text-lg max-w-2xl mx-auto">
              Beautiful digital invitation websites for Tamil celebrations — because the
              invitation is the first experience of the wedding, not just a card.
            </p>
            <div className="mx-auto mt-5 h-0.5 w-16 rounded-full bg-gold-500" />
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-ivory-50">
        <div className="container-width max-w-3xl">
          <SectionHeading title="Our Story" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose-ish space-y-5 text-temple-700 leading-relaxed"
          >
            <p>
              VivahaLink began with a simple frustration. Weddings in Tamil Nadu deserve
              invitations that carry the warmth of the occasion — yet most digital options were
              lifeless PDFs or print-shop scans with a thousand-watt gold filter.
            </p>
            <p>
              We thought: <em className="font-serif">what if the invitation itself felt like an
              event?</em> A link your family opens eagerly. A soft reveal, the couple&apos;s story,
              a countdown your grandmother actually taps, an RSVP that lands directly in your
              WhatsApp.
            </p>
            <p>
              That&apos;s VivahaLink. Every microsite is designed by hand with Tamil cultural
              craft — kolam patterns, kanjivaram palettes, banana-leaf greens — and delivered as
              a single beautiful link within 24–48 hours of receiving your details.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-ivory-100/60">
        <div className="container-width">
          <SectionHeading
            title="What We Care About"
            subtitle="Four promises behind every invitation we craft."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className="rounded-2xl border border-gold-200/40 bg-white p-6 shadow-sm hover:shadow-lg hover:shadow-maroon-800/5 transition-shadow"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-maroon-800/5 text-maroon-700">
                  {v.icon === "ScrollText" && <ScrollText size={20} />}
                  {v.icon === "Sparkles" && <Sparkles size={20} />}
                  {v.icon === "MessageCircle" && <MessageCircle size={20} />}
                  {v.icon === "MapPin" && <MapPin size={20} />}
                </div>
                <h3 className="font-serif text-lg font-semibold text-maroon-800">{v.title}</h3>
                <p className="mt-2 text-sm text-temple-600 leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section-padding bg-ivory-50">
        <div className="container-width">
          <SectionHeading
            title="Talk to Us"
            subtitle="One WhatsApp message is all it takes."
          />
          <div className="mx-auto max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden rounded-3xl border border-gold-200/50 bg-white shadow-sm"
            >
              <div className="relative bg-maroon-800 px-6 py-6 text-center">
                <div className="absolute inset-0 kolam-pattern opacity-10" />
                <p className="relative font-serif text-xl text-ivory-100">VivahaLink Concierge</p>
                <p className="relative mt-1 text-xs text-ivory-300/80">
                  Order, customize, or just ask a question
                </p>
              </div>
              <div className="p-6 sm:p-8">
                <div className="space-y-3 text-sm text-temple-700">
                  <p className="flex items-center gap-2.5">
                    <Clock size={16} className="text-gold-700" />
                    <span>
                      <span className="font-medium">Hours:</span> Mon–Sun, 9 AM – 9 PM IST
                      (festival weeks included!)
                    </span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <MessageCircle size={16} className="text-gold-700" />
                    <span>
                      <span className="font-medium">WhatsApp:</span>
                      <a
                        href={waLink(waMessages.inquiry())}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 text-green-700 underline decoration-green-700/30 underline-offset-2 hover:decoration-green-700"
                      >
                        {WHATSAPP_DISPLAY}
                      </a>
                    </span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <MapPin size={16} className="text-gold-700" />
                    <span>
                      <span className="font-medium">Serving:</span> all of Tamil Nadu & the
                      global Tamil diaspora
                    </span>
                  </p>
                </div>

                <a
                  href={waLink(waMessages.inquiry())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-green-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-green-600/25 transition-colors hover:bg-green-500"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>

                <p className="mt-4 text-center text-xs text-temple-500">
                  Prefer browsing first?{" "}
                  <Link href="/templates" className="text-maroon-700 underline underline-offset-2">
                    See the template collection →
                  </Link>
                </p>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center text-sm text-temple-500 flex items-center justify-center gap-1.5"
            >
              Made with <Heart size={14} className="text-maroon-500 fill-maroon-500" /> in Tamil
              Nadu, for Tamil celebrations everywhere.
            </motion.p>
          </div>
        </div>
      </section>
    </>
  );
}

