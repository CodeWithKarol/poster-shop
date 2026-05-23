# Digital Hero Section Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the printed poster Hero section with new messaging focused on digital downloadable posters, maintaining existing design system and responsive behavior.

**Architecture:** Pure content replacement in `app/page.tsx`. No CSS changes, no new components, no schema modifications. Update the Hero section HTML structure to swap heading, subheading, and remove the "Why Us?" trust box while adding micro-copy below CTA.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, TypeScript

---

## File Structure

**Files to Modify:**
- `app/page.tsx` — Update Hero section content (lines 21–84)

**No new files created.** This is a pure content replacement maintaining all existing Tailwind classes and component structure.

---

## Chunk 1: Update Hero Section Content

### Task 1: Remove "Why Us?" Trust Box and Update Hero Heading

**Files:**
- Modify: `app/page.tsx:40-70` (remove trust box, update heading)

**Context:** The current Hero has:
- H1: "Autorskie plakaty na ścianę z&nbsp;południa Europy"
- A "Dlaczego My?" section with 3 trust bullets
- Subheading: "Klimatyczne plakaty do salonu – Twoje ulubione wakacje przez cały rok"

We're replacing with:
- H1: "Autorskie plakaty do druku. Przenieś słońce Południa na swoją ścianę."
- Removing the entire "Dlaczego My?" box
- New subheading with full product description

---

- [ ] **Step 1: Read the current Hero section to understand exact structure**

Run: `cat app/page.tsx | head -85 | tail -65`

Expected output: View lines 21–85 showing the entire Hero section with heading, subheading, and trust box.

---

- [ ] **Step 2: Update the H1 heading text**

In `app/page.tsx` around line 42–44, change:
```tsx
// OLD
<h1 className="font-serif text-4xl leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white">
  Autorskie plakaty <br />
  <span className="italic font-light">na ścianę</span> z&nbsp;południa Europy
</h1>

// NEW
<h1 className="font-serif text-4xl leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white">
  Autorskie plakaty do druku. <br />
  Przenieś słońce Południa na swoją ścianę.
</h1>
```

Reasoning: New H1 is direct and benefit-focused. Remove italics and "na ścianę" phrasing. Use period for rhythm.

---

- [ ] **Step 3: Update the subheading text**

In `app/page.tsx` around line 49–51, change:
```tsx
// OLD
<p className="font-sans text-base md:text-lg leading-relaxed text-white/90 max-w-lg mx-auto lg:mx-0">
  Klimatyczne plakaty do salonu – Twoje ulubione wakacje przez cały rok
</p>

// NEW
<p className="font-sans text-base md:text-lg leading-relaxed text-white/90 max-w-lg mx-auto lg:mx-0">
  Nie musisz czekać na kolejne wakacje, by poczuć ten wyjątkowy, leniwy klimat. Odkryj kolekcję 10 autorskich fotografii z Włoch, Grecji i Hiszpanii, przygotowanych jako cyfrowe plakaty na ścianę do druku. Pobierz natychmiast, wydrukuj lokalnie i odmień swoje wnętrze jeszcze dziś.
</p>
```

Reasoning: New copy is emotionally engaging, introduces 10-poster collection, emphasizes instant download and local printing, drives urgency.

---

- [ ] **Step 4: Delete the entire "Why Us?" trust box section**

In `app/page.tsx`, remove lines 54–70:
```tsx
// DELETE THIS ENTIRE BLOCK:
{/* USP Section */}
<div className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-6 md:px-8 md:py-8 rounded-none max-w-lg mx-auto lg:mx-0 mt-4">
  <p className="font-sans text-[13px] md:text-sm uppercase tracking-[0.2em] font-bold text-white mb-4">Dlaczego My?</p>
  <ul className="space-y-3">
    <li className="flex items-start gap-3 text-sm md:text-base text-white/95">
      <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <span>100% autorskie fotografie z Włoch, Grecji i Hiszpanii</span>
    </li>
    <li className="flex items-start gap-3 text-sm md:text-base text-white/95">
      <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <span>Drukowane na zamówienie na ekologicznym papierze premium</span>
    </li>
    <li className="flex items-start gap-3 text-sm md:text-base text-white/95">
      <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <span>Bezpłatna dostawa po Polsce na każde zamówienie</span>
    </li>
  </ul>
</div>
```

After deletion, the gap between subheading and CTA button will be `gap-6 md:gap-8` (existing wrapper gap), which is appropriate.

---

- [ ] **Step 5: Add micro-copy below the CTA button**

In `app/page.tsx` after the button (around line 81), add:
```tsx
// ADD THIS AFTER BUTTON:
<p className="font-sans text-xs md:text-sm text-white/80 mt-3">
  Pliki cyfrowe wysokiej rozdzielczości – bez kosztów dostawy, gotowe w 60 sekund.
</p>
```

Position: Inside the `<div className="pt-4 md:pt-2 w-full md:w-auto flex justify-center lg:justify-start">` wrapper, after the button closes, before the wrapper closes.

Reasoning: Micro-copy builds confidence in file quality and delivery speed without overwhelming CTA.

---

- [ ] **Step 6: Verify no import changes needed**

Check `app/page.tsx` line 6:
- `Check` icon from lucide-react is imported but NO LONGER USED (deleted trust box)
- Remove unused import: Change `import { ArrowRight, Check } from "lucide-react"` to `import { ArrowRight } from "lucide-react"`

Reasoning: Keep imports clean; unused imports are code smell.

---

- [ ] **Step 7: Test responsive layout on different breakpoints**

Run dev server: `npm run dev`

Visit: `http://localhost:3000`

Visual checks:
- [ ] Mobile (375px): Heading scales to text-4xl, subheading reads properly, button is centered, micro-copy fits
- [ ] Tablet (768px): Heading at text-5xl/text-6xl, text left-aligned on >= lg breakpoint
- [ ] Desktop (1920px): Heading at text-7xl, button left-aligned, all text readable with max-w-lg constraints
- [ ] No horizontal scrolling or overflow
- [ ] Background image loads and overlay is visible

---

- [ ] **Step 8: Verify products section still renders**

On homepage after Hero section:
- [ ] "Kolekcja Premierowa" heading visible
- [ ] Product grid displays 10 poster cards correctly
- [ ] Smooth scroll to products works when CTA is clicked

---

- [ ] **Step 9: Run type checking**

Run: `npm run typecheck`

Expected: No TypeScript errors.

---

- [ ] **Step 10: Run linting**

Run: `npm run lint`

Expected: No linting errors or warnings (or existing warnings unrelated to page.tsx changes).

---

- [ ] **Step 11: Commit changes**

```bash
git add app/page.tsx
git commit -m "feat: replace hero section with digital poster messaging

- Update H1 heading to emphasize digital downloads
- Rewrite subheading with product collection intro
- Remove 'Why Us?' trust box section
- Add micro-copy below CTA for urgency and quality assurance
- Remove unused Check icon import
- Maintains existing responsive design and styling
"
```

Reasoning: Clear commit message documents what changed and why.

---

## Chunk 2: Final Verification & QA

### Task 2: Visual & Functional Testing

**Files:**
- Test: Visual inspection of `app/page.tsx` rendering
- Verify: Scroll behavior, responsive layout, no console errors

---

- [ ] **Step 1: Open browser console and check for errors**

With dev server running (`npm run dev`):
1. Open `http://localhost:3000`
2. Open DevTools (F12)
3. Check Console tab for any errors/warnings related to Hero section
4. Check Network tab for image loading (background image should load without 404)

Expected: No console errors, background image loads successfully (200 status).

---

- [ ] **Step 2: Test scroll-to-products functionality**

On homepage:
1. Click "Zobacz słoneczną kolekcję" button
2. Page should smoothly scroll to `#products-section`
3. "Kolekcja Premierowa" heading should be visible in viewport

Expected: Smooth scroll animation completes, products section is in view.

---

- [ ] **Step 3: Verify all text is readable and properly formatted**

Visual inspection:
- [ ] H1 is bold and prominent (serif font, high contrast white on dark overlay)
- [ ] Subheading text is warm and engaging, not cramped
- [ ] Micro-copy is subtle but visible (text-white/80 opacity is appropriate)
- [ ] No text is cut off or overlapping on any device size
- [ ] Button has proper hover state (bg-zinc-100 on hover)

---

- [ ] **Step 4: Test on mobile device or browser emulation**

Using DevTools responsive design mode:
- [ ] iPhone SE (375px width): All content readable, no overflow
- [ ] iPad (768px width): Layout looks balanced
- [ ] Desktop (1440px): Hero section takes up appropriate space above fold

---

- [ ] **Step 5: Verify no layout shifts (CLS issues)**

With dev server running:
1. Load `http://localhost:3000`
2. Open DevTools → Lighthouse → Performance (or use Chrome's Web Vitals extension)
3. Check for layout shift issues (CLS score)

Expected: No cumulative layout shift on Hero section.

---

- [ ] **Step 6: Run full build and check for errors**

Run: `npm run build`

Expected: Build succeeds with no errors. Output should show successful build of page.tsx.

---

- [ ] **Step 7: Final code review of changes**

Read through modified `app/page.tsx` (lines 21–85) and verify:
- [ ] All old printed poster copy is replaced with digital copy
- [ ] Trust box and Check icon logic are completely removed
- [ ] Micro-copy is correctly positioned
- [ ] Tailwind classes match existing design system (no new classes introduced)
- [ ] HTML structure is clean and semantic
- [ ] No stray console.log or debugging code

---

- [ ] **Step 8: Commit final verification**

If no changes were made during QA testing:
```bash
git log --oneline -1
# Should show the commit from Task 1, Step 11
```

If minor tweaks were made (formatting, spacing):
```bash
git add app/page.tsx
git commit -m "fix: minor formatting adjustments in hero section"
```

---

## Success Criteria

✅ **All of the following must be true:**

1. **Content:** Hero section displays new digital poster copy (heading, subheading, micro-copy)
2. **Structure:** "Why Us?" trust box is completely removed
3. **Styling:** No CSS changes; all existing Tailwind classes maintained
4. **Responsiveness:** Layout works on mobile (375px), tablet (768px), desktop (1440px+)
5. **Functionality:** CTA button scrolls to products section smoothly
6. **Quality:** No console errors, no TypeScript errors, linting passes
7. **Performance:** No layout shift issues (CLS), background image loads
8. **Code:** Unused imports removed, clean commit history

---

## Rollback Plan

If issues are discovered after deployment:

```bash
# View recent commits
git log --oneline -5

# Revert to previous state
git revert HEAD

# Or hard reset if not yet pushed
git reset --hard HEAD~1
```

The Hero section changes are isolated to `app/page.tsx` lines 21–85. No other files are affected.

---

## Notes for Implementation

- **No database changes:** Product data in `lib/posters.ts` remains unchanged
- **No API changes:** Stripe integration and checkout flow unaffected
- **No component changes:** All existing components (Button, PosterCard, etc.) work as-is
- **No new dependencies:** No packages to install or update
- **Backward compatible:** This is a pure content/messaging update with no breaking changes

The digital product line will use the same 10 posters and same checkout flow as the printed version. Product SKU/pricing adjustments are out of scope for this task.
