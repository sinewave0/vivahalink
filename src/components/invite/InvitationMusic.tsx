"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import type { InvitationData } from "@/lib/types";

/**
 * Background music toggle for the invitation.
 *
 * - If `invitation.musicUrl` is set, plays that audio in a loop.
 * - Otherwise, synthesises a gentle tanpura-style drone with the Web
 *   Audio API — no audio files needed, so demos work fully offline
 *   while still honouring autoplay policies (only ever starts on the
 *   guest's own tap).
 */
export default function InvitationMusic({
  invitation,
  accent = "#b08a46",
  main = "#5a2a3d",
}: {
  invitation: InvitationData;
  accent?: string;
  main?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const builtRef = useRef(false);

  const ensureContext = () => {
    // Must run synchronously inside the user's click for iOS.
    let ctx = ctxRef.current;
    if (!ctx) {
      ctx = ctxRef.current = new AudioContext();
      // The master gain folds every oscillator into one fadable channel.
      // It must exist before the first play or the drone stays silent.
      const master = ctx.createGain();
      master.gain.value = 0.0001;
      master.connect(ctx.destination);
      masterRef.current = master;
    }
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  };

  useEffect(() => {
    // Handle <audio> source path
    const audio = audioRef.current;
    if (invitation.musicUrl && audio) {
      if (playing) audio.play().catch(() => setPlaying(false));
      else audio.pause();
      return;
    }

    // Web Audio tanpura path
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;

    if (playing) {
      // Build the drone oscillator bank once, on the first play
      if (!builtRef.current) {
        builtRef.current = true;
        const oscSpecs: Array<[number, number, OscillatorType]> = [
          [65.41, 0.06, "sine"], // C2  (the drum frame)
          [130.81, 0.10, "sine"], // C3  — Sa
          [131.0, 0.045, "sine"], // Sa, slightly detuned shimmer
          [196.0, 0.07, "triangle"], // G3 — Pa
          [392.0, 0.02, "sine"], // C5 overtone
        ];
        oscSpecs.forEach(([freq, gainNode, type]) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = type;
          osc.frequency.value = freq;
          osc.detune.value = (Math.random() - 0.5) * 6;
          gain.gain.value = gainNode;
          osc.connect(gain).connect(master);
          osc.start();
        });

        // Slow breathing LFO so the drone never feels static
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.13;
        lfoGain.gain.value = 0.015;
        lfo.connect(lfoGain).connect(master.gain);
        lfo.start();
      }
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(0.055, ctx.currentTime, 0.8);
    } else {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.35);
    }
  }, [playing, invitation.musicUrl]);

  // Tear down on unmount
  useEffect(() => {
    return () => {
      ctxRef.current?.close().catch(() => {});
      ctxRef.current = null;
    };
  }, []);

  const toggle = () => {
    if (!invitation.musicUrl) ensureContext();
    setPlaying((p) => !p);
  };

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.96 }}
      aria-pressed={playing}
      aria-label={playing ? "Pause background music" : "Play background music"}
      title={playing ? "Music on" : "Play music — soft tanpura"}
      className={`music-pill${playing ? " on" : " hint"}`}
      style={{ borderColor: accent, color: main }}
    >
      <span className="bars" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      {playing ? (
        "Music on"
      ) : (
        <span className="inline-flex items-center gap-2">
          <Volume2 size={13} />
          Play music
        </span>
      )}
      {invitation.musicUrl && <audio ref={audioRef} src={invitation.musicUrl} loop preload="none" />}
    </motion.button>
  );
}
