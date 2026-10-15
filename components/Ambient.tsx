"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Site-wide motion layer (all client-side, no deps):
 *  - floating marigold petals / embers that drift away from the cursor
 *  - scroll-reveal, 3D tilt on cards, magnetic buttons, count-up numbers, scroll progress, hero parallax
 */
export default function Ambient() {
  const cv = useRef<HTMLCanvasElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const path = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const cleanups: (() => void)[] = [];

    /* ---- petals ---- */
    const canvas = cv.current!, ctx = canvas.getContext("2d")!;
    let w = 0, h = 0, mx = -999, my = -999, raf = 0;
    const size = () => { w = canvas.width = innerWidth; h = canvas.height = innerHeight; };
    size(); addEventListener("resize", size);
    const mm = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; };
    addEventListener("pointermove", mm);
    const count = w < 700 ? 14 : 28;
    const mk = (init = false) => ({
      x: Math.random() * w, y: init ? Math.random() * h : h + 20,
      s: 5 + Math.random() * 9, vy: 0.3 + Math.random() * 0.7, ph: Math.random() * 6.3,
      rot: Math.random() * 6.3, vr: (Math.random() - 0.5) * 0.04, vx: 0, hue: Math.random() < 0.6 ? 0 : 1,
    });
    const ps = Array.from({ length: count }, () => mk(true));
    const loop = () => {
      raf = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.ph += 0.02;
        const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
        if (d < 120) { p.vx += (dx / d) * 0.25; p.y += (dy / d) * 0.8; }
        p.vx *= 0.95;
        p.x += p.vx + Math.sin(p.ph) * 0.5; p.y -= p.vy; p.rot += p.vr;
        if (p.y < -30) ps[i] = mk();
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.scale(1, 0.55 + Math.abs(Math.sin(p.ph)) * 0.45);
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = p.hue ? "#e8a93b" : "#d9573f";
        ctx.beginPath(); ctx.ellipse(0, 0, p.s * 0.45, p.s, 0, 0, 7); ctx.fill();
        ctx.restore();
      }
    };
    if (!reduce) loop();
    cleanups.push(() => { cancelAnimationFrame(raf); removeEventListener("resize", size); removeEventListener("pointermove", mm); });

    /* ---- scroll progress + hero parallax ---- */
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      if (!reduce) document.documentElement.style.setProperty("--sy", String(Math.min(scrollY, 900)));
    };
    onScroll(); addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => removeEventListener("scroll", onScroll));

    /* ---- scroll reveal ---- */
    const sel = ".band__head, .way, .fest li, .gallery-strip figure, .story__body, .story__quote, .vehicle__text, .vehicle__photo, .visit > *, .timings, .facts div, .step, .card";
    const els = [...document.querySelectorAll<HTMLElement>(sel)];
    if (!reduce) {
      document.documentElement.classList.add("reveal-on");
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
      els.forEach((el, i) => { el.classList.add("rv"); el.style.setProperty("--d", `${(i % 4) * 90}ms`); io.observe(el); });
      cleanups.push(() => { io.disconnect(); document.documentElement.classList.remove("reveal-on"); });
    }

    /* ---- count-up numbers ---- */
    document.querySelectorAll<HTMLElement>(".facts strong").forEach((el) => {
      const m = el.textContent?.match(/^(\d+(\.\d+)?)(.*)$/);
      if (!m || reduce) return;
      const target = parseFloat(m[1]), dec = m[2] ? 1 : 0, rest = m[3];
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return; io.disconnect();
        const t0 = performance.now();
        const step = (t: number) => {
          const k = Math.min((t - t0) / 1400, 1), v = target * (1 - Math.pow(1 - k, 3));
          el.textContent = v.toFixed(dec) + rest; if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
      io.observe(el); cleanups.push(() => io.disconnect());
    });

    /* ---- tilt + magnetic (mouse only) ---- */
    if (fine && !reduce) {
      const tilts = document.querySelectorAll<HTMLElement>(".way, .gallery-strip figure, .hero__photo");
      tilts.forEach((el) => {
        const mv = (e: PointerEvent) => {
          const b = el.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5;
          el.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateY(-4px)`;
        };
        const lv = () => { el.style.transform = ""; };
        el.addEventListener("pointermove", mv); el.addEventListener("pointerleave", lv);
        cleanups.push(() => { el.removeEventListener("pointermove", mv); el.removeEventListener("pointerleave", lv); });
      });
      document.querySelectorAll<HTMLElement>(".btn").forEach((el) => {
        const mv = (e: PointerEvent) => {
          const b = el.getBoundingClientRect();
          el.style.transform = `translate(${(e.clientX - b.left - b.width / 2) * 0.18}px, ${(e.clientY - b.top - b.height / 2) * 0.28}px)`;
        };
        const lv = () => { el.style.transform = ""; };
        el.addEventListener("pointermove", mv); el.addEventListener("pointerleave", lv);
        cleanups.push(() => { el.removeEventListener("pointermove", mv); el.removeEventListener("pointerleave", lv); });
      });
    }
    return () => cleanups.forEach((f) => f());
  }, [path]);

  return (
    <>
      <div className="progress" aria-hidden="true"><div ref={bar} /></div>
      <canvas ref={cv} className="petals" aria-hidden="true" />
    </>
  );
}
