"use client";
import { useEffect, useRef, useState } from "react";

type V = [number, number, number];
const N = 520;

/** Draggable 3D "chakra sphere": glowing points + rotating rings. Drag to spin, click to send a ripple. */
export default function SacredOrb() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Fibonacci sphere points
    const pts: V[] = [];
    const ga = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      pts.push([Math.cos(ga * i) * r, y, Math.sin(ga * i) * r]);
    }
    // Rings (lotus petals / orbits)
    const rings = [0, 1, 2].map((k) =>
      Array.from({ length: 90 }, (_, i): V => {
        const a = (i / 90) * Math.PI * 2;
        const R = 1.28 + k * 0.14;
        return [Math.cos(a) * R, 0, Math.sin(a) * R];
      })
    );

    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let rx = 0.35, ry = 0, vx = 0, vy = reduce ? 0 : 0.004;
    let dragging = false, lx = 0, ly = 0, mx = -999, my = -999;
    const ripples: { t: number }[] = [];
    const sparks: { x: number; y: number; vx: number; vy: number; life: number }[] = [];
    let moved = 0;

    const down = (e: PointerEvent) => {
      dragging = true; moved = 0; lx = e.clientX; ly = e.clientY;
      canvas.setPointerCapture(e.pointerId); setHint(false);
    };
    const move = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      mx = e.clientX - b.left; my = e.clientY - b.top;
      if (!dragging) return;
      const dx = e.clientX - lx, dy = e.clientY - ly;
      moved += Math.abs(dx) + Math.abs(dy);
      lx = e.clientX; ly = e.clientY;
      vy = dx * 0.006; vx = dy * 0.006;
      ry += vy; rx += vx;
    };
    const up = () => {
      dragging = false;
      if (moved < 6) { // a click, not a drag: ripple + sparks
        ripples.push({ t: 0 });
        for (let i = 0; i < 26; i++) {
          const a = Math.random() * Math.PI * 2, s = 1 + Math.random() * 3;
          sparks.push({ x: w / 2, y: h / 2, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1 });
        }
      }
    };
    const leave = () => { mx = my = -999; };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);
    canvas.addEventListener("pointerleave", leave);

    const rot = (p: V): V => {
      const [x, y, z] = p;
      const cy = Math.cos(ry), sy = Math.sin(ry), cx = Math.cos(rx), sx = Math.sin(rx);
      const x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
      const y2 = y * cx - z1 * sx, z2 = y * sx + z1 * cx;
      return [x1, y2, z2];
    };

    let raf = 0, time = 0, visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(canvas);

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      time += 0.016;
      if (!dragging) {
        vx *= 0.95; vy += ((reduce ? 0 : 0.004) - vy) * 0.03;
        rx += vx; ry += vy;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.27;
      ctx.globalCompositeOperation = "lighter";

      // core glow (the diya flame)
      const pulse = 1 + Math.sin(time * 2) * 0.06;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.3 * pulse);
      g.addColorStop(0, "rgba(255,200,90,.55)");
      g.addColorStop(0.35, "rgba(232,120,60,.22)");
      g.addColorStop(1, "rgba(158,59,49,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 1.3 * pulse, 0, 7); ctx.fill();

      const ringT = ripples.length ? ripples[ripples.length - 1].t : 9;
      // sphere points
      for (const p of pts) {
        const [x, y, z] = rot(p);
        const persp = 1 / (1.9 - z * 0.5);
        const sx = cx + x * R * persp * 1.9, sy = cy + y * R * persp * 1.9;
        let a = 0.25 + (z + 1) * 0.35, s = 1 + (z + 1) * 0.9;
        const d = Math.hypot(sx - mx, sy - my);
        if (d < 70) { const k = 1 - d / 70; a += k; s += k * 3; }
        // ripple wave sweeping outward through the sphere surface
        for (const r of ripples) {
          const dist = Math.abs(Math.hypot(x, y) - r.t * 1.4);
          if (dist < 0.12) { a += 0.8; s += 2; }
        }
        ctx.fillStyle = `rgba(${232 + z * 20},${Math.round(150 + z * 60)},${Math.round(80 + z * 30)},${Math.min(a, 1)})`;
        ctx.beginPath(); ctx.arc(sx, sy, s * 0.9, 0, 7); ctx.fill();
      }
      // rings tilted
      rings.forEach((ring, k) => {
        ctx.beginPath();
        ring.forEach((p, i) => {
          const t: V = [p[0], p[1], p[2]];
          // tilt each ring then apply orb rotation
          const tilt = 0.5 + k * 0.55, c = Math.cos(tilt), s = Math.sin(tilt);
          const q: V = [t[0], t[1] * c - t[2] * s, t[1] * s + t[2] * c];
          const [x, y, z] = rot(q);
          const persp = 1 / (1.9 - z * 0.5);
          const px = cx + x * R * persp * 1.9, py = cy + y * R * persp * 1.9;
          i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
        });
        ctx.closePath();
        ctx.strokeStyle = `rgba(232,169,59,${0.28 - k * 0.05})`;
        ctx.lineWidth = 1.2; ctx.stroke();
      });
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].t += 0.018;
        if (ripples[i].t > 1.6) ripples.splice(i, 1);
      }
      void ringT;
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx; s.y += s.vy; s.vy += 0.03; s.life -= 0.014;
        if (s.life <= 0) { sparks.splice(i, 1); continue; }
        ctx.fillStyle = `rgba(255,205,100,${s.life})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, 2.2 * s.life, 0, 7); ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };
    frame();

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div className="orb">
      <canvas ref={ref} className="orb__canvas" aria-label="Interactive 3D sphere. Drag to rotate, click for a ripple." role="img" />
      <span className={`orb__hint ${hint ? "" : "is-gone"}`}>Drag to turn · Click for blessing</span>
    </div>
  );
}
