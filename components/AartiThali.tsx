"use client";
import { useEffect, useRef, useState } from "react";

const GOAL = 7;

/** Virtual aarti: move your finger/mouse in circles over the thali and the lamp leaves trails of light. */
export default function AartiThali() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [circles, setCircles] = useState(0);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const canvas = ref.current!, ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2); w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);

    const lamp = { x: 0, y: 0 }, target = { x: 0, y: 0 };
    let inited = false, active = false, idleAt = 0, angle = 0, lastA = 0, turns = 0, count = 0, burst = 0;
    const trail: { x: number; y: number; life: number }[] = [];

    const set = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect(); target.x = e.clientX - b.left; target.y = e.clientY - b.top;
      active = true; idleAt = performance.now(); setTouched(true);
    };
    const leave = () => { idleAt = performance.now(); };
    canvas.addEventListener("pointermove", set); canvas.addEventListener("pointerdown", set);
    canvas.addEventListener("pointerleave", leave);

    let raf = 0, t = 0, visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(canvas);

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      t += 0.016;
      const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.36;
      if (!inited) { lamp.x = target.x = cx + R * 0.6; lamp.y = target.y = cy; inited = true; }
      // idle: lamp circles on its own like a priest's aarti
      if (!reduce && (!active || performance.now() - idleAt > 2500)) {
        active = false; target.x = cx + Math.cos(t * 1.4) * R * 0.62; target.y = cy + Math.sin(t * 1.4) * R * 0.62;
      }
      lamp.x += (target.x - lamp.x) * 0.2; lamp.y += (target.y - lamp.y) * 0.2;
      trail.push({ x: lamp.x, y: lamp.y, life: 1 });

      // count full revolutions around the thali centre (only for real user input)
      if (active) {
        angle = Math.atan2(lamp.y - cy, lamp.x - cx);
        let d = angle - lastA; if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2;
        if (Math.hypot(lamp.x - cx, lamp.y - cy) > R * 0.25) turns += d;
        lastA = angle;
        if (Math.abs(turns) >= Math.PI * 2) { turns = 0; count++; setCircles(count); burst = count === GOAL ? 1 : burst; }
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
      // thali (plate)
      const g = ctx.createRadialGradient(cx, cy - R * 0.2, R * 0.1, cx, cy, R * 1.12);
      g.addColorStop(0, "#f3c868"); g.addColorStop(0.7, "#c98a1e"); g.addColorStop(1, "#8d5a0e");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 1.12, 0, 7); ctx.fill();
      ctx.strokeStyle = "rgba(255,240,180,.55)"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.02, 0, 7); ctx.stroke();
      ctx.setLineDash([3, 9]); ctx.beginPath(); ctx.arc(cx, cy, R * 0.9, 0, 7); ctx.stroke(); ctx.setLineDash([]);
      // petals scattered on plate
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * 7 + 0.3, r = R * 0.74;
        ctx.save(); ctx.translate(cx + Math.cos(a) * r, cy + Math.sin(a) * r); ctx.rotate(a);
        ctx.fillStyle = i % 2 ? "#d9573f" : "#e8761f"; ctx.beginPath(); ctx.ellipse(0, 0, 9, 4.5, 0, 0, 7); ctx.fill(); ctx.restore();
      }
      // light trails
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      for (let i = trail.length - 1; i > 0; i--) {
        const p = trail[i], q = trail[i - 1];
        p.life -= 0.022;
        if (p.life <= 0) { trail.splice(0, i); break; }
        ctx.strokeStyle = `rgba(255,${150 + p.life * 90 | 0},60,${p.life * 0.8})`;
        ctx.lineWidth = 2 + p.life * 9;
        ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.lineTo(p.x, p.y); ctx.stroke();
      }
      // lamp flame
      const fl = 14 + Math.sin(t * 18) * 2;
      const fg = ctx.createRadialGradient(lamp.x, lamp.y, 0, lamp.x, lamp.y, fl * 3);
      fg.addColorStop(0, "rgba(255,245,190,1)"); fg.addColorStop(0.25, "rgba(255,190,70,.9)"); fg.addColorStop(1, "rgba(232,100,40,0)");
      ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(lamp.x, lamp.y, fl * 3, 0, 7); ctx.fill();
      if (burst > 0) {
        const rr = (1 - burst) * R * 2;
        ctx.strokeStyle = `rgba(255,220,120,${burst})`; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.stroke();
        burst -= 0.015; if (burst < 0) burst = 0;
      }
      ctx.globalCompositeOperation = "source-over";
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      canvas.removeEventListener("pointermove", set); canvas.removeEventListener("pointerdown", set); canvas.removeEventListener("pointerleave", leave); };
  }, []);

  const done = circles >= GOAL;
  return (
    <div className="thali">
      <canvas ref={ref} className="thali__canvas" role="img" aria-label="Virtual aarti. Move your pointer in circles over the thali to wave the lamp." />
      <p className="thali__count" aria-live="polite">
        {done ? <span className="hi">॥ आरती स्वीकार हुई ॥</span> : touched ? `Circles: ${circles} / ${GOAL}` : "Move over the thali to wave the lamp"}
      </p>
    </div>
  );
}
