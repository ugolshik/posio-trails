# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # tsc type-check + vite build → dist/
npm run preview  # serve the dist/ build locally
```

There is no test suite. Type-check only: `npx tsc --noEmit`.

## Architecture

**Stack:** React 19 + Vite 6, react-router-dom v7 (BrowserRouter), Tailwind CSS v4, i18next, Leaflet.

**Routing** — `src/App.tsx` defines all routes. All navigation uses plain `<a href>` tags (not `<Link>`) throughout every component and page. This is intentional — do not switch to `<Link>`.

**Data layer** — all content lives in two static TypeScript files:
- `src/data/trails.ts` — exports `Trail[]` and `getTrail(id)`. The `Trail` interface is the single source of truth for trail shape including `routeCoords: [number, number][]` for map polylines and optional `winterImage` for season-aware card photos.
- `src/data/rentals.ts` — exports `Rental[]`.

No API calls, no state management library.

**i18n** — 6 locales (EN/FI/SV/DE/FR/IT) in `src/i18n/locales/*.ts`. Language preference stored in `localStorage` key `posio-lang`. All user-visible strings must go through `useTranslation()` / `t()`. When adding a new key, add it to all 6 locale files. The `en.ts` locale is the reference.

**Map** — `TrailMap` component lazy-imports Leaflet inside `useEffect` to avoid SSR issues. It draws a `L.polyline` per trail using `trail.routeCoords`, plus a small circle `divIcon` at `trail.startPoint.coords`. Accepts `fitBounds` prop to auto-zoom to route bounds (used on detail pages). Leaflet CSS is imported globally in `styles.css`.

**Season-aware images** — `TrailCard` accepts `showWinter?: boolean`; when true it renders `trail.winterImage` instead of `trail.image`. `TrailsPage` passes `showWinter={season === "winter"}`. Winter images live in `src/assets/trail-*-winter.jpg`.

**Season filter logic** — "Summer" shows `season: "summer" | "all_year"` trails; "Winter" shows `season: "winter" | "all_year"`; "Year-round" shows only `season: "all_year"`. Implemented in `TrailsPage` `useMemo` filter.

**Styling** — Tailwind v4 with `@import "tailwindcss" source(none)` + `@source "../src"` in `styles.css`. Custom design tokens (colors, shadows, radius) are defined as CSS variables in `:root` and `.dark` blocks in `styles.css` — not in a config file. The palette is a cool Nordic teal (`--primary: oklch(0.52 0.09 215)`). Path alias `@/` maps to `src/`.
