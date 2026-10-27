/**
 * BrandMark — the house monogram: a temple arch drawn in one hairline,
 * the V held inside it, and a single dot for the flame.
 *
 * Colour comes from `currentColor`, so it re-tints for daylight, dusk
 * and the brass cover without a second asset.
 */
export default function BrandMark({
  className = "brandmark",
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 44 48"
      fill="none"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M3.5 45V22.2C3.5 11.3 11.9 3.5 22 3.5s18.5 7.8 18.5 18.7V45"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.5"
      />
      <path
        d="M8.5 45V22.5C8.5 14.3 14.6 8.4 22 8.4s13.5 5.9 13.5 14.1V45"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.32"
      />
      <path
        d="M15.4 17.2 22 31.4l6.6-14.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12.5 39.5h19" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
      <circle cx="22" cy="43" r="1.35" fill="currentColor" />
    </svg>
  );
}
