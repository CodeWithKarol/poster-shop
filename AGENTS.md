# AGENTS.md

High-signal instructions for working on the `poster-shop` repository.

## Development Commands
- **Dev Server:** `npm run dev` (uses Turbopack)
- **Build:** `npm run build`
- **Type Checking:** `npm run typecheck`
- **Linting:** `npm run lint`
- **Formatting:** `npm run format` (uses Prettier)

## UI & Components
- **Framework:** Next.js 16 (App Router), Tailwind CSS 4, React 19.
- **shadcn/ui:** 
  - Components are managed in the `components/` directory.
  - To add components: `npx shadcn@latest add [component-name]`
  - Import path: `@/components/ui/[component-name]`

## Conventions
- **Project Structure:** 
  - `app/`: Next.js App Router routes.
  - `lib/`: Utility functions.
  - `hooks/`: React hooks.
- **Style:** Tailwind CSS classes. Use `cn()` utility (imported from `lib/utils.ts`, if available) for conditional class merging.
