# Digital Hero Section Design Spec
**Date:** May 24, 2026  
**Project:** Poster Shop - Digital Product Line Launch  
**Scope:** Hero Section Redesign for Digital Downloads  
**Status:** Ready for Implementation

---

## Overview
Replace the existing printed poster Hero section with messaging focused on **digital downloadable posters**. The new Hero emphasizes immediate access, authenticity, and emotional connection to Mediterranean aesthetics. No CSS changes required—pure content replacement maintaining the existing minimalist design system.

---

## Design Goals
1. **First Impression (0-3 seconds):** Communicate that the solution to decorating bare walls is instantly available
2. **Emotional Hook:** Evoke the warmth of Southern European sunshine and the ease of bringing it home
3. **Trust & Clarity:** Establish immediate value proposition (high-res files, instant download, no shipping costs)
4. **Action Orientation:** Clear, compelling CTA that drives scroll-to-products

---

## Content Specification

### 1. Main Heading (H1)
**Copy:**
```
Autorskie plakaty do druku. 
Przenieś słońce Południa na swoją ścianę.
```

**Purpose:** Lead with benefit (authentic posters to print) + emotional promise (bring Southern sun to your wall)

**Styling:**
- Font: `font-serif` (Playfair Display)
- Size: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl`
- Line Height: `leading-[1.1]`
- Letter Spacing: `tracking-tight`
- Color: `text-white`
- Layout: Center-aligned on mobile/tablet, left-aligned on desktop (via `lg:text-left`)

**Implementation Notes:**
- Split across two lines naturally; no manual line breaks except where needed for rhythm
- Maintain existing responsive scaling behavior

---

### 2. Subheading / Descriptive Copy
**Copy:**
```
Nie musisz czekać na kolejne wakacje, by poczuć ten wyjątkowy, leniwy klimat. Odkryj kolekcję 10 autorskich fotografii z Włoch, Grecji i Hiszpanii, przygotowanych jako cyfrowe plakaty na ścianę do druku. Pobierz natychmiast, wydrukuj lokalnie i odmień swoje wnętrze jeszcze dziś.
```

**Purpose:** Establish emotional context, introduce product offering, and drive action urgency

**Styling:**
- Font: `font-sans` (Inter/Geist)
- Size: `text-base md:text-lg`
- Line Height: `leading-relaxed`
- Color: `text-white/90`
- Max-Width: `max-w-lg`
- Alignment: Center on mobile, left on desktop (`lg:text-left lg:mx-0`)

**Implementation Notes:**
- Maintain existing whitespace and readability constraints
- Ensure mobile text doesn't exceed viewport width

---

### 3. Primary CTA Button
**Copy:**
```
Zobacz słoneczną kolekcję
```

**Purpose:** Drive user action to product grid; clear, memorable, benefit-focused

**Styling:**
- Button Style: `bg-white text-black hover:bg-zinc-100`
- Padding: `px-4 sm:px-8 py-5 sm:py-6 md:py-7`
- Font: `uppercase tracking-[0.15em] sm:tracking-[0.2em] font-semibold text-[11px] sm:text-xs`
- Border Radius: `rounded-none` (minimalist theme)
- Icon: Right arrow (`<ArrowRight />`) with hover animation
- Hover Effect: Arrow translates right (`group-hover:translate-x-1`)

**Container Layout:**
- Mobile: Centered button
- Desktop: Left-aligned button
- Wrapper: `pt-4 md:pt-2 w-full md:w-auto flex justify-center lg:justify-start`

**Behavior:**
- On click: Smooth scroll to `#products-section`
- Maintains existing click handler: `handleScrollToProducts()`

---

### 4. Micro-copy (Trust & Urgency)
**Copy:**
```
Pliki cyfrowe wysokiej rozdzielczości – bez kosztów dostawy, gotowe w 60 sekund.
```

**Purpose:** Build confidence in file quality and delivery speed; reinforce instant access benefit

**Styling:**
- Font: `font-sans text-xs md:text-sm`
- Color: `text-white/80` (slightly subdued)
- Position: Directly below CTA button
- Alignment: Inherited from button container

**Implementation Notes:**
- Display as small caption text
- Emphasize speed and quality without overwhelming the CTA

---

## Removed Element

**"Why Us?" Trust Section (bg-white/10 backdrop-blur box with 3 bullet points)**
- This section is completely removed
- Simplifies Hero, reduces cognitive load
- Hero now relies on strong copy and emotional resonance
- Product grid below will carry trust-building and feature details

---

## Layout & Spacing

**Hero Section Container:**
```
<section className="relative w-full overflow-hidden">
  {/* Background image + overlay unchanged */}
  {/* Content container */}
  <div className="relative z-10 container mx-auto px-6 lg:px-8 max-w-[1400px] pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-24">
    <div className="flex flex-col gap-6 md:gap-8 max-w-2xl mx-auto text-center lg:text-left lg:max-w-2xl">
      {/* H1 */}
      {/* Subheading p */}
      {/* CTA Button + Micro-copy */}
    </div>
  </div>
</section>
```

**Key Spacing:**
- Gap between heading and subheading: `gap-6 md:gap-8`
- Gap before CTA: `pt-4 md:pt-2` on button wrapper
- Padding before button: `pt-4 md:pt-2`
- Vertical padding on section: `pt-16 md:pt-24 lg:pt-32` top, `pb-16 md:pb-24` bottom

---

## Mobile Responsiveness Checklist

- [ ] H1 scales properly on small screens (text-4xl base)
- [ ] Subheading text readable on mobile (max-w-lg constraint)
- [ ] Button centered on mobile, left-aligned on desktop
- [ ] Micro-copy doesn't overflow on narrow viewports
- [ ] Adequate whitespace prevents cramped appearance
- [ ] No horizontal scrolling on any device size

---

## Accessibility & Browser Compatibility

- **Alt text:** Background image already has `alt="Sycylijska uliczka - tło hero"` (no change needed)
- **Contrast:** White text on dark overlay meets WCAG AA standards (existing setup)
- **Keyboard Navigation:** CTA button remains focusable and clickable
- **Screen Readers:** Semantic HTML maintained (h1, p, button elements)

---

## Files to Modify

**Primary:**
- `app/page.tsx` — Update Hero section content (lines 21–84)

**No CSS Changes:**
- Existing Tailwind classes remain unchanged
- No modifications to `app/globals.css`
- No new components required

---

## Testing Checklist

- [ ] Hero section renders correctly on mobile (375px), tablet (768px), desktop (1920px)
- [ ] Text scales appropriately at all breakpoints
- [ ] CTA button click triggers smooth scroll to products section
- [ ] Micro-copy displays correctly below button
- [ ] No layout shifts or overflow issues
- [ ] Background image loads and displays correctly
- [ ] Overlay opacity (40%) is visually appropriate

---

## Success Criteria

1. **Visual Integrity:** Hero maintains minimalist monochrome aesthetic (0px radius, 1px borders, high contrast)
2. **Content Clarity:** First 5 seconds communicate: "authentic digital poster downloads, instant access"
3. **User Action:** CTA is prominent, compelling, and drives click-through to product grid
4. **Responsive:** Layout works flawlessly across all device sizes
5. **Performance:** No layout shifts; image loads within acceptable time

---

## Implementation Notes

- This is a **content-only change** to the existing Hero component
- No new dependencies or libraries required
- All styling uses existing Tailwind tokens from `app/globals.css`
- Polish language support already in place (latin-ext fonts configured)
- Ready for immediate deployment after code review

---

## Related Content

- **Products Section:** Below Hero (unchanged; displays same 10 posters)
- **Product Data:** `lib/posters.ts` (no schema changes needed for digital offering)
- **Checkout Flow:** Existing Stripe integration remains intact
