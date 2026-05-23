# AGENTS.md

High-signal instructions for working on the `poster-shop` repository.

## Development Commands
- **Dev Server:** `npm run dev` (uses Turbopack)
- **Type Checking:** `npm run typecheck`
- **Linting:** `npm run lint`
- **Formatting:** `npm run format` (uses Prettier)

## Architecture & Toolchain
- **Framework:** Next.js 16 (App Router), React 19.
- **Language:** Polish (UI text and configurations must support `latin-ext` for fonts).
- **Styling:** Tailwind CSS 4. **Note:** Tailwind v4 configuration is located in `app/globals.css` via `@theme inline`, *not* in `tailwind.config.ts`.
- **Payments:** Stripe integration via `@stripe/stripe-js` and `@stripe/react-stripe-js`. 
  - Payment intents are generated at `app/api/create-payment-intent/route.ts`.
  - Local dev requires `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY` in `.env.local`.
  - The Stripe `PaymentElement` appearance is heavily customized to match the app's flat, borderless design.
- **Images:** External image domains (like `images.unsplash.com`) must be whitelisted in `next.config.mjs` under `images.remotePatterns` to work with the Next.js `<Image>` component.

## UI & Aesthetic Conventions
- **Theme:** "Minimalist Monochrome" / Editorial Gallery. 
  - **Strict Rules:** `0px` border-radius (`rounded-none` on buttons/inputs/cards), no box shadows, 1px thin borders (`border-black/10` or `border-black/20`). High contrast (black/white).
- **Typography:** 
  - Headings (`font-serif`): `Playfair Display`.
  - UI/Meta/Prices (`font-sans`): `Inter` / `Geist`. 
  - *Crucial:* Always include the `latin-ext` subset when adding Google Fonts for proper Polish character rendering (e.g., ł, ś, ć).
  - Use `&shy;` (soft hyphens) instead of CSS `break-words` for responsive text wrapping on large mobile headlines.
- **Components:** Managed via `shadcn/ui`. Add new ones via `npx shadcn@latest add [component-name]`. **Always override** default shadcn styles post-installation to remove border radii and drop shadows.