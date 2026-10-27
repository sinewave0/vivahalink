/**
 * BrassLamp — a hand-hung temple lamp, drawn in hairlines and one warm
 * glow. The CSS `.lamp` wrapper gives it the slow evening sway.
 */
export default function BrassLamp({
  className = "lamp",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={className} style={style} aria-hidden="true">
      <svg viewBox="0 0 46 132" fill="none">
        <path d="M23 0v34" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
        <circle cx="23" cy="36" r="2.1" stroke="currentColor" strokeWidth="0.8" />
        <path d="M13 44h20" stroke="currentColor" strokeWidth="0.9" />
        <path
          d="M10 56c0-7.2 5.8-13 11-13h4c5.2 0 11 5.8 11 13z"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        <path d="M14 56h18l-2.6 15H16.6z" stroke="currentColor" strokeWidth="0.9" />
        <path d="M21 74h4v7h-4z" stroke="currentColor" strokeWidth="0.9" />
        <path d="M16 84h14l-2 8H18z" stroke="currentColor" strokeWidth="0.9" />
        <circle className="glow" cx="23" cy="92" r="11" fill="currentColor" opacity="0.22" />
        <circle cx="23" cy="91" r="3.4" fill="currentColor" />
        <path d="M23 104v10" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
        <circle cx="23" cy="116" r="1.3" fill="currentColor" />
      </svg>
    </span>
  );
}
