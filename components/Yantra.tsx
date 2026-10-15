/** Sri-Yantra-inspired mandala drawn in pure SVG. Strokes draw themselves in (CSS), no JS. */
const tri = (s: number, cy: number, up: boolean) => {
  const k = up ? -1 : 1;
  const p = [[0, k * s + cy], [s * 0.866, -k * s * 0.5 + cy], [-s * 0.866, -k * s * 0.5 + cy]];
  return `M${p[0][0].toFixed(2)} ${p[0][1].toFixed(2)}L${p[1][0].toFixed(2)} ${p[1][1].toFixed(2)}L${p[2][0].toFixed(2)} ${p[2][1].toFixed(2)}Z`;
};

const petals = (n: number, r1: number, r2: number, spread: number, offset = 0) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + offset, d = spread;
    const pt = (r: number, ang: number) => `${(Math.cos(ang) * r).toFixed(2)} ${(Math.sin(ang) * r).toFixed(2)}`;
    const mid = (r: number, ang: number) => `${(Math.cos(ang) * r).toFixed(2)} ${(Math.sin(ang) * r).toFixed(2)}`;
    return `M${pt(r1, a - d)}Q${mid((r1 + r2) / 2 + 3, a - d * 1.1)} ${pt(r2, a)}Q${mid((r1 + r2) / 2 + 3, a + d * 1.1)} ${pt(r1, a + d)}`;
  });

export default function Yantra({ className = "" }: { className?: string }) {
  const paths: string[] = [
    ...petals(16, 70, 90, Math.PI / 16 * 0.95),
    ...petals(8, 52, 68, Math.PI / 8 * 0.9, Math.PI / 8),
    ...[46, 36, 28, 20].map((s, i) => tri(s, 6 - i * 3, true)),
    ...[44, 36, 28, 20, 12].map((s, i) => tri(s, -6 + i * 3, false)),
  ];
  return (
    <svg className={`yantra ${className}`} viewBox="-100 -100 200 200" fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinejoin="round" aria-hidden="true">
      <circle r="97" pathLength={1} />
      <circle r="92.5" pathLength={1} strokeWidth="0.4" />
      <circle r="70" pathLength={1} strokeWidth="0.4" />
      <circle r="52" pathLength={1} />
      <rect x="-99" y="-99" width="198" height="198" rx="4" pathLength={1} strokeWidth="0.4" />
      {paths.map((d, i) => <path key={i} d={d} pathLength={1} style={{ ["--i" as string]: i }} />)}
      <circle r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
