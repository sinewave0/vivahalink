"use client";

import { useState, useSyncExternalStore } from "react";
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

/**
 * Guest-friendly share sheet: native share (where supported),
 * copy-to-clipboard with feedback, and a forward-on-WhatsApp option.
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
          <div className="absolute inset-0 bg-maroon-950/60 backdrop-blur-sm" onClick={close} aria-hidden="true" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Share invitation"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 28 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-gold-200/70 bg-ivory-50 shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 pt-5">
              <h3 className="font-serif text-lg font-semibold text-maroon-800">Share this invitation</h3>
              <button
                onClick={close}
                aria-label="Close share menu"
                className="rounded-full p-2 text-temple-500 transition-colors hover:bg-ivory-200 hover:text-maroon-800"
              >
                <X size={18} />
              </button>
            </div>

            <p className="px-6 pt-2 text-xs text-temple-500 break-all line-clamp-2">{shareUrl}</p>

            <div className="p-5 pt-4 grid grid-cols-1 gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl bg-green-600 px-4 py-3.5 text-sm font-medium text-white transition-colors hover:bg-green-500"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Forward on WhatsApp
              </a>

              <button
                onClick={copy}
                className="flex items-center gap-3 rounded-2xl border border-gold-300/60 bg-white px-4 py-3.5 text-sm font-medium text-maroon-800 transition-colors hover:bg-gold-50"
              >
                {copied ? (
                  <Check size={18} className="text-green-600" />
                ) : (
                  <Copy size={18} className="text-gold-700" />
                )}
                {copied ? "Link copied!" : "Copy invitation link"}
              </button>

              {nativeAvailable && (
                <button
                  onClick={nativeShare}
                  className="flex items-center gap-3 rounded-2xl border border-gold-300/60 bg-white px-4 py-3.5 text-sm font-medium text-maroon-800 transition-colors hover:bg-gold-50"
                >
                  <Share2 size={18} className="text-gold-700" />
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
