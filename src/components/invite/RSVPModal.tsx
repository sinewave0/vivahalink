"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, MessageCircle, PartyPopper, X } from "lucide-react";
import type { InvitationData } from "@/lib/types";
import { waLink } from "@/lib/constants";

interface RSVPModalProps {
  open: boolean;
  onClose: () => void;
  invitation: InvitationData;
}

interface RsvpState {
  attending: boolean | null;
  name: string;
  guests: number;
  events: string[];
  message: string;
}

const initial: RsvpState = {
  attending: null,
  name: "",
  guests: 2,
  events: [],
  message: "",
};

const stepMotion = {
  initial: { opacity: 0, x: 32 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -32 },
  transition: { duration: 0.3 },
};

/**
 * Three-step RSVP that composes a pre-filled WhatsApp message
 * and opens wa.me — RSVPs are handled personally by the hosts,
 * consistent with VivahaLink's no-backend v1 model.
 */
export default function RSVPModal({ open, onClose, invitation }: RSVPModalProps) {
  const [state, setState] = useState<RsvpState>(initial);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const errorTimer = useRef<number | null>(null);

  const eventNames = useMemo(
    () => invitation.ceremonies.map((c) => c.name),
    [invitation.ceremonies]
  );

  // Clear the pending error reset so nothing fires after unmount
  useEffect(() => {
    return () => {
      if (errorTimer.current !== null) clearTimeout(errorTimer.current);
    };
  }, []);

  const patch = (partial: Partial<RsvpState>) => setState((s) => ({ ...s, ...partial }));

  const close = () => {
    setState({ ...initial, events: eventNames });
    setStep(1);
    setError("");
    setSent(false);
    onClose();
  };

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const canContinue = (): boolean => {
    if (step === 1) {
      if (state.attending === null) {
        setError("Please choose whether you can join us.");
        return false;
      }
      return true;
    }
    if (step === 2) {
      if (!state.name.trim()) {
        setError("Please add your name — the hosts would love to know who's coming.");
        return false;
      }
      if (state.attending && state.events.length === 0) {
        setError("Select at least one celebration, or pick 'All of the above'.");
        return false;
      }
      return true;
    }
    return true;
  };

  const next = () => {
    if (!canContinue()) {
      if (errorTimer.current !== null) clearTimeout(errorTimer.current);
      errorTimer.current = window.setTimeout(() => setError(""), 3500);
      return;
    }
    setError("");
    setStep((s) => s + 1);
  };

  const drafts = (() => {
    const name = state.name.trim() || "Guest";
    const eventsText =
      state.attending === false
        ? "—"
        : state.events.length === eventNames.length
          ? "All celebrations"
          : state.events.join(", ") || "All celebrations";

    const base =
      `RSVP — ${invitation.coupleName1} & ${invitation.coupleName2}'s Invitation\n\n` +
      `Name: ${name}\n` +
      `Attending: ${state.attending ? "Yes ✅" : "No ❌"}`;

    const attendingLines =
      state.attending === true
        ? `\nGuests: ${state.guests}\nEvents: ${eventsText}`
        : "";

    const messageLine = state.message.trim() ? `\n\nNote: ${state.message.trim()}` : "";
    return base + attendingLines + messageLine;
  })();

  const submit = () => {
    try {
      window.open(waLink(drafts, invitation.rsvpWhatsAppNumber), "_blank");
    } catch {
      window.location.href = waLink(drafts, invitation.rsvpWhatsAppNumber);
    }
    setSent(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="rsvp-modal"
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-maroon-950/70 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="RSVP"
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-gold-200/70 bg-ivory-50 shadow-2xl"
          >
            {/* Header */}
            <div className="relative bg-maroon-800 px-6 py-5" style={{ backgroundColor: "#7a1636" }}>
              <div className="absolute inset-0 kolam-pattern opacity-10" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold-400/90">
                    {invitation.coupleName1} &amp; {invitation.coupleName2}
                  </p>
                  <h3 className="mt-0.5 font-serif text-xl font-semibold text-ivory-100">
                    {sent ? "Almost done!" : "Will you join us?"}
                  </h3>
                </div>
                <button
                  onClick={close}
                  aria-label="Close RSVP"
                  className="rounded-full p-2 text-ivory-300/80 transition-colors hover:bg-white/10 hover:text-ivory-100"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="max-h-[82dvh] overflow-y-auto overscroll-contain p-6 sm:p-7">
              {!sent ? (
                <>
                  {/* Progress dots */}
                  <div className="mb-6 flex items-center justify-center gap-2">
                    {[1, 2, 3].map((s) => (
                      <span
                        key={s}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          s === step ? "w-7 bg-gold-500" : "w-3 bg-temple-200"
                        }`}
                      />
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div key="step1" {...stepMotion} className="space-y-3">
                        <p className="text-sm text-temple-600 text-center mb-4">
                          How should we tell the couple?
                        </p>
                        <button
                          onClick={() => {
                            patch({ attending: true });
                            if (state.events.length === 0) patch({ events: eventNames });
                          }}
                          className={`w-full rounded-2xl border-2 px-4 py-4 text-left transition-all ${
                            state.attending === true
                              ? "border-gold-500 bg-gold-100/70 shadow-md"
                              : "border-gold-200/50 bg-white hover:border-gold-400"
                          }`}
                        >
                          <span className="text-lg">🥁</span>
                          <p className="font-serif text-base font-semibold text-maroon-800">
                            Joyfully attending
                          </p>
                          <p className="text-xs text-temple-500">We wouldn&apos;t miss it!</p>
                        </button>
                        <button
                          onClick={() => patch({ attending: false })}
                          className={`w-full rounded-2xl border-2 px-4 py-4 text-left transition-all ${
                            state.attending === false
                              ? "border-temple-400 bg-ivory-200 shadow-md"
                              : "border-gold-200/50 bg-white hover:border-temple-300"
                          }`}
                        >
                          <span className="text-lg">🪔</span>
                          <p className="font-serif text-base font-semibold text-maroon-800">
                            With you in spirit
                          </p>
                          <p className="text-xs text-temple-500">
                            Sending love, can&apos;t make it.
                          </p>
                        </button>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div key="step2" {...stepMotion} className="space-y-4">
                        <div>
                          <label htmlFor="rsvp-name" className="text-xs font-semibold uppercase tracking-wider text-temple-600">
                            Your name
                          </label>
                          <input
                            id="rsvp-name"
                            value={state.name}
                            onChange={(e) => patch({ name: e.target.value.slice(0, 60) })}
                            placeholder="e.g. The Kumar family"
                            className="mt-1.5 w-full rounded-xl border border-gold-200/60 bg-white px-4 py-3 text-sm text-temple-800 outline-none transition-colors placeholder:text-temple-400 focus:border-gold-500"
                            autoFocus
                          />
                        </div>

                        {state.attending && (
                          <>
                            <div>
                              <span className="text-xs font-semibold uppercase tracking-wider text-temple-600">
                                Total guests (including you)
                              </span>
                              <div className="mt-1.5 flex items-center gap-3">
                                <div className="flex w-full rounded-xl border border-gold-200/60 bg-white">
                                  <button
                                    type="button"
                                    onClick={() => patch({ guests: Math.max(1, state.guests - 1) })}
                                    className="px-4 py-3 text-lg text-maroon-700 hover:bg-ivory-100 rounded-l-xl transition-colors"
                                    aria-label="Fewer guests"
                                  >
                                    −
                                  </button>
                                  <span className="flex-1 py-3 text-center text-sm font-semibold tabular-nums text-maroon-800 select-none">
                                    {state.guests}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => patch({ guests: Math.min(10, state.guests + 1) })}
                                    className="px-4 py-3 text-lg text-maroon-700 hover:bg-ivory-100 rounded-r-xl transition-colors"
                                    aria-label="More guests"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div>
                              <span className="text-xs font-semibold uppercase tracking-wider text-temple-600">
                                Which celebrations?
                              </span>
                              <div className="mt-1.5 flex flex-wrap gap-2">
                                {eventNames.map((event) => {
                                  const active = state.events.includes(event);
                                  return (
                                    <button
                                      key={event}
                                      type="button"
                                      onClick={() =>
                                        patch({
                                          events: active
                                            ? state.events.filter((e) => e !== event)
                                            : [...state.events, event],
                                        })
                                      }
                                      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                                        active
                                          ? "border-maroon-700 bg-maroon-800 text-ivory-100"
                                          : "border-gold-200/70 bg-white text-temple-600 hover:border-gold-400"
                                      }`}
                                    >
                                      {event}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </>
                        )}

                        {!state.attending && (
                          <div>
                            <label htmlFor="rsvp-msg" className="text-xs font-semibold uppercase tracking-wider text-temple-600">
                              A note for the couple (optional)
                            </label>
                            <textarea
                              id="rsvp-msg"
                              value={state.message}
                              onChange={(e) => patch({ message: e.target.value.slice(0, 250) })}
                              placeholder="Wishing you a lifetime of happiness…"
                              rows={3}
                              className="mt-1.5 w-full resize-none rounded-xl border border-gold-200/60 bg-white px-4 py-3 text-sm text-temple-800 outline-none transition-colors placeholder:text-temple-400 focus:border-gold-500"
                            />
                          </div>
                        )}
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div key="step3" {...stepMotion} className="space-y-4">
                        <div className="rounded-2xl border border-gold-200/60 bg-white p-4 text-sm">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-700">
                            Review your RSVP
                          </p>
                          <dl className="mt-3 space-y-2 text-temple-700">
                            <div className="flex justify-between gap-4">
                              <dt className="text-temple-500">Name</dt>
                              <dd className="font-medium text-maroon-800 text-right">{state.name}</dd>
                            </div>
                            <div className="flex justify-between gap-4">
                              <dt className="text-temple-500">Attending</dt>
                              <dd className="font-medium text-maroon-800">
                                {state.attending ? "Yes, joyfully 🥁" : "With you in spirit 🪔"}
                              </dd>
                            </div>
                            {state.attending && (
                              <>
                                <div className="flex justify-between gap-4">
                                  <dt className="text-temple-500">Guests</dt>
                                  <dd className="font-medium text-maroon-800">{state.guests}</dd>
                                </div>
                                <div className="flex justify-between gap-4">
                                  <dt className="shrink-0 text-temple-500">Events</dt>
                                  <dd className="text-right font-medium text-maroon-800">
                                    {state.events.length === eventNames.length
                                      ? "All celebrations"
                                      : state.events.join(", ")}
                                  </dd>
                                </div>
                              </>
                            )}
                            {state.message.trim() && (
                              <div className="flex justify-between gap-4">
                                <dt className="text-temple-500">Note</dt>
                                <dd className="text-right font-medium text-maroon-800 italic">
                                  {state.message}
                                </dd>
                              </div>
                            )}
                          </dl>
                          <p className="mt-4 text-[11px] leading-relaxed text-temple-500">
                            Tapping send opens WhatsApp with your RSVP pre-filled. The hosts
                            receive it directly — no accounts, no forms.
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={submit}
                          className="w-full inline-flex items-center justify-center gap-2.5 rounded-2xl bg-green-600 px-4 py-4 text-sm font-semibold text-white shadow-lg shadow-green-600/25 transition-colors hover:bg-green-500"
                        >
                          <MessageCircle size={18} />
                          Send RSVP on WhatsApp
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 text-center text-xs font-medium text-red-600"
                    >
                      {error}
                    </motion.p>
                  )}

                  {/* Nav buttons */}
                  <div className="mt-6 flex items-center justify-between">
                    <button
                      onClick={() => (step === 1 ? onClose() : setStep((s) => s - 1))}
                      className="px-2 py-2 text-xs font-medium text-temple-500 hover:text-maroon-700 transition-colors"
                    >
                      ← {step === 1 ? "Cancel" : "Back"}
                    </button>
                    {step < 3 && (
                      <button
                        onClick={next}
                        className="rounded-xl bg-maroon-800 px-6 py-2.5 text-xs font-semibold text-ivory-100 transition-colors hover:bg-maroon-700"
                      >
                        Continue →
                      </button>
                    )}
                  </div>
                </>
              ) : (
                /* ── Sent state ── */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-100 border border-gold-300">
                    {state.attending ? (
                      <PartyPopper size={26} className="text-gold-700" />
                    ) : (
                      <Check size={26} className="text-gold-700" />
                    )}
                  </div>
                  <h4 className="mt-4 font-serif text-2xl text-maroon-800">
                    {state.attending ? "See you there!" : "Your note is on its way"}
                  </h4>
                  <p className="mx-auto mt-2 max-w-[16rem] text-sm text-temple-600">
                    Just hit <span className="font-medium">send</span> in the WhatsApp window
                    that opened — the couple will get it personally.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 rounded-xl border border-gold-300/70 px-8 py-2.5 text-xs font-semibold text-maroon-800 transition-colors hover:bg-gold-50"
                  >
                    Back to invitation
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
