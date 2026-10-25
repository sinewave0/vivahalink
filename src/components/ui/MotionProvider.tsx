"use client";

import { MotionConfig } from "framer-motion";

/**
 * Shared motion context. `reducedMotion="user"` honours the OS
 * "reduce motion" preference for every Framer animation on the
 * storefront (reveals resolve without transforms for those users).
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
