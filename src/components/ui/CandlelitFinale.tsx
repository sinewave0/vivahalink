"use client";

/**
 * CandlelitFinale — the closing scene: a night mandap lit by a hundred
 * candles, drifting motes, and a terracotta sky. Text + actions float above
 * the scene so callers can end any page with "with love and blessings"
 * plus their call to action.
 *
 * Ported from the reference invitation aesthetic as idempotent JSX with
 * deterministic (seeded) detail loops — safe for SSR/hydration.
 */

import { useEffect, useRef, type ReactNode } from "react";

function makeRng(seed: number) {
  let a = seed | 0;
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* deterministic stars -------------------------------------------------- */
const STARS = (() => {
  const rng = makeRng(5);
  return Array.from({ length: 130 }, () => {
    const cx = Math.round(rng() * 2600 - 700);
    const cy = Math.round(rng() * 560 - 20);
    const r = Number((rng() * 1.5 + 0.4).toFixed(2));
    return { cx, cy, r, td: (2 + rng() * 4).toFixed(1), tl: (-rng() * 5).toFixed(1) };
  });
})();

/* valance scallops across the mandap beam ----------------------------- */
const VALANCE = Array.from({ length: 12 }, (_, i) => {
  const x0 = 372 + i * 38;
  return { x0, x1: x0 + 38 };
});

/* marigold wraps on the main pillars ---------------------------------- */
const WRAP_COLS = [409, 791];

/* fairy-light strings -------------------------------------------------- */
const STRINGS = [440, 480, 520, 560, 640, 680, 720, 760];
const stringBulbs = STRINGS.map((x, k) => {
  const len = 70 + ((k * 37) % 60);
  const bulbs = [];
  for (let j = 0; j < Math.floor(len / 9); j++) {
    bulbs.push({ x, y: 304 + j * 9, warm: (j + k) % 3 !== 0 });
  }
  return { x, len, bulbs };
});

const candleFlame = (x: number, y: number, s: number) =>
  `M${x} ${y - 26 * s}c${-4 * s} ${6 * s} ${-5 * s} ${10 * s} ${-2 * s} ${14 * s}` +
  `c${1.4 * s} ${1.6 * s} ${3 * s} ${1.6 * s} ${4 * s} 0` +
  `c${3 * s} ${-4 * s} ${2 * s} ${-8 * s} ${-2 * s} ${-14 * s}z`;

/* rows of little candles in front ------------------------------------- */
const CANDLE_ROW_FRONT: Array<{ x: number; y: number; s: number }> = [];
for (let x = 292; x <= 908; x += 34) CANDLE_ROW_FRONT.push({ x, y: 690, s: 0.9 });
const CANDLE_ROW_MID: Array<{ x: number; y: number; s: number }> = [];
for (let x = 338; x <= 862; x += 40) CANDLE_ROW_MID.push({ x, y: 640, s: 0.8 });
const CANDLE_ISLES: Array<{ x: number; y: number; s: number }> = (() => {
  const out: Array<{ x: number; y: number; s: number }> = [];
  for (let r = 0; r < 4; r++) {
    const y = 770 + r * 68;
    const sc = 0.95 + r * 0.2;
    const off = 62 + r * 26;
    out.push({ x: 600 - off - 28 * sc, y, s: sc });
    out.push({ x: 600 + off + 28 * sc, y, s: sc });
    out.push({ x: 600 - off - 90 * sc, y: y + 18, s: sc });
    out.push({ x: 600 + off + 90 * sc, y: y + 18, s: sc });
  }
  return out;
})();

const ALL_CANDLES = [...CANDLE_ROW_FRONT, ...CANDLE_ROW_MID, ...CANDLE_ISLES];

/* drifting motes ------------------------------------------------------- */
const MOTES = (() => {
  const rng = makeRng(9);
  return Array.from({ length: 34 }, () => ({
    cx: Math.round(300 + rng() * 600),
    cy: Math.round(900 + rng() * 260),
    r: Number((1 + rng() * 2).toFixed(1)),
    mt: (7 + rng() * 8).toFixed(1),
    ml: (-rng() * 12).toFixed(1),
    mx: `${Math.round((rng() - 0.5) * 80)}px`,
  }));
})();

export interface CandlelitFinaleProps {
  /** small engraved label above the title */
  overline: string;
  /** big serif title */
  title: ReactNode;
  /** italic line under the title */
  subtitle?: ReactNode;
  /** buttons (rendered inside .finale-actions with pointer events) */
  actions?: ReactNode;
  /** small credit line pinned near the bottom (e.g. "Crafted on VivahaLink") */
  credit?: ReactNode;
  id?: string;
  /** compact mode (reduced vertical distance by 25%) */
  compact?: boolean;
}

export default function CandlelitFinale({
  overline,
  title,
  subtitle,
  actions,
  credit,
  id,
  compact = false,
}: CandlelitFinaleProps) {
  const sceneRef = useRef<SVGSVGElement | null>(null);

  /* choose slice vs meet so the wide mandap always frames nicely */
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const fit = () => {
      scene.setAttribute(
        "preserveAspectRatio",
        window.innerWidth / window.innerHeight < 1.15 ? "xMidYMid slice" : "xMidYMid meet"
      );
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <footer className={`finale ${compact ? "finale-compact" : ""}`} id={id}>
      <svg className="scene" ref={sceneRef} viewBox="0 0 1200 1120" aria-hidden="true">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#100b18" />
            <stop offset="0.5" stopColor="#241528" />
            <stop offset="0.78" stopColor="#4a2a35" />
            <stop offset="1" stopColor="#7a463a" />
          </linearGradient>
          <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2a1a26" />
            <stop offset="1" stopColor="#120b18" />
          </linearGradient>
          <linearGradient id="pillar" x1="0" x2="1">
            <stop offset="0" stopColor="#8d6a33" />
            <stop offset="0.5" stopColor="#ecd08a" />
            <stop offset="1" stopColor="#8d6a33" />
          </linearGradient>
          <linearGradient id="roof" x1="0" x2="1">
            <stop offset="0" stopColor="#b87d52" />
            <stop offset="0.5" stopColor="#f0d3ab" />
            <stop offset="1" stopColor="#b87d52" />
          </linearGradient>
          <linearGradient id="valance" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f4dcc0" />
            <stop offset="1" stopColor="#c98d63" />
          </linearGradient>
          <linearGradient id="drape" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#f2d3b4" stopOpacity="0.1" />
            <stop offset="0.5" stopColor="#f2d3b4" stopOpacity="0.5" />
            <stop offset="1" stopColor="#f2d3b4" stopOpacity="0.12" />
          </linearGradient>
          <radialGradient id="halo" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ffb868" stopOpacity="0.62" />
            <stop offset="0.55" stopColor="#ff9a52" stopOpacity="0.18" />
            <stop offset="1" stopColor="#ff9a52" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cglow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ffe9a8" stopOpacity="0.95" />
            <stop offset="0.4" stopColor="#ffb55a" stopOpacity="0.4" />
            <stop offset="1" stopColor="#ff9040" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="flame" cx="0.5" cy="0.7" r="0.6">
            <stop offset="0" stopColor="#fffbe0" />
            <stop offset="0.45" stopColor="#ffd25c" />
            <stop offset="1" stopColor="#ff7a2e" />
          </radialGradient>
          <linearGradient id="carpet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8a4a35" />
            <stop offset="1" stopColor="#4a231c" />
          </linearGradient>
          <radialGradient id="vig" cx="0.5" cy="0.5" r="0.75">
            <stop offset="0.6" stopColor="#0c0720" stopOpacity="0" />
            <stop offset="1" stopColor="#0a0610" stopOpacity="0.7" />
          </radialGradient>
        </defs>

        <rect x="-1200" y="-400" width="3600" height="1200" fill="url(#sky)" />

        {/* stars */}
        <g>
          {STARS.map((s, i) => (
            <circle
              key={i}
              className="star"
              style={{ "--td": `${s.td}s`, "--tl": `${s.tl}s` } as React.CSSProperties}
              cx={s.cx}
              cy={s.cy}
              r={s.r}
              fill="#fff6e0"
            />
          ))}
        </g>

        {/* distant fort wall + town */}
        <g fill="#241526" opacity={0.92}>
          <rect x="-1200" y="690" width="3600" height="90" />
          <path id="twr" d="M0 690V600h64v90zM-4 600h72a36 36 0 0 0-72 0zM32 560v-16" />
          <use href="#twr" x="-420" />
          <use href="#twr" x="-160" y="-26" />
          <use href="#twr" x="70" y="-8" />
          <use href="#twr" x="1070" y="-8" />
          <use href="#twr" x="1260" y="-30" />
          <use href="#twr" x="1520" />
          <path
            d="M170 690V640a22 22 0 0 1 44 0v50zM240 690V622a26 26 0 0 1 52 0v68zM330 690V650h50v40zM820 690V650h50v40zM908 690V622a26 26 0 0 1 52 0v68zM986 690V640a22 22 0 0 1 44 0v50z"
            fill="#33202c"
          />
        </g>
        <g fill="#ffcf7a" opacity={0.8}>
          <rect x="188" y="656" width="6" height="12" rx={3} />
          <rect x="262" y="650" width="6" height="12" rx={3} />
          <rect x="930" y="650" width="6" height="12" rx={3} />
          <rect x="1004" y="656" width="6" height="12" rx={3} />
          <rect x="100" y="640" width="5" height="10" rx={2.5} />
          <rect x="1110" y="640" width="5" height="10" rx={2.5} />
        </g>

        <rect x="-1200" y="776" width="3600" height="560" fill="url(#floor)" />
        <ellipse className="glow" cx="600" cy="680" rx="620" ry="360" fill="url(#halo)" />

        {/* the mandap */}
        <g transform="translate(0 290)">
          <path d="M270 690h660l30 54H240z" fill="#2b1a22" />
          <path d="M270 690h660" stroke="#e0c385" strokeWidth={2} />
          <path d="M320 640h560l34 50H286z" fill="#3a2228" />
          <path d="M320 640h560" stroke="#e0c385" strokeWidth={2} />
          <rect x="320" y="590" width="560" height="52" fill="#472a2e" />
          <path d="M320 590h560" stroke="#e0c385" strokeWidth={2.5} />
          <path d="M548 744h104l110 316H438z" fill="url(#carpet)" />
          <path d="M560 744l-100 316M640 744l100 316" stroke="#e0c385" strokeWidth={2} fill="none" opacity={0.8} />
          <g fill="url(#pillar)" opacity={0.75}>
            <rect x="472" y="262" width="14" height="330" />
            <rect x="714" y="262" width="14" height="330" />
          </g>
          <rect x="452" y="248" width="296" height="10" fill="#d9b47c" opacity={0.85} />
          <path d="M392 258C410 184 510 128 600 80c90 48 190 104 208 178z" fill="url(#roof)" />
          <g fill="none" stroke="#c09268" strokeWidth={1.6} opacity={0.75}>
            <path d="M600 80C560 140 540 200 534 258" />
            <path d="M600 80C640 140 660 200 666 258" />
            <path d="M600 80C520 130 470 200 452 258" />
            <path d="M600 80C680 130 730 200 748 258" />
          </g>
          <ellipse cx="600" cy="76" rx="11" ry="6" fill="#e0c385" />
          <path d="M600 70V40" stroke="#e0c385" strokeWidth={3.5} strokeLinecap="round" />
          <circle cx="600" cy="38" r={4.5} fill="#ffd98a" />
          <path d="M372 262h456l-14 -16H386z" fill="#e0c385" />

          {/* valance scallops */}
          <g>
            {VALANCE.map((v, i) => (
              <g key={i}>
                <path d={`M${v.x0} 262Q${v.x0 + 19} 312 ${v.x1} 262Z`} fill="url(#valance)" stroke="#e0c385" strokeWidth={1.2} />
                <circle cx={v.x0 + 19} cy={296} r={2.4} fill="#ffd98a" />
              </g>
            ))}
          </g>

          {/* side drapes */}
          <path d="M408 270C340 350 366 520 344 640h58C410 520 428 380 422 270z" fill="url(#drape)" />
          <path d="M792 270C860 350 834 520 856 640h-58C790 520 772 380 778 270z" fill="url(#drape)" />

          {/* main pillars with marigold wraps */}
          <g>
            <rect x="396" y="258" width="26" height="384" fill="url(#pillar)" />
            <rect x="778" y="258" width="26" height="384" fill="url(#pillar)" />
            <g fill="#f2d78f">
              <rect x="390" y="252" width="38" height="12" rx={3} />
              <rect x="772" y="252" width="38" height="12" rx={3} />
              <rect x="390" y="632" width="38" height="14" rx={3} />
              <rect x="772" y="632" width="38" height="14" rx={3} />
            </g>
            {WRAP_COLS.map((cx) =>
              Array.from({ length: 14 }, (_, j) => (
                <circle key={`${cx}-${j}`} cx={cx + Math.sin(j * 0.9) * 7} cy={290 + j * 24} r={5.5} fill={j % 2 ? "#ff9a3c" : "#ffc24d"} />
              ))
            )}
          </g>

          {/* fairy-light strings */}
          <g>
            {stringBulbs.map((s) => (
              <g key={s.x}>
                <line x1={s.x} y1={300} x2={s.x} y2={300 + s.len} stroke="#e0c385" strokeWidth={1} />
                {s.bulbs.map((b, i) => (
                  <circle key={i} cx={b.x} cy={b.y} r={3.6} fill={b.warm ? "#ff9a3c" : "#ffc24d"} />
                ))}
              </g>
            ))}
          </g>

          {/* altar candle */}
          <ellipse className="glow" cx="600" cy="560" rx="120" ry="64" fill="url(#cglow)" />
          <rect x="560" y="574" width="80" height="24" rx={3} fill="#7a3a2a" />
          <rect x="560" y="574" width="80" height="4" fill="#e0c385" />
          <g className="candle">
            <path
              className="fl"
              style={{ "--fd": "1.3s", "--dl": "0s" } as React.CSSProperties}
              d="M600 504c-16 22-22 38-8 56 5 6 11 6 16 0 14-18 8-34-8-56z"
              fill="url(#flame)"
            />
            <path
              className="fl"
              style={{ "--fd": "1.1s", "--dl": ".2s" } as React.CSSProperties}
              d="M600 530c-7 10-10 18-4 26 2 3 6 3 8 0 6-8 3-16-4-26z"
              fill="#fffbe2"
            />
          </g>
          <g>
            <rect x="470" y="556" width="56" height="36" rx={8} fill="#8a4530" />
            <rect x="474" y="530" width="48" height="34" rx={14} fill="#b86a45" />
            <rect x="674" y="556" width="56" height="36" rx={8} fill="#8a4530" />
            <rect x="678" y="530" width="48" height="34" rx={14} fill="#b86a45" />
            <path d="M470 556h56M674 556h56" stroke="#e0c385" strokeWidth={2} />
          </g>

          {/* the candle sea */}
          <g>
            {ALL_CANDLES.map((c, i) => (
              <g key={i} className="candle">
                <circle
                  className="glow"
                  cx={c.x}
                  cy={c.y - 14 * c.s}
                  r={26 * c.s}
                  fill="url(#cglow)"
                  style={{ animationDelay: `${((i * 0.37) % 3).toFixed(2)}s` }}
                />
                <rect x={c.x - 2.6 * c.s} y={c.y - 10 * c.s} width={5.2 * c.s} height={12 * c.s} rx={1.2} fill="#fff1d4" />
                <path
                  className="fl"
                  style={{ "--fd": `${(1.2 + ((i * 0.13) % 1)).toFixed(2)}s`, "--dl": `${(-((i * 0.29) % 2)).toFixed(2)}s` } as React.CSSProperties}
                  d={candleFlame(c.x, c.y, c.s)}
                  fill="url(#flame)"
                />
              </g>
            ))}
          </g>
        </g>

        {/* drifting motes */}
        <g>
          {MOTES.map((m, i) => (
            <circle
              key={i}
              className="mote"
              style={{ "--mt": `${m.mt}s`, "--ml": `${m.ml}s`, "--mx": m.mx } as React.CSSProperties}
              cx={m.cx}
              cy={m.cy}
              r={m.r}
              fill="#ffd98a"
            />
          ))}
        </g>

        <rect x="-1200" y="-400" width="3600" height="1600" fill="url(#vig)" />
      </svg>

      <div className="finale-text">
        <p className="label">{overline}</p>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
        {actions && <div className="finale-actions">{actions}</div>}
      </div>

      {credit && <div className="finale-credit">{credit}</div>}
    </footer>
  );
}
