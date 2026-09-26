import type { NextConfig } from "next";

// Static export: `npm run build` creates an `out/` folder of plain HTML/CSS/JS
// that can be hosted anywhere (Vercel, Netlify, GitHub Pages, cPanel) — no server needed.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
