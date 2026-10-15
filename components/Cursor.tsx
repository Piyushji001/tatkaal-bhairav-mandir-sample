"use client";
import { useEffect, useRef } from "react";

/** Soft glowing diya that trails the mouse (desktop only); grows on links, bursts petals on click. */
export default function Cursor() {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = el.current!; let x = -100, y = -100, tx = x, ty = y, raf = 0, shown = false;
    const mv = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      if (!shown) { shown = true; x = tx; y = ty; c.classList.add("on"); }
      c.classList.toggle("hot", !!(e.target as HTMLElement).closest?.("a, button, .orb__canvas, .thali__canvas, .gallery figure, .gallery-strip figure, input, select, textarea, label"));
    };
    const out = () => { shown = false; c.classList.remove("on"); };
    const click = (e: PointerEvent) => {
      for (let i = 0; i < 8; i++) {
        const p = document.createElement("i"); p.className = "cursor-petal";
        const a = (i / 8) * Math.PI * 2, d = 40 + Math.random() * 30;
        p.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px;--r:${Math.random() * 360}deg`;
        document.body.appendChild(p); setTimeout(() => p.remove(), 800);
      }
    };
    const loop = () => { raf = requestAnimationFrame(loop); x += (tx - x) * 0.18; y += (ty - y) * 0.18; c.style.transform = `translate(${x}px, ${y}px)`; };
    loop();
    addEventListener("pointermove", mv); addEventListener("pointerdown", click); document.documentElement.addEventListener("mouseleave", out);
    return () => { cancelAnimationFrame(raf); removeEventListener("pointermove", mv); removeEventListener("pointerdown", click); document.documentElement.removeEventListener("mouseleave", out); };
  }, []);
  return <div ref={el} className="cursor" aria-hidden="true"><span /></div>;
}
