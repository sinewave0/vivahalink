/**
 * Small decorative gold divider used across the invitation microsite.
 * Pure presentational — safe in both server and client components.
 */
export default function Ornament({
  className = "",
  tone = "#e5c02a",
}: {
  className?: string;
  tone?: string;
}) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span
        className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent"
        style={{ backgroundImage: `linear-gradient(to right, transparent, ${tone})` }}
      />
      <span className="text-lg leading-none" style={{ color: tone }}>
        ❁
      </span>
      <span
        className="h-px w-12 sm:w-16"
        style={{ backgroundImage: `linear-gradient(to left, transparent, ${tone})` }}
      />
    </div>
  );
}
