"use client";
import { useRef, useState } from "react";

/** Click the bell: it swings and plays a synthesized temple-bell tone (no audio files needed). */
export default function TempleBell() {
  const [ring, setRing] = useState(0);
  const ac = useRef<AudioContext | null>(null);

  const play = () => {
    setRing((n) => n + 1);
    try {
      const A = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ac.current ??= new A();
      const c = ac.current, t = c.currentTime;
      [523, 1046, 1568, 2093, 2637].forEach((f, i) => {
        const o = c.createOscillator(), g = c.createGain();
        o.type = "sine"; o.frequency.value = f * (1 + i * 0.002);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.22 / (i + 1), t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 3.2 - i * 0.3);
        o.connect(g).connect(c.destination); o.start(t); o.stop(t + 3.3);
      });
    } catch { /* audio not available: the swing still works */ }
  };

  return (
    <button className="bell" onClick={play} aria-label="Ring the temple bell">
      <svg key={ring} className={ring ? "bell__svg is-swing" : "bell__svg"} viewBox="0 0 120 150" width="96" height="120" aria-hidden="true">
        <path d="M60 4v22" stroke="#e8a93b" strokeWidth="5" strokeLinecap="round" />
        <path d="M60 24c-26 0-38 22-38 52 0 12-6 20-12 28h100c-6-8-12-16-12-28 0-30-12-52-38-52z" fill="url(#bg)" stroke="#7c2c24" strokeWidth="2" />
        <path d="M18 104h84v8H18z" fill="#c98a1e" />
        <circle cx="60" cy="124" r="9" fill="#e8a93b" />
        <defs><linearGradient id="bg" x1="0" x2="1"><stop offset="0" stopColor="#f6c85a" /><stop offset=".5" stopColor="#e8a93b" /><stop offset="1" stopColor="#b97a14" /></linearGradient></defs>
      </svg>
      <span>Ring the bell</span>
    </button>
  );
}
