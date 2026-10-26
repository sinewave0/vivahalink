"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
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

const fieldLabel: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-label)",
  fontSize: "0.6rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "var(--gold)",
  marginBottom: 8,
};

const field: React.CSSProperties = {
  width: "100%",
  borderRadius: 14,
  border: "1px solid rgba(176,138,70,.45)",
  background: "var(--ivory)",
  padding: "13px 15px",
  fontSize: "0.95rem",
  color: "var(--ink)",
  outline: "none",
  fontFamily: "var(--font-body)",
};

/**
 * Three-step RSVP composed as a card-paper note. Responses are turned
 * into a pre-filled WhatsApp message and opened in wa.me — RSVPs are
 * handled personally by the hosts, consistent with the no-backend model.
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

  const choice = (selected: boolean): React.CSSProperties => ({
    width: "100%",
    textAlign: "left",
    borderRadius: 18,
    border: selected ? "1.5px solid var(--gold)" : "1px solid rgba(176,138,70,.35)",
    background: selected ? "rgba(224,195,133,.22)" : "var(--ivory)",
    padding: "15px 17px",
    cursor: "pointer",
    transition: "background .25s, border-color .25s",
  });

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
          <div
            className="absolute inset-0"
            style={{ background: "rgba(27,20,64,.62)", backdropFilter: "blur(4px)" }}
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
            className="relative w-full max-w-md overflow-hidden"
            style={{
              borderRadius: 26,
              border: "1px solid var(--gold)",
              background: "var(--paper)",
              boxShadow: "0 40px 80px -30px rgba(27,20,64,.55)",
            }}
          >
            {/* Header band */}
            <div
              style={{
                position: "relative",
                padding: "22px 24px 20px",
                background: "linear-gradient(180deg, #f7dce4 0, var(--ink) 190%)",
                borderBottom: "1px solid rgba(176,138,70,.45)",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-label)",
                      fontSize: "0.58rem",
                      letterSpacing: "0.26em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      margin: 0,
                    }}
                  >
                    {invitation.coupleName1} &amp; {invitation.coupleName2}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.6rem",
                      color: "var(--ink)",
                      margin: "4px 0 0",
                    }}
                  >
                    {sent ? "Almost done" : "Will you join us?"}
                  </h3>
                </div>
                <button
                  onClick={close}
                  aria-label="Close RSVP"
                  style={{
                    borderRadius: 999,
                    padding: 8,
                    border: "1px solid rgba(176,138,70,.45)",
                    background: "rgba(255,250,242,.7)",
                    color: "var(--ink)",
                    cursor: "pointer",
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div
              style={{ background: "var(--paper)", backgroundImage: "var(--noise)" }}
              className="max-h-[78dvh] overflow-y-auto overscroll-contain p-6 sm:p-7"
            >
              {!sent ? (
                <>
                  {/* Progress */}
                  <div className="mb-6 flex items-center justify-center gap-2">
                    {[1, 2, 3].map((s) => (
                      <span
                        key={s}
                        style={{
                          height: 4,
                          borderRadius: 999,
                          width: s === step ? 28 : 12,
                          background: s === step ? "var(--gold)" : "rgba(176,138,70,.28)",
                          transition: "all .3s",
                        }}
                      />
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div key="step1" {...stepMotion} className="space-y-3">
                        <p
                          style={{
                            fontFamily: "var(--font-display)",
                            fontStyle: "italic",
                            color: "var(--ink-soft)",
                            textAlign: "center",
                            marginBottom: 16,
                          }}
                        >
                          How should we tell the couple?
                        </p>

                        <button
                          onClick={() => {
                            patch({ attending: true });
                            if (state.events.length === 0) patch({ events: eventNames });
                          }}
                          style={choice(state.attending === true)}
                        >
                          <span style={{ fontSize: "1.1rem" }}>🪔</span>
                          <p
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "1.15rem",
                              color: "var(--ink)",
                              margin: "6px 0 0",
                            }}
                          >
                            Joyfully attending
                          </p>
                          <p style={{ fontSize: "0.78rem", color: "var(--ink-soft)", margin: 0 }}>
                            We wouldn&apos;t miss it.
                          </p>
                        </button>

                        <button
                          onClick={() => patch({ attending: false })}
                          style={choice(state.attending === false)}
                        >
                          <span style={{ fontSize: "1.1rem" }}>🌙</span>
                          <p
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "1.15rem",
                              color: "var(--ink)",
                              margin: "6px 0 0",
                            }}
                          >
                            With you in spirit
                          </p>
                          <p style={{ fontSize: "0.78rem", color: "var(--ink-soft)", margin: 0 }}>
                            Sending love, can&apos;t make it.
                          </p>
                        </button>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div key="step2" {...stepMotion} className="space-y-4">
                        <div>
                          <label htmlFor="rsvp-name" style={fieldLabel}>
                            Your name
                          </label>
                          <input
                            id="rsvp-name"
                            value={state.name}
                            onChange={(e) => patch({ name: e.target.value.slice(0, 60) })}
                            placeholder="e.g. The Kumar family"
                            style={field}
                            autoFocus
                          />
                        </div>

                        {state.attending && (
                          <>
                            <div>
                              <span style={fieldLabel}>Total guests (including you)</span>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  borderRadius: 14,
                                  border: "1px solid rgba(176,138,70,.45)",
                                  background: "var(--ivory)",
                                  overflow: "hidden",
                                }}
                              >
                                <button
                                  type="button"
                                  onClick={() => patch({ guests: Math.max(1, state.guests - 1) })}
                                  aria-label="Fewer guests"
                                  style={{
                                    padding: "11px 18px",
                                    fontSize: "1.1rem",
                                    color: "var(--ink)",
                                    background: "transparent",
                                    border: 0,
                                    cursor: "pointer",
                                  }}
                                >
                                  −
                                </button>
                                <span
                                  style={{
                                    flex: 1,
                                    textAlign: "center",
                                    fontFamily: "var(--font-display)",
                                    fontSize: "1.15rem",
                                    fontVariantNumeric: "tabular-nums",
                                    color: "var(--ink)",
                                  }}
                                >
                                  {state.guests}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => patch({ guests: Math.min(10, state.guests + 1) })}
                                  aria-label="More guests"
                                  style={{
                                    padding: "11px 18px",
                                    fontSize: "1.1rem",
                                    color: "var(--ink)",
                                    background: "transparent",
                                    border: 0,
                                    cursor: "pointer",
                                  }}
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <div>
                              <span style={fieldLabel}>Which celebrations?</span>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
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
                                      className={`chip${active ? " active" : ""}`}
                                      style={{ padding: "8px 14px", fontSize: "0.6rem" }}
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
                            <label htmlFor="rsvp-msg" style={fieldLabel}>
                              A note for the couple (optional)
                            </label>
                            <textarea
                              id="rsvp-msg"
                              value={state.message}
                              onChange={(e) => patch({ message: e.target.value.slice(0, 250) })}
                              placeholder="Wishing you a lifetime of happiness…"
                              rows={3}
                              style={{ ...field, resize: "none" }}
                            />
                          </div>
                        )}
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div key="step3" {...stepMotion} className="space-y-4">
                        <div
                          style={{
                            borderRadius: 18,
                            border: "1px solid rgba(176,138,70,.4)",
                            background: "var(--ivory)",
                            padding: 18,
                          }}
                        >
                          <p style={{ ...fieldLabel, marginBottom: 12 }}>Review your RSVP</p>
                          <dl style={{ display: "grid", gap: 10, margin: 0, fontSize: "0.88rem" }}>
                            <div className="flex justify-between gap-4">
                              <dt style={{ color: "var(--ink-soft)" }}>Name</dt>
                              <dd style={{ margin: 0, color: "var(--ink)", textAlign: "right" }}>
                                {state.name}
                              </dd>
                            </div>
                            <div className="flex justify-between gap-4">
                              <dt style={{ color: "var(--ink-soft)" }}>Attending</dt>
                              <dd style={{ margin: 0, color: "var(--ink)" }}>
                                {state.attending ? "Yes, joyfully 🪔" : "With you in spirit 🌙"}
                              </dd>
                            </div>
                            {state.attending && (
                              <>
                                <div className="flex justify-between gap-4">
                                  <dt style={{ color: "var(--ink-soft)" }}>Guests</dt>
                                  <dd style={{ margin: 0, color: "var(--ink)" }}>{state.guests}</dd>
                                </div>
                                <div className="flex justify-between gap-4">
                                  <dt style={{ color: "var(--ink-soft)", flexShrink: 0 }}>Events</dt>
                                  <dd style={{ margin: 0, color: "var(--ink)", textAlign: "right" }}>
                                    {state.events.length === eventNames.length
                                      ? "All celebrations"
                                      : state.events.join(", ")}
                                  </dd>
                                </div>
                              </>
                            )}
                            {state.message.trim() && (
                              <div className="flex justify-between gap-4">
                                <dt style={{ color: "var(--ink-soft)" }}>Note</dt>
                                <dd
                                  style={{
                                    margin: 0,
                                    color: "var(--ink)",
                                    textAlign: "right",
                                    fontStyle: "italic",
                                  }}
                                >
                                  {state.message}
                                </dd>
                              </div>
                            )}
                          </dl>
                          <p
                            style={{
                              marginTop: 16,
                              fontSize: "0.72rem",
                              lineHeight: 1.6,
                              color: "var(--ink-soft)",
                            }}
                          >
                            Tapping send opens WhatsApp with your RSVP pre-filled. The hosts
                            receive it directly — no accounts, no forms.
                          </p>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={submit}
                          className="btn solid w-full"
                          style={{ padding: "14px 20px", fontSize: "0.68rem" }}
                        >
                          <span className="inline-flex items-center justify-center gap-2">
                            <MessageCircle size={16} />
                            Send RSVP on WhatsApp
                          </span>
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        marginTop: 12,
                        textAlign: "center",
                        fontSize: "0.76rem",
                        color: "#a51d47",
                      }}
                    >
                      {error}
                    </motion.p>
                  )}

                  <div className="mt-6 flex items-center justify-between">
                    <button
                      onClick={() => (step === 1 ? close() : setStep((s) => s - 1))}
                      style={{
                        background: "transparent",
                        border: 0,
                        cursor: "pointer",
                        fontFamily: "var(--font-label)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--ink-soft)",
                        padding: "8px 4px",
                      }}
                    >
                      ← {step === 1 ? "Cancel" : "Back"}
                    </button>
                    {step < 3 && (
                      <button
                        onClick={next}
                        className="btn"
                        style={{ padding: "10px 20px", fontSize: "0.62rem" }}
                      >
                        Continue →
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ paddingBlock: 16, textAlign: "center" }}
                >
                  <div
                    style={{
                      margin: "0 auto",
                      width: 64,
                      height: 64,
                      borderRadius: 999,
                      display: "grid",
                      placeItems: "center",
                      border: "1px solid var(--gold)",
                      background: "rgba(224,195,133,.25)",
                      fontSize: "1.6rem",
                    }}
                  >
                    {state.attending ? "🪔" : "🌙"}
                  </div>
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.75rem",
                      color: "var(--ink)",
                      margin: "16px 0 6px",
                    }}
                  >
                    {state.attending ? "See you there" : "Your note is on its way"}
                  </h4>
                  <p
                    style={{
                      maxWidth: "22rem",
                      margin: "0 auto",
                      fontSize: "0.88rem",
                      color: "var(--ink-soft)",
                    }}
                  >
                    Just hit <strong>send</strong> in the WhatsApp window that opened — the
                    couple will get it personally.
                  </p>
                  <button
                    onClick={close}
                    className="btn"
                    style={{ marginTop: 24, padding: "11px 22px", fontSize: "0.62rem" }}
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
