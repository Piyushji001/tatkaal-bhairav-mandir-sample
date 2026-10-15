"use client";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type Item = { src: string; alt: string };
const SEL = ".gallery figure, .gallery-strip figure";

/** Click any gallery photo: zooms open full screen. Arrow keys / swipe / buttons to browse, Esc to close. */
export default function Lightbox() {
  const [state, setState] = useState<{ items: Item[]; i: number; from: DOMRect } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const path = usePathname();

  const open = useCallback((fig: HTMLElement) => {
    const img = fig.querySelector("img"); if (!img) return;
    const wrap = fig.parentElement!;
    const imgs = [...wrap.querySelectorAll<HTMLImageElement>("figure img")];
    lastFocus.current = fig;
    setState({ items: imgs.map((m) => ({ src: m.currentSrc || m.src, alt: m.alt })), i: Math.max(0, imgs.indexOf(img)), from: img.getBoundingClientRect() });
  }, []);

  // make photos keyboard-reachable + open on click / Enter
  useEffect(() => {
    const figs = [...document.querySelectorAll<HTMLElement>(SEL)].filter((f) => f.querySelector("img"));
    figs.forEach((f) => { f.tabIndex = 0; f.setAttribute("role", "button"); f.setAttribute("aria-label", `Open photo: ${f.querySelector("img")!.alt}`); });
    const click = (e: MouseEvent) => { const f = (e.target as HTMLElement).closest<HTMLElement>(SEL); if (f?.querySelector("img")) open(f); };
    const key = (e: KeyboardEvent) => { if (e.key !== "Enter" && e.key !== " ") return; const f = (e.target as HTMLElement).closest<HTMLElement>(SEL); if (f?.querySelector("img")) { e.preventDefault(); open(f); } };
    document.addEventListener("click", click); document.addEventListener("keydown", key);
    return () => { document.removeEventListener("click", click); document.removeEventListener("keydown", key); };
  }, [path, open]);

  const close = useCallback(() => { setState(null); lastFocus.current?.focus(); }, []);
  const go = useCallback((d: number) => setState((s) => s && { ...s, i: (s.i + d + s.items.length) % s.items.length }), []);

  const isOpen = state !== null;
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden"; closeRef.current?.focus();
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") close(); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    addEventListener("keydown", key);
    return () => { document.body.style.overflow = ""; removeEventListener("keydown", key); };
  }, [isOpen, close, go]);

  const sx = useRef(0);
  if (!state) return null;
  const { items, i, from } = state, it = items[i];
  const dx = from.left + from.width / 2 - innerWidth / 2, dy = from.top + from.height / 2 - innerHeight / 2;
  const sc = Math.max(0.15, Math.min(1, from.width / Math.min(innerWidth * 0.9, 900)));

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label="Photo viewer"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      onPointerDown={(e) => { sx.current = e.clientX; }}
      onPointerUp={(e) => { const d = e.clientX - sx.current; if (Math.abs(d) > 60) go(d < 0 ? 1 : -1); }}>
      <button ref={closeRef} className="lb__btn lb__close" onClick={close} aria-label="Close">✕</button>
      {items.length > 1 && <button className="lb__btn lb__prev" onClick={() => go(-1)} aria-label="Previous photo">‹</button>}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img key={it.src} className="lb__img" src={it.src} alt={it.alt} style={{ ["--dx" as string]: `${dx}px`, ["--dy" as string]: `${dy}px`, ["--sc" as string]: sc }} draggable={false} />
      {items.length > 1 && <button className="lb__btn lb__next" onClick={() => go(1)} aria-label="Next photo">›</button>}
      <p className="lb__cap">{it.alt} <span>{i + 1} / {items.length}</span></p>
    </div>
  );
}
