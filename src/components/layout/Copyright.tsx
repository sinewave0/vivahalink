import { cacheLife } from "next/cache";

/**
 * Cached scope: `new Date()` is an unstable value under Cache Components,
 * so the year is prerendered inside a cache and refreshed occasionally
 * instead of re-reading the clock on every render.
 */
export default async function Copyright() {
  "use cache";
  cacheLife("weeks");

  return <span>© {new Date().getFullYear()} VivahaLink. All rights reserved.</span>;
}
