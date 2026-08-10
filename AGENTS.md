# Repository Guide

## Setup and Commands

- Use npm and the committed `package-lock.json`; install reproducibly with `npm ci`.
- The installed Vite/ESLint toolchain requires Node `^20.19.0 || ^22.13.0 || >=24`.
- Start development with `npm run dev`; use `npm run preview` only after `npm run build`.
- Verify changes with `npm run lint` and `npm run build`. The build runs `tsc -b` before Vite bundles.
- For focused checks, run `npx eslint path/to/file.tsx`; `npx tsc -b` is the typecheck-only command.
- There is no test runner, formatter, CI workflow, or corresponding npm script yet.

## Application Shape

- `src/main.tsx` mounts the single page from `src/App.tsx`; there is no router or backend/API layer.
- `src/App.tsx` composes the landing sections in order: `Navbar`, `Hero`, `ComoFunciona`, `QueMide`, `Precios`, `Dudas`, `CtaFinal`, `Footer`. A new section only renders once it is added there.
- `src/components/icons.tsx` holds every inline SVG icon and the wordmark; there is no icon dependency. `Reveal.tsx` is the shared IntersectionObserver scroll-in wrapper.
- `src/i18n.tsx` is the only copy source for English, Spanish, and Brazilian Portuguese. English is the fallback; the provider persists `flory-language` and synchronises `<html lang>`, title, and description. Keep stable IDs and visual data in components, not in translated arrays.
- Sections alternate cream and white backgrounds, and each transition is an inline `<svg preserveAspectRatio="none">` wave pinned to the section edge. Changing a section's background means updating the neighbouring wave `fill`.
- Spanish copy uses a Chilean voice, Portuguese is Brazilian, and prices remain CLP in every language.
- Product imagery is already grouped under `src/assets/mascot/` and `src/assets/photos/`; check there before adding new assets. `photos/sensor-in-pot-closeup.png` is ~1.9 MB and ships unoptimised.

## Toolchain Details

- Tailwind CSS v4 is enabled through `@tailwindcss/vite` in `vite.config.ts` and `@import "tailwindcss"` in `src/index.css`; there is intentionally no Tailwind or PostCSS config file.
- Brand colours, fonts (`Fredoka` display, `Nunito` body, loaded from Google Fonts in `index.html`) and keyframes live in the `@theme` block of `src/index.css`. Add design tokens there instead of hardcoding hex values in components.
- TypeScript uses project references and strict build-time checks including unused locals/parameters and `erasableSyntaxOnly`; code that Vite serves in development can still fail `npm run build`.
- ESLint applies only to `*.ts` and `*.tsx` files and ignores `dist`; it is not type-aware.
