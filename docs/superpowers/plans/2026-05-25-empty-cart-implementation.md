# Inteligentny Pusty Koszyk Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the "Empty Cart" experience with a dynamic "Szybki Wybór" section and micro-copy in the cart summary.

**Architecture:** Modify `components/shop/CartSummary.tsx` to conditionally render `EmptyCart` component if `cartItems` is empty. Use `useMemo` for randomization to avoid hydration mismatches.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, shadcn/ui.

---

## Chunk 1: Infrastructure and Utilities

**Files:**
- Create: `components/shop/EmptyCart.tsx`
- Create: `components/shop/ProductMiniCard.tsx`
- Modify: `lib/posters.ts` (export helper for picking random posters)

- [ ] **Step 1: Export random helper in `lib/posters.ts`**
```typescript
export const getRandomPosters = (count: number) => {
  return [...allPosters].sort(() => 0.5 - Math.random()).slice(0, count);
};
```

- [ ] **Step 2: Create `ProductMiniCard.tsx`**
```tsx
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function ProductMiniCard({ poster }: { poster: any }) {
  return (
    <div className="border border-black/10 p-2 rounded-none">
      <Image src={poster.image} alt={poster.title} width={150} height={150} className="w-full aspect-square object-cover mb-2" />
      <h4 className="text-xs font-semibold mb-1">{poster.title}</h4>
      <p className="text-xs text-zinc-600 mb-2">{poster.price} zł</p>
      <Button variant="outline" className="w-full text-xs rounded-none border-black/20">
        + Dodaj
      </Button>
    </div>
  );
}
```

- [ ] **Step 3: Create `EmptyCart.tsx`**
```tsx
'use client';

import { useMemo } from 'react';
import { getRandomPosters } from '@/lib/posters';
import { ProductMiniCard } from './ProductMiniCard';
import { Button } from '@/components/ui/button';

export function EmptyCart() {
  const suggested = useMemo(() => getRandomPosters(3), []);

  return (
    <div className="text-center py-12">
      <h3 className="font-serif text-2xl mb-2">Twoja ściana wciąż czeka na słońce...</h3>
      <p className="text-sm text-zinc-600 mb-6">Twój koszyk jest obecnie pusty. Wygląda na to, że nie wybrano jeszcze żadnego kadru z południa Europy.</p>
      <Button className="mb-12 rounded-none bg-black text-white hover:bg-zinc-800 uppercase tracking-widest text-xs py-6">
        ODKRYJ KOLEKCJĘ
      </Button>

      <h4 className="text-sm font-semibold mb-4">Sprawdź nasze najpopularniejsze plakaty:</h4>
      <div className="grid grid-cols-3 gap-3 mb-12">
        {suggested.map(p => <ProductMiniCard key={p.slug} poster={p} />)}
      </div>

      <div className="grid grid-cols-1 gap-4 text-xs text-zinc-500 border-t border-black/10 pt-8">
        <p>⚡ Dostawa w 60 sekund – Pliki trafiają na Twój e-mail natychmiast po opłaceniu.</p>
        <p>📐 Wydruk w dowolnym rozmiarze – Od małego formatu po plakaty xxl (B2).</p>
        <p>🌍 Unikalne kadry – Autentyczna fotografia z podróży.</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Commit**
```bash
git add lib/posters.ts components/shop/ProductMiniCard.tsx components/shop/EmptyCart.tsx
git commit -m "feat: add EmptyCart and ProductMiniCard components"
```

## Chunk 2: Integration

**Files:**
- Modify: `components/shop/CartSummary.tsx`

- [ ] **Step 1: Update `CartSummary.tsx`**
Integrate logic to render `EmptyCart` when `cartItems.length === 0`.

- [ ] **Step 2: Verify build**
Run: `npm run build`

- [ ] **Step 3: Commit**
```bash
git add components/shop/CartSummary.tsx
git commit -m "feat: integrate EmptyCart into CartSummary"
```
