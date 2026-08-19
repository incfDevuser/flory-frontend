# Repository Guide

## Setup and Commands

- Use npm and the committed `package-lock.json`; install reproducibly with `npm ci`.
- The installed Vite/ESLint toolchain requires Node `^20.19.0 || ^22.13.0 || >=24`.
- Start development with `npm run dev`; use `npm run preview` only after `npm run build`.
- Verify changes with `npm run lint` and `npm run build`. The build runs `tsc -b` before Vite bundles.
- For focused checks, run `npx eslint path/to/file.tsx`; `npx tsc -b` is the typecheck-only command.
- There is no test runner, formatter, CI workflow, or corresponding npm script yet.

## Application Shape

- The site is a lead-validation funnel, not a shop: `Landing → /quiero-flory → /gracias`. Nothing is charged, and there is no cart or checkout.
- `src/main.tsx` mounts `BrowserRouter` inside `I18nProvider` and calls `captureAttribution()` before the first render. `src/App.tsx` only declares routes; `ScrollRestoration.tsx` handles scroll on navigation, including `/#section` hashes.
- Pages live in `src/pages/`. `Landing.tsx` composes the sections in order: `Navbar`, `Hero`, `ComoFunciona`, `QueMide`, `LaApp`, `Precios`, `Dudas`, `CtaFinal`, `Footer`. A new section only renders once it is added there.
- SPA fallback is configured in `public/_redirects` (Netlify) and `vercel.json`. Without one of those, `/quiero-flory` returns 404 on deploy.
- `src/lib/` holds the non-visual layer: `pricing.ts` (single source of prices and the `AB_TESTING_ENABLED` switch), `leads.ts` + `supabase.ts` (lead normalization and direct Supabase Data API insertion), `attribution.ts` (first-touch UTMs in sessionStorage) and `analytics.ts` (single `track()` seam, currently console-only in dev).
- Supabase requires `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` at build time; copy `.env.example` locally and configure both values in Cloudflare Pages for production/preview. Never expose a secret or `service_role` key. The schema/RLS migration is `supabase/migrations/20260818000000_create_leads.sql`.
- Every "Lo quiero" CTA must use `components/CtaLoQuiero.tsx`. A raw link to `/quiero-flory` skips the funnel event and stops being measurable.
- `src/components/icons.tsx` holds every inline SVG icon and the wordmark; there is no icon dependency. `Reveal.tsx` is the shared IntersectionObserver scroll-in wrapper.
- `src/i18n.tsx` is the only copy source for Spanish, English, and Brazilian Portuguese. Spanish is the fallback. The three languages must keep identical key structure and array lengths, or `copy` stops being iterable. Prices are **not** here: they come from `lib/pricing.ts` because they vary per A/B variant. Pages set their own `<title>` through `usePageMeta`, not the provider.
- Sections alternate cream and white, with `LaApp` on forest. Each transition is an inline `<svg preserveAspectRatio="none">` wave pinned to the section edge. Changing a section's background means updating the neighbouring wave `fill`.
- Spanish copy uses a Chilean voice, Portuguese is Brazilian, and prices remain CLP in every language.
- Product imagery is grouped under `src/assets/mascot/`, `photos/`, `mockups-free/` and `mockups-pro/`; check there before adding new assets. `photos/sensor-in-pot-closeup.png` (~1.9 MB) and the mockups ship unoptimised, so mockups are lazy-loaded and only the active tab of `LaApp` renders.
- Known copy/asset mismatches: the mockups still label the third ring "Nutrientes" (the site says ambient humidity) and badge the paid tier "Flory Pro" (the site says "Flory Premium"). Regenerating those images is pending.

## Toolchain Details

- Tailwind CSS v4 is enabled through `@tailwindcss/vite` in `vite.config.ts` and `@import "tailwindcss"` in `src/index.css`; there is intentionally no Tailwind or PostCSS config file.
- Brand colours, fonts (`Fredoka` display, `Nunito` body, loaded from Google Fonts in `index.html`) and keyframes live in the `@theme` block of `src/index.css`. Add design tokens there instead of hardcoding hex values in components.
- TypeScript uses project references and strict build-time checks including unused locals/parameters and `erasableSyntaxOnly`; code that Vite serves in development can still fail `npm run build`.
- ESLint applies only to `*.ts` and `*.tsx` files and ignores `dist`; it is not type-aware.
