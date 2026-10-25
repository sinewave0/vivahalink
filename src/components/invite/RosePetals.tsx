"use client";

import { motion, useReducedMotion } from "framer-motion";

interface RosePetalsProps {
  /** How many petals drift at once (keep modest on phones). */
  count?: number;
  className?: string;
  colors?: string[];
}

const DEFAULT_COLORS = [
  "#ec7696", // rose pink
  "#cb2a5b", // deep rose
  "#f4a8ba", // soft blush
  "#f9d0d9", // pale petal
  "#e5c02a", // occasional marigold-gold petal
];

/**
 * Floating rose petals — the signature garnish of a luxury invite.
 * Every value is derived from the petal index (never Math.random at
 * render) so server-rendered markup and the client's first render
 * match exactly.
 */
export default function RosePetals({
  count = 12,
  className = "",
  colors = DEFAULT_COLORS,
}: RosePetalsProps) {
  const reduced = useReducedMotion();

  const petals = Array.from({ length: count }, (_, i) => {
    // Small integer hash — stable across server & client renders
    const r1 = ((i * 9301 + 49297) % 233280) / 233280;
    const r2 = ((i * 4021 + 15473) % 65536) / 65536;
    const r3 = ((i * 7043 + 2647) % 104729) / 104729;
    return {
      i,
      left: r1 * 96,                     // % across the viewport
      top: r3 * 70,                      // static scatter (reduced motion)
      size: 9 + r2 * 13,                 // px
      duration: 10 + r3 * 9,             // one full fall, seconds
      delay: (i * 1.7) % 7,              // stagger the launch times
      drift: 22 + r1 * 30,               // px of side-to-side sway
      sway: 3 + r1 * 2.6,                // sway tempo, seconds per beat
      spin: (r2 > 0.5 ? 1 : -1) * (150 + r2 * 210),
      rest: 38 + r3 * 42,                // resting rotation, deg
      opacity: 0.42 + r3 * 0.38,
      color: colors[i % colors.length],
    };
  });

  if (reduced) {
    // Honour prefers-reduced-motion: a still, subtle scatter.
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      >
        {petals.map((p) => (
          <span
            key={p.i}
            className="absolute"
            style={{
              left: `${p.left + 2}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size * 1.45,
              opacity: p.opacity * 0.5,
              borderRadius: "62% 38% 54% 46% / 66% 30% 70% 34%",
              background: `radial-gradient(circle at 34% 28%, rgba(255,255,255,.5), transparent 56%), linear-gradient(140deg, ${p.color}, ${p.color}99)`,
              transform: `rotate(${p.rest}deg)`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {petals.map((p) => (
        // Outer loop: one linear fall from above the fold to below it
        <motion.span
          key={p.i}
          className="absolute -top-[8vh] will-change-transform"
          style={{ left: `${p.left}%` }}
          animate={{
            y: ["-8vh", "-8vh", "110vh", "112vh"],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.07, 0.9, 1],
          }}
        >
          {/* Inner loop: gentle sway + slow tumble while falling */}
          <motion.span
            className="block will-change-transform"
            style={{
              width: p.size,
              height: p.size * 1.45,
              borderRadius: "62% 38% 54% 46% / 66% 30% 70% 34%",
              background: `radial-gradient(circle at 34% 28%, rgba(255,255,255,.5), transparent 56%), linear-gradient(140deg, ${p.color}, ${p.color}99)`,
              boxShadow: `1px 2px 6px rgba(90, 17, 41, 0.18)`,
            }}
            animate={{
              x: [0, p.drift, -p.drift * 0.85, p.drift * 0.6, 0],
              rotate: [p.rest, p.rest + p.spin / 2, p.rest + p.spin, p.rest + p.spin * 1.5, p.rest + p.spin * 2],
            }}
            transition={{
              duration: p.sway * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.span>
      ))}
    </div>
  );
}
