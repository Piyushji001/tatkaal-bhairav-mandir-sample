# tatkaal-bhairav-mandir-sample

Shri Tatkaal Bhairav Mandir — website

Next.js (App Router) + TypeScript. **Frontend only — no backend, no database, no payments.**
Bookings are sent to the temple on WhatsApp with all details pre-filled.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # creates the static site in ./out
npm start          # preview ./out locally
```

## Pages

| Page | What it does |
|---|---|
| `/` | Hero, live open/closed status (India time), aarti timings with summer/winter, 3 ways to book, vehicle puja, festivals, map, photos |
| `/book` | Booking form: at the mandir / at your home / in your name → opens WhatsApp with the booking |
| `/book?puja=vehicle` | Opens the form with vehicle puja already selected (any puja id works) |
| `/vehicle-puja` | Vehicle puja explained, dakshina per vehicle type |
| `/visit` | Map, how to reach, visitor guide, timings |
| `/gallery` | Photo grid |

## Editing content — one file

Everything (phone, WhatsApp number, timings, aartis, pujas, dakshina, festivals, photos)
is in **`data/temple.ts`**. Edit and redeploy. Search that file for `TODO`.

## Adding photos

1. Put files in `public/images/` (e.g. `public/images/hero.jpg`).
2. In `data/temple.ts`, set `src: "/images/hero.jpg"` on that photo.
3. Until `src` is set, a labelled pink placeholder shows what photo is needed.

Recommended: hero & vehicle photos **portrait 4:5**, gallery mix of portrait and landscape,
at least 1600px on the long side, compressed to under ~400 KB each (use squoosh.app).

## Before going live — checklist

- [ ] `whatsapp` and `phone` in `data/temple.ts` (the booking form sends to this number!)
- [ ] All timings and aarti times confirmed (current values are examples, except the 4:00 AM opening)
- [ ] Puja list, durations and dakshina confirmed
- [ ] Temple story, festival dates, visitor-guide TODOs
- [ ] Real photos added

## Deploy (free)

- **Vercel:** push to GitHub → import the repo on vercel.com → Deploy.
- **Netlify:** run `npm run build`, then drag the `out/` folder onto app.netlify.com/drop.
- Any normal hosting: upload the contents of `out/`.

## Theme

Colours and fonts are CSS variables at the top of `app/globals.css`
(Pink City: sandstone pink, gerua red, jharokha arches).

## Interactive & motion features (added)

- **Temple-door page transition** (`app/template.tsx`) — doors swing open on every page.
- **Draggable 3D sacred sphere** (`components/SacredOrb.tsx`) — drag to spin, click for a ripple.
- **Temple bell** (`components/TempleBell.tsx`) — click to swing and ring (synthesised sound).
- **Virtual aarti thali** (`components/AartiThali.tsx`) — wave the lamp in 7 circles, light trails follow.
- **Self-drawing Sri Yantra mandala** (`components/Yantra.tsx`) — hero + aarti backgrounds.
- **Live footer diya** (`components/LiveDiya.tsx`) — tap to light; glows automatically during aarti time.
- **Gallery lightbox** (`components/Lightbox.tsx`) — zoom, swipe, arrow keys, Esc.
- **Night aarti mode** (`components/ThemeToggle.tsx`) — saved in the browser.
- **Glowing diya cursor + petal burst** (`components/Cursor.tsx`), floating petals, scroll reveal, tilt, magnetic buttons, count-up stats (`components/Ambient.tsx`).
- All motion respects `prefers-reduced-motion`. No extra npm dependencies.

Run: `npm install && npm run dev` — build static site: `npm run build` (output in `out/`).
