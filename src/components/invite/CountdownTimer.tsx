"use client";

import { useEffect, useState } from "react";
import { getCountdown } from "@/lib/utils";
import Ornament from "./Ornament";

interface CountdownTimerProps {
  targetDate: string;
  accent?: string;
  panel?: string;
  lightText?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Live ticking countdown to the wedding date.
 * Gracefully switches to a celebration message once the day arrives.
 */
export default function CountdownTimer({
  targetDate,
  accent = "#e5c02a",
  panel = "#5c1129",
  lightText = "#fdfaf4",
}: CountdownTimerProps) {
  const [countdown, setCountdown] = useState(() => getCountdown(targetDate));

  useEffect(() => {
    const timer = setInterval(() => setCountdown(getCountdown(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (countdown.isOver) {
    return (
      <div
        className="inline-flex flex-col items-center gap-2 rounded-2xl border px-6 py-4"
        style={{ borderColor: `${accent}66`, backgroundColor: `${accent}1a` }}
      >
        <span className="text-2xl">🎉</span>
        <p className="font-serif text-lg" style={{ color: accent }}>The celebration has begun!</p>
        <p className="text-xs" style={{ color: `${lightText}cc` }}>Welcome, and thank you for your blessings.</p>
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
      <Ornament tone={accent} className="mb-4" />
      <p className="mb-4 text-[11px] uppercase tracking-[0.3em]" style={{ color: `${lightText}cc` }}>
        Counting down to the big day
      </p>
      <div className="flex items-start gap-2 sm:gap-3">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-start gap-2 sm:gap-3">
            <div
              className="flex w-14 flex-col items-center rounded-xl border px-2 py-3 backdrop-blur-sm sm:w-16 sm:py-4"
              style={{ borderColor: `${accent}4d`, backgroundColor: `${panel}cc` }}
            >
              <span className="font-serif text-2xl sm:text-3xl font-semibold tabular-nums" style={{ color: accent }}>
                {unit.value}
              </span>
              <span className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-[0.18em]" style={{ color: `${lightText}bf` }}>
                {unit.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="mt-3 font-serif text-xl select-none" style={{ color: `${accent}99` }}>:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
