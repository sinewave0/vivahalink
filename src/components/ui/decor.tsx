/**
 * Decorative artwork for the "rose court" design language.
 * Everything is inline SVG so it scales crisply and ships no extra bytes.
 *
 * All loops are generated from fixed seeds/counts at module scope — the
 * markup is identical on server and client, so hydration is safe.
 */

/* ------------------------------------------------------------------ */
/* Mandala — slowly rising rose window with an optional centre glyph   */
/* ------------------------------------------------------------------ */

const MANDALA_PETALS = Array.from({ length: 16 }, (_, i) => {
  const a = i * 22.5;
  return { a, dot: i * 22.5 };
});

export function Mandala({ glyph = "ॐ" }: { glyph?: string }) {
  return (
    <svg className="mandala rv" viewBox="0 0 200 200" aria-hidden="true">
      <g className="spin" fill="none" stroke="currentColor" strokeWidth={1.1}>
        {MANDALA_PETALS.map((p) => (
          <g key={p.a} transform={`rotate(${p.a} 100 100)`}>
            <ellipse cx={100} cy={34} rx={7} ry={20} />
            <circle cx={100} cy={10} r={2.2} fill="currentColor" stroke="none" />
          </g>
        ))}
      </g>
      <circle cx={100} cy={100} r={46} fill="none" stroke="currentColor" strokeWidth={1.2} />
      <circle cx={100} cy={100} r={40} fill="none" stroke="currentColor" strokeWidth={0.6} />
      <text
        x={100}
        y={118}
        textAnchor="middle"
        fontSize={52}
        fill="#a3242f"
        style={{ fontFamily: "var(--font-deva)" }}
      >
        {glyph}
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Garland — mango leaves + marigolds hanging down one side            */
/* ------------------------------------------------------------------ */

/** One marigold: concentric petal rings around a small core. */
function Marigold({ x, y, r }: { x: number; y: number; r: number }) {
  const petals = Array.from({ length: 10 }, (_, i) => i * 36);
  return (
    <g transform={`translate(${x} ${y})`}>
      {petals.map((a) => (
        <ellipse
          key={a}
          rx={r * 0.42}
          ry={r * 0.62}
          fill="#e8993f"
          transform={`rotate(${a}) translate(0 ${-r * 0.5})`}
        />
      ))}
      <circle r={r * 0.34} fill="#c96f2d" />
      <circle r={r * 0.16} fill="#ffd58a" />
    </g>
  );
}

const GARLAND_NODES = Array.from({ length: 11 }, (_, i) => {
  const t = i / 10;
  const sway = Math.sin(t * Math.PI * 1.15) * 16;
  return { x: 18 + sway + t * 8, y: 22 + t * 200 };
});

export function Garland({ side = "l" }: { side?: "l" | "r" }) {
  return (
    <svg
      className={`art garland ${side}`}
      viewBox="0 0 110 260"
      aria-hidden="true"
      style={side === "r" ? { transform: "scaleX(-1)" } : undefined}
    >
      {/* silver thread */}
      <path
        d={GARLAND_NODES.map((n, i) => `${i === 0 ? "M" : "L"}${n.x.toFixed(1)} ${n.y.toFixed(1)}`).join(" ")}
        fill="none"
        stroke="#b08a46"
        strokeWidth={1.1}
        opacity={0.85}
      />
      {GARLAND_NODES.map((n, i) => {
        const leafSide = i % 2 === 0;
        const isFlower = i % 3 === 1;
        return (
          <g key={i}>
            <ellipse
              cx={n.x + (leafSide ? -10 : 10)}
              cy={n.y + 4}
              rx={5.4}
              ry={13}
              fill={i % 4 === 0 ? "#7f9a6d" : "#93ab7d"}
              transform={`rotate(${leafSide ? -26 : 26} ${n.x + (leafSide ? -10 : 10)} ${n.y + 4})`}
            />
            <ellipse
              cx={n.x + (leafSide ? -10 : 10)}
              cy={n.y + 12}
              rx={4.2}
              ry={10}
              fill="#a9bf9a"
              transform={`rotate(${leafSide ? -38 : 38} ${n.x + (leafSide ? -10 : 10)} ${n.y + 12})`}
            />
            {isFlower && <Marigold x={n.x} y={n.y + 24} r={11} />}
          </g>
        );
      })}
      {/* hanging tassel at the bottom */}
      <Marigold x={GARLAND_NODES[10].x} y={GARLAND_NODES[10].y + 4} r={9} />
      <path
        d={`M${GARLAND_NODES[10].x} ${(GARLAND_NODES[10].y + 12).toFixed(0)}q-7 22 0 36q7 -18 0 -36z`}
        fill="#e8b34c"
      />
      <circle cx={GARLAND_NODES[10].x} cy={GARLAND_NODES[10].y + 58} r={4} fill="#c96f2d" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Peacock strip — a procession of feather eyes along the seam          */
/* ------------------------------------------------------------------ */

const FEATHERS = Array.from({ length: 16 }, (_, i) => i);

function Feather({ x, flip, scale }: { x: number; flip: boolean; scale: number }) {
  const bars = [0, 1, 2, 3, 4];
  return (
    <g transform={`translate(${x} 60) scale(${flip ? -scale : scale} ${scale})`}>
      <path d="M0 46C26 34 38 12 42 -18" fill="none" stroke="#80566a" strokeWidth={1.1} opacity={0.6} />
      {bars.map((i) => (
        <path
          key={i}
          d={`M${2 + i * 9} ${34 - i * 12}q9 -8 6 -18`}
          fill="none"
          stroke="#93ab7d"
          strokeWidth={2.4}
          strokeLinecap="round"
          opacity={0.75}
        />
      ))}
      {/* the eye */}
      <ellipse cx={44} cy={-24} rx={13} ry={17} fill="#2b6f6b" transform="rotate(-18 44 -24)" />
      <ellipse cx={44} cy={-24} rx={9} ry={12.5} fill="#d8a24a" transform="rotate(-18 44 -24)" />
      <ellipse cx={44} cy={-24} rx={5} ry={7.5} fill="#1b1440" transform="rotate(-18 44 -24)" />
      <circle cx={44} cy={-27} r={1.8} fill="#fffaf2" />
    </g>
  );
}

export function PeacockStrip({ className = "strip" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1440 130" aria-hidden="true">
      {FEATHERS.map((i) => (
        <Feather
          key={i}
          x={i * 94 + (i % 2 ? 30 : 0)}
          flip={i % 2 === 0}
          scale={i % 2 === 0 ? 1 : 0.86}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Monogram — engraved double medallion                                */
/* ------------------------------------------------------------------ */

export function Monogram({ letter, sub }: { letter: string; sub?: string }) {
  return (
    <svg className="mono rv" viewBox="0 0 220 220" aria-hidden="true">
      <circle cx={110} cy={110} r={104} fill="none" stroke="#b08a46" strokeWidth={1.6} />
      <circle cx={110} cy={110} r={95} fill="none" stroke="#e0c385" strokeWidth={0.8} />
      {Array.from({ length: 24 }, (_, i) => i * 15).map((a) => (
        <circle key={a} cx={110} cy={12} r={1.5} fill="#b08a46" transform={`rotate(${a} 110 110)`} />
      ))}
      <text
        x={110}
        y={132}
        textAnchor="middle"
        fontSize={84}
        fill="#5a2a3d"
        style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
      >
        {letter}
      </text>
      {sub && (
        <text
          x={110}
          y={168}
          textAnchor="middle"
          fontSize={12}
          letterSpacing={6}
          fill="#b08a46"
          style={{ fontFamily: "var(--font-label)" }}
        >
          {sub}
        </text>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Divider — a small gold flourish                                     */
/* ------------------------------------------------------------------ */

export function Divider({
  tone = "var(--gold)",
  className,
  style,
}: {
  tone?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const leaves = [-1, 0, 1];
  return (
    <svg className={className} viewBox="0 0 160 26" aria-hidden="true" style={{ color: tone, ...style }}>
      <line x1={0} y1={13} x2={56} y2={13} stroke="currentColor" strokeWidth={1} opacity={0.7} />
      <line x1={104} y1={13} x2={160} y2={13} stroke="currentColor" strokeWidth={1} opacity={0.7} />
      {leaves.map((s) => (
        <ellipse key={s} cx={80 + s * 12} cy={s === 0 ? 11 : 14} rx={7.5} ry={s === 0 ? 9 : 6.5} fill="none" stroke="currentColor" strokeWidth={1.1} transform={`rotate(${s * 34} ${80 + s * 12} 12)`} />
      ))}
      <circle cx={80} cy={12} r={2.4} fill="currentColor" />
    </svg>
  );
}
