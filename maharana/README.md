# The Maharana — Heritage Luxury Hotel

A production-quality marketing website for a fictional heritage luxury hotel in
Ahmedabad, built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4,
Framer Motion and GSAP.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Structure

```
src/
  app/                 routes (App Router)
    rooms/[slug]        room detail pages
    dining/              dining listing
    experiences/[slug]   experience detail pages
    heritage/            brand story + timeline
    gallery/             filterable lightbox gallery
    contact/             enquiry form (frontend-only for now)
    booking/             availability search UI (frontend-only for now)
  components/
    layout/              Navigation, Footer
    sections/             homepage + interior page sections
    ui/                    reusable primitives (FadeIn, RevealText, ImageReveal,
                            ParallaxImage, Button, CustomCursor, Loader)
  data/                   structured content — rooms, restaurants, experiences,
                          gallery, testimonials, site constants
  lib/                    images.ts (image URL helper), motion.ts (Framer Motion
                          variant presets)
```

## Design system

All design tokens (colour, type, spacing conventions) live in
`src/app/globals.css` as CSS custom properties consumed by Tailwind's
`@theme inline` block — change a value once and it propagates everywhere.

- **Display type:** Cormorant Garamond (editorial serif headlines)
- **Body type:** Manrope (clean, restrained sans-serif)
- **Palette:** warm near-black ink, ivory parchment, muted antique brass,
  deep forest green, sandstone — see `globals.css` `:root`.
- **Signature motion:** the `ImageReveal` component (mask + 1.08→1 scale on
  scroll-into-view) is used consistently across every section as the site's
  visual signature.

## Images

Every image URL is centralised in `src/lib/images.ts` and resolved through
the `img()` helper, which points at real, licensed Unsplash photography
(architecture, interiors, dining, textiles) chosen to match the brand brief.
**When real hotel photography becomes available, only this one file needs to
change** — no JSX in any component references a raw URL directly.

`next.config.ts` allowlists `images.unsplash.com` / `plus.unsplash.com` for
`next/image` optimization. If you swap in your own photography host, add its
domain to `images.remotePatterns`.

## What's real vs. placeholder

Per the brief, no feature pretends to be more functional than it is:

- **Contact form** (`/contact`) — full client-side validation; the submit
  handler is clearly marked with a `TODO` for wiring to a real API route.
- **Booking search** (`/booking`) — filters the static room data and clearly
  labels results as a preview, since no live availability engine is
  connected yet. Structured so a real `/api/availability` route can replace
  the client-side filter without changing any markup.

## Connecting a real backend later

The data layer (`src/data/*.ts`) is deliberately shaped like database
records (`id`, `slug`, typed fields) so it can be swapped for calls to a real
API/ORM (e.g. Prisma + PostgreSQL) with minimal churn — replace the static
array exports with `async` fetch functions and add a `loading.tsx` /
`error.tsx` per route as needed.

## Accessibility & performance notes

- All interactive elements are keyboard-reachable with visible focus rings
  (`:focus-visible` in `globals.css`).
- `prefers-reduced-motion: reduce` disables/shortens all animation, including
  the GSAP horizontal scroll on the Experiences section and the custom cursor.
- The custom cursor and horizontal-scroll experience are both skipped
  entirely outside fine-pointer / desktop-width contexts.
- Animations use `transform`/`opacity` only — no layout-triggering properties.
