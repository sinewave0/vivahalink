"use client";

import { useEffect, useState } from "react";
import { getCountdown } from "@/lib/utils";
import Ornament from "./Ornament";

interface CountdownTimerProps {
  targetDate: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Live ticking countdown to the wedding date.
 * Gracefully switches to a celebration message once the day arrives.
 */
export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [countdown, setCountdown] = useState(() => getCountdown(targetDate));

  useEffect(() => {
    const timer = setInterval(() => setCountdown(getCountdown(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (countdown.isOver) {
    return (
      <div className="inline-flex flex-col items-center gap-2 rounded-2xl border border-gold-500/40 bg-gold-500/10 px-6 py-4">
        <span className="text-2xl">🎉</span>
        <p className="font-serif text-lg text-gold-200">The celebration has begun!</p>
        <p className="text-xs text-ivory-300/80">Welcome, and thank you for your blessings.</p>
      </div>
    );
  }

  const units: { label: string; value: string }[] = [
    { label: "Days", value: pad(countdown.days) },
    { label: "Hours", value: pad(countdown.hours) },
    { label: "Minutes", value: pad(countdown.minutes) },
    { label: "Seconds", value: pad(countdown.seconds) },
  ];

  return (
    <div className="flex flex-col items-center">
      <Ornament tone="#e5c02a" className="mb-4" />
      <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-ivory-300/80">
        Counting down to the big day
      </p>
      <div className="flex items-start gap-2 sm:gap-3">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-start gap-2 sm:gap-3">
            <div className="flex w-14 flex-col items-center rounded-xl border border-gold-500/30 bg-maroon-900/60 px-2 py-3 backdrop-blur-sm sm:w-16 sm:py-4">
              <span className="font-serif text-2xl sm:text-3xl font-semibold text-gold-300 tabular-nums">
                {unit.value}
              </span>
              <span className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-ivory-300/75">
                {unit.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="mt-3 font-serif text-xl text-gold-500/60 select-none">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
