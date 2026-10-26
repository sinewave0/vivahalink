"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Share2, X } from "lucide-react";
import { waLink, waMessages } from "@/lib/constants";

interface ShareMenuProps {
  open: boolean;
  onClose: () => void;
  /** Absolute link to the invitation, e.g. https://vivahalink.com/invite/xyz */
  shareUrl: string;
  title: string;
}

const subscribe = () => () => {};
const getNativeShareSupport = () => typeof navigator !== "undefined" && "share" in navigator;
const getServerShareSupport = () => false;

const rowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  width: "100%",
  borderRadius: 16,
  border: "1px solid rgba(176,138,70,.45)",
  background: "var(--ivory)",
  padding: "14px 16px",
  fontFamily: "var(--font-body)",
  fontSize: "0.9rem",
  color: "var(--ink)",
  cursor: "pointer",
  textDecoration: "none",
  transition: "background .25s",
};

/**
 * Guest-friendly share sheet, styled as a card-paper note: forward on
 * WhatsApp, copy the link, or hand off to the native share sheet.
 */
export default function ShareMenu({ open, onClose, shareUrl, title }: ShareMenuProps) {
  const [copied, setCopied] = useState(false);
  const nativeAvailable = useSyncExternalStore(
    subscribe,
    getNativeShareSupport,
    getServerShareSupport
  );

  const close = () => {
    setCopied(false);
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

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // Fallback for older / restricted browsers
      const el = document.createElement("textarea");
      el.value = shareUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title, text: `You're invited! ${title}`, url: shareUrl });
      close();
    } catch {
      /* user dismissed — no action */
    }
  };

  const whatsappUrl = waLink(waMessages.share(shareUrl, title));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="share-menu"
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
            aria-label="Share invitation"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 28 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-sm overflow-hidden"
            style={{
              borderRadius: 26,
              border: "1px solid var(--gold)",
              background: "var(--paper)",
              backgroundImage: "var(--noise)",
              boxShadow: "0 40px 80px -30px rgba(27,20,64,.55)",
            }}
          >
            <div className="flex items-start justify-between gap-4 p-6 pb-0">
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-label)",
                    fontSize: "0.56rem",
                    letterSpacing: "0.26em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    margin: 0,
                  }}
                >
                  Pass it on
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.55rem",
                    color: "var(--ink)",
                    margin: "4px 0 0",
                  }}
                >
                  Share this invitation
                </h3>
              </div>
              <button
                onClick={close}
                aria-label="Close share menu"
                style={{
                  borderRadius: 999,
                  padding: 8,
                  border: "1px solid rgba(176,138,70,.45)",
                  background: "rgba(255,250,242,.7)",
                  color: "var(--ink)",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <X size={16} />
              </button>
            </div>

            <p
              style={{
                padding: "10px 24px 0",
                margin: 0,
                fontSize: "0.72rem",
                color: "var(--ink-soft)",
                wordBreak: "break-all",
              }}
            >
              {shareUrl}
            </p>

            <div className="p-5 pt-4 grid grid-cols-1 gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...rowStyle, background: "var(--ink)", borderColor: "var(--ink)", color: "var(--ivory)" }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ flexShrink: 0 }} aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Forward on WhatsApp
              </a>

              <button onClick={copy} style={rowStyle}>
                {copied ? (
                  <Check size={17} style={{ color: "#2f7d4f" }} />
                ) : (
                  <Copy size={17} style={{ color: "var(--gold)" }} />
                )}
                {copied ? "Link copied" : "Copy invitation link"}
              </button>

              {nativeAvailable && (
                <button onClick={nativeShare} style={rowStyle}>
                  <Share2 size={17} style={{ color: "var(--gold)" }} />
                  More options…
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
