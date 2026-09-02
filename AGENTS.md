# Repository Guide

## Setup and Commands

- Use npm and the committed `package-lock.json`; install reproducibly with `npm ci`.
- The installed Vite/ESLint toolchain requires Node `^20.19.0 || ^22.13.0 || >=24`.
- Start development with `npm run dev`; use `npm run preview` only after `npm run build`.
- Verify changes with `npm run lint` and `npm run build`. The build runs `tsc -b` before Vite bundles.
- For focused checks, run `npx eslint path/to/file.tsx`; `npx tsc -b` is the typecheck-only command.
- There is no test runner, formatter, CI workflow, or corresponding npm script yet.

## Application Shape

- **The product is the app, not the sensor.** Flory is a plant-care app; the sensor is an optional add-on arriving in December and only appears in the secondary `SensorTeaser` section. Do not write copy that makes the sensor a requirement.
- The site is a lead-validation funnel, not a shop: `Landing → /quiero-flory → /gracias`. Nothing is charged, and there is no cart or checkout. Even the paid plans end in a waiting list.
- **Honesty rules for copy.** Only describe what the app does today. Push notifications, weather, and payment methods (Apple/Google/RevenueCat) are not implemented, so they must not be mentioned. Pro gets *more usage capacity* of the AI features, never a smarter model.
- Plans are `FREE`, `PLUS` and `PRO`. Only `FREE` is commercially active; `PLUS` and `PRO` render a "Próximamente" badge and their CTA just collects an email. `Founding` is **not** a plan: it is a launch-period condition and must stay in its own callout, never as a fourth card.
- `src/main.tsx` mounts `BrowserRouter` inside `I18nProvider` and calls `captureAttribution()` before the first render. `src/App.tsx` only declares routes; `ScrollRestoration.tsx` handles scroll on navigation, including `/#section` hashes.
- Pages live in `src/pages/`. `Landing.tsx` composes the sections in order: `Navbar`, `Hero`, `ComoFunciona`, `Funciones`, `LaApp`, `Precios`, `SensorTeaser`, `Dudas`, `CtaFinal`, `Footer`. A new section only renders once it is added there.
- SPA fallback is configured in `public/_redirects` (Netlify) and `vercel.json`. Without one of those, `/quiero-flory` returns 404 on deploy.
- `src/lib/` holds the non-visual layer: `pricing.ts` (single source of plans and prices), `leads.ts` + `supabase.ts` (lead normalization and direct Supabase Data API insertion), `attribution.ts` (first-touch UTMs in sessionStorage) and `analytics.ts` (single `track()` seam, currently console-only in dev).
- Supabase requires `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` at build time; copy `.env.example` locally and configure both values in Cloudflare Pages for production/preview. Never expose a secret or `service_role` key. The schema lives in `supabase/migrations/`: `20260818000000_create_leads.sql` creates the table and `20260827000000_update_leads_for_app_plans.sql` migrates it from device plans to app plans. Both must be applied or lead inserts fail with a 400.
- Every primary CTA must use `components/CtaLoQuiero.tsx`. Free CTAs open `@somosflory` on Instagram; Plus and Pro enter the waiting-list funnel. A raw link skips the event and stops being measurable. Pass `plan` so the component chooses the right destination.
- `src/components/icons.tsx` holds every inline SVG icon and the wordmark; there is no icon dependency. `Reveal.tsx` is the shared IntersectionObserver scroll-in wrapper, and `PhoneFrame.tsx` is the CSS phone bezel used for every app screenshot.
- `src/i18n.tsx` is the only copy source for Spanish, English, and Brazilian Portuguese. Spanish is the fallback. The three languages must keep identical key structure and array lengths, or `copy` stops being iterable. Prices are **not** here: they come from `lib/pricing.ts`, which is why the two price rows of the comparison table are built in `Precios.tsx` instead of in the copy. Pages set their own `<title>` through `usePageMeta`, not the provider.
- Sections alternate cream and white, with `LaApp` on forest. Each transition is an inline `<svg preserveAspectRatio="none">` wave pinned to the section edge. Changing a section's background means updating the neighbouring wave `fill`. `SensorTeaser` deliberately has no bottom wave: it is cream and flows into `Dudas`, which is also cream.
- Spanish copy uses a Chilean voice, Portuguese is Brazilian, and prices remain CLP in every language.
- Product imagery is grouped under `src/assets/mascot/`, `photos/` and `mockups-free/`; check there before adding new assets. The screenshots are phone captures rescaled to 840 px wide (they render at 280 px CSS at most), so keep new ones at that width. `LaApp` renders only the selected screenshot and everything except the hero image is lazy-loaded.

## Toolchain Details

- Tailwind CSS v4 is enabled through `@tailwindcss/vite` in `vite.config.ts` and `@import "tailwindcss"` in `src/index.css`; there is intentionally no Tailwind or PostCSS config file.
- Brand colours, fonts (`Fredoka` display, `Nunito` body, loaded from Google Fonts in `index.html`) and keyframes live in the `@theme` block of `src/index.css`. Add design tokens there instead of hardcoding hex values in components.
- TypeScript uses project references and strict build-time checks including unused locals/parameters and `erasableSyntaxOnly`; code that Vite serves in development can still fail `npm run build`.
- ESLint applies only to `*.ts` and `*.tsx` files and ignores `dist`; it is not type-aware.
