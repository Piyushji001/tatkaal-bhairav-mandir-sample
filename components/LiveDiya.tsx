"use client";
import { useEffect, useState } from "react";
import { currentSeason, fmt, nextAarti, nowInIndia } from "@/lib/utils";

const toMin = (t: string) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };

/** Footer diya: tap to light it. It also glows by itself while an aarti is on (±20 min of aarti time). */
export default function LiveDiya() {
  const [lit, setLit] = useState(false);
  const [aartiNow, setAartiNow] = useState(false);
  const [next, setNext] = useState<string>("");

  useEffect(() => {
    const tick = () => {
      const { month, minutes } = nowInIndia();
      const s = currentSeason(month);
      setAartiNow(s.aartis.some((a) => minutes >= toMin(a.time) - 5 && minutes <= toMin(a.time) + 20));
      const n = nextAarti(s, minutes);
      setNext(n ? `Next aarti: ${n.name} at ${fmt(n.time)}` : "Next aarti: tomorrow morning");
    };
    tick(); const id = setInterval(tick, 60_000); return () => clearInterval(id);
  }, []);

  const on = lit || aartiNow;
  return (
    <div className={`livediya ${on ? "is-lit" : ""}`}>
      <button onClick={() => setLit(!lit)} aria-pressed={on} aria-label={on ? "Blow out the diya" : "Light a diya"}>
        <svg viewBox="0 0 120 110" width="120" height="110" aria-hidden="true">
          <g className="livediya__flame" transform="translate(60 60)">
            <path d="M0-42C14-22 18-8 0 6-18-8-14-22 0-42z" fill="url(#lf)" />
            <path d="M0-22C6-12 7-6 0 0-7-6-6-12 0-22z" fill="#fffbe0" />
          </g>
          <path d="M8 62h104c-3 26-22 42-52 42S11 88 8 62z" fill="#b5532a" stroke="#6e2a12" strokeWidth="2" />
          <path d="M8 62h104" stroke="#e0905a" strokeWidth="3" />
          <path d="M26 78c14 10 54 10 68 0" stroke="#e0905a" strokeWidth="2" fill="none" opacity=".6" />
          <defs><radialGradient id="lf" cx=".5" cy=".8" r=".8"><stop offset="0" stopColor="#fff3a8" /><stop offset=".5" stopColor="#ffb02e" /><stop offset="1" stopColor="#e0572b" /></radialGradient></defs>
        </svg>
      </button>
      <p className="livediya__text">
        {aartiNow ? <strong>Aarti is on now — jai Baba!</strong> : lit ? <strong>Your diya is lit</strong> : <strong>Tap to light a diya</strong>}
        <span>{next}</span>
      </p>
    </div>
  );
}
