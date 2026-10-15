"use client";
import { useEffect, useState } from "react";

/** Day / night toggle. Night mode = deep lac & lamp-gold, for the 4 AM and evening aarti crowd. */
export default function ThemeToggle() {
  const [night, setNight] = useState(false);
  useEffect(() => { setNight(document.documentElement.dataset.theme === "night"); }, []);
  const flip = () => {
    const next = !night; setNight(next);
    document.documentElement.dataset.theme = next ? "night" : "day";
    try { localStorage.setItem("theme", next ? "night" : "day"); } catch { /* private mode */ }
  };
  return (
    <button className="theme-btn" onClick={flip} aria-label={night ? "Switch to day mode" : "Switch to night aarti mode"} title={night ? "Day mode" : "Night aarti mode"}>
      {night ? (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M5 19l1.4-1.4M17.6 6.4L19 5" /></svg>
      ) : (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z" /></svg>
      )}
    </button>
  );
}
