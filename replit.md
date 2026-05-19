# Akon Homes

A premium luxury real estate developer website for Akon Homes — a bespoke residential and mixed-use development company operating across Nigeria, the UK, and beyond.

## Run & Operate

- `pnpm --filter @workspace/akon-homes run dev` — run the frontend (port auto-assigned)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Wouter (routing), Framer Motion (animations)
- Styling: Tailwind CSS v4, Playfair Display + Inter (Google Fonts)
- UI: shadcn/ui components, Radix UI, Lucide React icons
- Forms: react-hook-form + zod validation
- Carousel: embla-carousel-react

## Where things live

- `artifacts/akon-homes/src/pages/` — All page components (Home, Developments, DevelopmentDetail, About, Blog, BlogDetail, Contact, 404)
- `artifacts/akon-homes/src/components/layout/` — Navbar, Footer
- `artifacts/akon-homes/src/components/` — Reusable components (PropertyCard, BlogCard, TestimonialCard, AnimatedCounter, SectionTitle, CTASection, GallerySlider, InquiryForm, Timeline)
- `artifacts/akon-homes/src/data/` — Dummy data (properties, blog, testimonials, stats)
- `artifacts/akon-homes/src/index.css` — Theme variables + Google Fonts import

## Design System

- Primary Background: `#0F1720` (HSL: 212 36% 9%)
- Secondary Background: `#161F2C` (HSL: 215 33% 13%)
- Accent Bronze: `#C8A46B` — primary colour
- Hover Bronze: `#D6B37A` — accent colour
- Warm White: `#F5F1EA` — foreground
- Muted Text: `#A8B0BC`
- Soft Border: `rgba(255,255,255,0.08)`
- Fonts: Playfair Display (headings), Inter (body)

## Pages

- `/` — Home with cinematic hero, animated counters, featured developments, testimonials, CTA
- `/developments` — Full grid with status + type filters
- `/developments/:id` — Gallery slider, specs, features, inquiry form, related
- `/about` — Brand story, stats, timeline, leadership team
- `/blog` — Editorial grid with category filter and featured post
- `/blog/:slug` — Full article with related posts
- `/contact` — Inquiry form + three office locations (Lagos, Abuja, London)
- Custom 404 page

## User preferences

- Dark-only site — no light/dark toggle
- No emojis in UI
- Framer Motion for all animations (fade-up, staggered grids, count-up counters)
- Large section padding (py-24, py-32), max-w-7xl containers

## Architecture decisions

- Frontend-only (no backend needed) — all data is static dummy data in `src/data/`
- Wouter used for lightweight SPA routing with dynamic params (`useParams`)
- CSS variables follow space-separated HSL format (Tailwind v4 convention)
- Google Fonts `@import url()` must be the VERY FIRST line in index.css
- Framer Motion `useInView` drives all scroll-triggered animations

## Gotchas

- Google Fonts @import must come before `@import "tailwindcss"` in index.css
- Do not run `pnpm dev` at workspace root — use workflow or filter flag
- All CSS vars use space-separated HSL (no `hsl()` wrapper) — this is Tailwind v4 convention
