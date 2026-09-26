"use client";
import { useEffect, useState } from "react";
import { seasons } from "@/data/temple";
import { currentSeason, fmt, nextAarti, nowInIndia, templeStatus, type Status } from "@/lib/utils";

export function OpenStatus() {
  const [status, setStatus] = useState<Status | null>(null);
  useEffect(() => {
    const tick = () => {
      const { month, minutes } = nowInIndia();
      setStatus(templeStatus(currentSeason(month), minutes));
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  if (!status) return <span className="status">Opens daily at 4:00 AM</span>;
  return (
    <span className={status.open ? "status status--open" : "status"}>
      <span className="status__dot" aria-hidden="true" />
      {status.text}
    </span>
  );
}

export function TimingsTable() {
  const [idx, setIdx] = useState(0);
  const [minutes, setMinutes] = useState<number | null>(null);

  useEffect(() => {
    const { month, minutes } = nowInIndia();
    setIdx(Math.max(0, seasons.indexOf(currentSeason(month))));
    setMinutes(minutes);
  }, []);

  const season = seasons[idx];
  const upcoming = minutes !== null ? nextAarti(season, minutes) : null;

  return (
    <div className="timings">
      <div className="season-tabs" role="tablist" aria-label="Season">
        {seasons.map((s, i) => (
          <button key={s.label} role="tab" aria-selected={i === idx} className={i === idx ? "is-active" : ""} onClick={() => setIdx(i)}>
            {s.label}
          </button>
        ))}
      </div>
      <dl className="timings__hours">
        <div><dt>Temple opens</dt><dd>{fmt(season.open)}</dd></div>
        {season.breakFrom && season.breakTo && (
          <div><dt>Afternoon break</dt><dd>{fmt(season.breakFrom)} to {fmt(season.breakTo)}</dd></div>
        )}
        <div><dt>Temple closes</dt><dd>{fmt(season.close)}</dd></div>
      </dl>
      <ol className="aarti-list">
        {season.aartis.map((a) => (
          <li key={a.name} className={upcoming?.name === a.name ? "is-next" : ""}>
            <span className="aarti-list__time">{fmt(a.time)}</span>
            <span className="aarti-list__name">{a.name} <span className="hi">{a.hi}</span></span>
            {upcoming?.name === a.name && <span className="aarti-list__tag">Next</span>}
          </li>
        ))}
      </ol>
      <p className="note">Timings change on festival days.</p>
    </div>
  );
}
