# Product Catalog Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the "Kolekcja Premierowa" section with a complete "Limitowana kolekcja 10 ujęć" product catalog featuring 10 SEO-optimized products (4 Italia, 3 Greece, 3 Spain) with mockup-first design, hover effects, and integrated "Dodaj do koszyka" functionality.

**Architecture:** Update `lib/posters.ts` with new 10-product dataset (new titles, subtitles, images, mockups, tags). Modify `app/page.tsx` to replace old Products section with new section header and existing PosterCard grid. PosterCard component already supports hover effects (mockup ↔ raw photo toggle)—no component changes needed.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, lucide-react, existing PosterCard component

---

## File Structure

**Files to Create:**
- None (use existing components and structure)

**Files to Modify:**
- `lib/posters.ts` — Replace 10 products with new SEO-optimized dataset
- `app/page.tsx` — Update Products section header and grid layout

**No breaking changes.** All existing product-related components (PosterCard, checkout, etc.) continue to work without modification.

---

## Chunk 1: Update Product Data

### Task 1: Create New 10-Product Dataset

**Files:**
- Modify: `lib/posters.ts:17-212` (replace entire products array)

**Context:** Current `posters.ts` has 10 products with generic names and descriptions. Replace with SEO-optimized titles targeting room types (e.g., "Plakat do salonu – Słoneczna Sycylia"), emotional subtitles, and proper category/room tags.

---

- [ ] **Step 1: Read current posters.ts structure to understand schema**

Run: `sed -n '1,50p' lib/posters.ts`

Expected output: Shows `Poster` interface and first few products.

---

- [ ] **Step 2: Create new complete posters.ts with 10 products**

Replace the entire file content starting at line 1. Use the complete structure below:

```typescript
export interface Poster {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  artist: string;
  basePrice: number; // in grosze (e.g. 8500 = 85.00 PLN)
  imageUrl: string;
  mockupUrl: string; // Visualization in interior
  gallery: string[];
  aspectRatio: "portrait" | "landscape" | "square";
  description: string;
  relatedSlugs: string[];
  tags: string[]; // e.g. ["Włochy", "Do Salonu", "Klimat Retro"]
}

export const posters: Poster[] = [
  // WŁOCHY (4)
  {
    id: "1",
    slug: "sloneczna-sycylia",
    title: "Plakat do salonu – Słoneczna Sycylia",
    subtitle: "Wąska uliczka, pranie schnące w słońcu i zapach porannej kawy. Idealny do jasnego salonu.",
    artist: "Marco Rossi",
    basePrice: 8500,
    imageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1900&auto=format&fit=crop",
    mockupUrl: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop",
    ],
    aspectRatio: "portrait",
    description: "Kadr uchwycony w sycylijskiej uliczce. Wąskie uliczki, kolorowe ściany, pranie na linach. Każdy dzień jak wakacje.",
    relatedSlugs: ["rzymskie-wakacje", "wybrzeze-amalfi"],
    tags: ["Włochy", "Do Salonu", "Klimat Retro", "Ciepłe Tony"]
  },
  {
    id: "2",
    slug: "rzymskie-wakacje",
    title: "Plakat na ścianę – Rzymskie Wakacje",
    subtitle: "Ciepła, pastelowa fasada kamienicy w sercu Wiecznego Miasta uchwycona w południowym słońcu.",
    artist: "Antonio Rossi",
    basePrice: 8900,
    imageUrl: "https://images.unsplash.com/photo-1512364993744-1c6534218edd?q=80&w=2070&auto=format&fit=crop",
    mockupUrl: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1512364993744-1c6534218edd?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop",
    ],
    aspectRatio: "portrait",
    description: "Ciepłe włoskie architektura. Pastelowe barwy, naturalne światło, wiekowa uroda Wiecznego Miasta.",
    relatedSlugs: ["sloneczna-sycylia", "wloskie-espresso"],
    tags: ["Włochy", "Architektura", "Pastelowe Barwy", "Ciepła Estetyka"]
  },
  {
    id: "3",
    slug: "wloskie-espresso",
    title: "Plakat do kuchni – Włoskie Espresso",
    subtitle: "Detal – filiżanka kawy na marmurowym stoliku w klimatycznej kawiarni. Genialny akcent do jadalni lub kuchni.",
    artist: "Sofia Moretti",
    basePrice: 7900,
    imageUrl: "https://images.unsplash.com/photo-1559056169-641ef2588ff5?q=80&w=2070&auto=format&fit=crop",
    mockupUrl: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1559056169-641ef2588ff5?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop",
    ],
    aspectRatio: "square",
    description: "Detal włoskiej kawy. Filiżanka na marmurze, ciepłe światło poranku. Idealny do kuchni.",
    relatedSlugs: ["sloneczna-sycylia", "rzymskie-wakacje"],
    tags: ["Włochy", "Do Kuchni", "Minimalizm", "Akcent"]
  },
  {
    id: "4",
    slug: "wybrzeze-amalfi",
    title: "Plakat do sypialni – Wybrzeże Amalfi",
    subtitle: "Głęboki błękit morza skontrastowany z charakterystycznymi, kolorowymi parasolami.",
    artist: "Giulio Marino",
    basePrice: 9500,
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop",
    mockupUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2070&auto=format&fit=crop",
    ],
    aspectRatio: "landscape",
    description: "Wybrzeże Amalfi. Głębokie błękity, kolorowe parasole, wakacyjny luksus. Relaksacyjna estetyka.",
    relatedSlugs: ["sloneczna-sycylia", "santorini-blue-hour"],
    tags: ["Włochy", "Do Sypialni", "Błękit Morza", "Relaksacyjna Estetyka"]
  },

  // GRECJA (3)
  {
    id: "5",
    slug: "santorini-blue-hour",
    title: "Plakat nowoczesny – Santorini Blue Hour",
    subtitle: "Klasyczna, biała architektura Cyklad na tle morza w trakcie złotej godziny. Ikona stylu z Pinterest.",
    artist: "Dimitri Papadopoulos",
    basePrice: 9900,
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2070&auto=format&fit=crop",
    mockupUrl: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop",
    ],
    aspectRatio: "portrait",
    description: "Santorini o zmierzchu. Biała architektura, błękitne morze, złota godzina. Pinterest ideał.",
    relatedSlugs: ["greckie-slonce", "srodziemnomorski-luz"],
    tags: ["Grecja", "Architektura", "Minimalizm", "Złota Godzina", "Pinterest Aesthetic"]
  },
  {
    id: "6",
    slug: "greckie-slonce",
    title: "Plakat minimalistyczny – Greckie Słońce",
    subtitle: "Detal starych, drewnianych drzwi w kolorze indygo na tle idealnie białej, chropowatej ściany.",
    artist: "Yiannis Dimitriou",
    basePrice: 7900,
    imageUrl: "https://images.unsplash.com/photo-1473093295203-cad00658c069?q=80&w=2070&auto=format&fit=crop",
    mockupUrl: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1473093295203-cad00658c069?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop",
    ],
    aspectRatio: "square",
    description: "Greckie drzwi, indygo kontrast na białej ścianie. Minimalistyczna, teksturowa estetyka.",
    relatedSlugs: ["santorini-blue-hour", "srodziemnomorski-luz"],
    tags: ["Grecja", "Minimalizm", "Detal", "Indygo", "Tekstury"]
  },
  {
    id: "7",
    slug: "srodziemnomorski-luz",
    title: "Plakat na ścianę – Śródziemnomorski Luz",
    subtitle: "Gałązka oliwna rzucająca głęboki cień na rozgrzany mur. Minimalizm i spokój.",
    artist: "Elena Kastelli",
    basePrice: 8500,
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070&auto=format&fit=crop",
    mockupUrl: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop",
    ],
    aspectRatio: "portrait",
    description: "Oliwna gałązka, cień na murze. Minimalizm, spokój, naturalne światło.",
    relatedSlugs: ["greckie-slonce", "santorini-blue-hour"],
    tags: ["Grecja", "Minimalizm", "Natura", "Cień", "Spokój"]
  },

  // HISZPANIA (3)
  {
    id: "8",
    slug: "architektura-andaluzji",
    title: "Plakat do salonu – Architektura Andaluzji",
    subtitle: "Ciepłe, terakotowe łuki i gra świateł w hiszpańskim patio.",
    artist: "Carmen Rodriguez",
    basePrice: 8900,
    imageUrl: "https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?q=80&w=2070&auto=format&fit=crop",
    mockupUrl: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop",
    ],
    aspectRatio: "portrait",
    description: "Architektura Andaluzji. Terakotowe łuki, gra świateł, ciepłe kolory. Do salonu.",
    relatedSlugs: ["palma-w-barcelonie", "hiszpanskie-wybrzeze"],
    tags: ["Hiszpania", "Do Salonu", "Architektura", "Terakota", "Światło"]
  },
  {
    id: "9",
    slug: "palma-w-barcelonie",
    title: "Plakat botaniczny – Palma w Barcelonie",
    subtitle: "Liście palmy na tle bezchmurnego, pastelowego nieba. Przynosi natychmiastowe poczucie letniej sjesty.",
    artist: "Pablo Sanchez",
    basePrice: 8300,
    imageUrl: "https://images.unsplash.com/photo-1490880033800-0d71c45d5f6e?q=80&w=2070&auto=format&fit=crop",
    mockupUrl: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1490880033800-0d71c45d5f6e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop",
    ],
    aspectRatio: "portrait",
    description: "Palma na niebie. Botanika, egzotyka, pastel. Sjesta i relaks.",
    relatedSlugs: ["architektura-andaluzji", "hiszpanskie-wybrzeze"],
    tags: ["Hiszpania", "Botanika", "Pastelowe", "Egzotyka", "Sjesta"]
  },
  {
    id: "10",
    slug: "hiszpanskie-wybrzeze",
    title: "Plakat boho – Hiszpańskie Wybrzeże",
    subtitle: "Dzika, piaszczysta plaża na Costa Brava z trawami kołyszącymi się na wietrze. Idealny do wnętrz w stylu skandynawskim lub boho.",
    artist: "Isabel Garcia",
    basePrice: 8700,
    imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=2070&auto=format&fit=crop",
    mockupUrl: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop",
    ],
    aspectRatio: "landscape",
    description: "Plaża Costa Brava. Dzika natura, trawa, piach. Boho i skandynawskie wnętrza.",
    relatedSlugs: ["palma-w-barcelonie", "architektura-andaluzji"],
    tags: ["Hiszpania", "Plaża", "Boho", "Skandynawskie", "Natura"]
  }
]

export const formatPrice = (priceInGrosze: number): string => {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2
  }).format(priceInGrosze / 100);
}
```

**Reasoning:**
- All 10 products with SEO-optimized titles targeting room types ("Plakat do salonu", "Plakat do kuchni", etc.)
- Emotional subtitles describing mood and product fit
- Proper tags for filtering/categorization
- Realistic Unsplash image URLs for both `imageUrl` (raw photo) and `mockupUrl` (interior context)
- Prices in grosze (e.g., 8500 = 85 PLN)
- 4 Italy, 3 Greece, 3 Spain distribution
- `formatPrice` utility function to format prices with PLN currency

---

- [ ] **Step 3: Verify TypeScript compiles without errors**

Run: `npm run typecheck`

Expected: No errors. All 10 products conform to `Poster` interface.

---

- [ ] **Step 4: Commit product data changes**

```bash
git add lib/posters.ts
git commit -m "data: update 10-product catalog with SEO-optimized titles and descriptions

- Replace generic product names with room-type targeting (do salonu, do kuchni, etc.)
- Add emotional subtitles describing product fit and mood
- Reorganize into 3 categories: Włochy (4), Grecja (3), Hiszpania (3)
- Update all images with realistic Unsplash URLs
- Add proper tags for filtering (room type, country, aesthetic)
- Prices: 7900-9900 PLN (79-99 PLN)
"
```

---

## Chunk 2: Update Homepage Section

### Task 2: Replace Products Section Header and Update Grid

**Files:**
- Modify: `app/page.tsx:122-147` (Products section header and grid)

**Context:** Current Products section has generic heading ("Kolekcja Premierowa") and standard grid. Replace with new heading ("Limitowana kolekcja 10 ujęć...") and subheading emphasizing mockup-to-raw-photo hover effect and cart integration.

---

- [ ] **Step 1: Read current Products section structure**

Run: `sed -n '122,147p' app/page.tsx`

Expected output: Shows current Products section header and grid opening.

---

- [ ] **Step 2: Update Products section header**

In `app/page.tsx` lines 123-127, replace:

```tsx
// OLD
<section id="products-section" className="container mx-auto px-6 lg:px-8 max-w-[1400px] py-20 md:py-32 border-t border-black/10">
  <div className="mb-12 md:mb-20 border-b border-black/10 pb-6">
    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-2">Kolekcja Premierowa</h2>
    <p className="font-sans text-xs md:text-sm text-zinc-600 uppercase tracking-[0.15em]">10 unikatowych plakatów do Twojego wnętrza</p>
  </div>

// NEW
<section id="products-section" className="container mx-auto px-6 lg:px-8 max-w-[1400px] py-20 md:py-32 border-t border-black/10">
  <div className="mb-12 md:mb-20 text-center">
    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4 text-black">
      Limitowana kolekcja 10 ujęć. Wybierz swój kawałek Południa.
    </h2>
    <p className="font-sans text-sm md:text-base leading-relaxed text-zinc-600 max-w-2xl mx-auto">
      Kliknij w plakat, aby zobaczyć szczegóły, lub dodaj go od razu do koszyka. 
      Wszystkie kadry idealnie łączą się ze sobą, tworząc spójne domowe galerie ścienne.
    </p>
  </div>
```

**Reasoning:**
- New H2 heading is more compelling and positions as limited collection
- Subheading is centered and describes the hover effect + cart functionality
- Removed bottom border divider, centered text alignment
- Larger subheading font (text-base vs xs)

---

- [ ] **Step 3: Update grid layout classes**

In `app/page.tsx` line 130 (the grid div), change:

```tsx
// OLD
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12 md:gap-y-16">

// NEW
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
```

**Reasoning:**
- Simplified breakpoints: 1 column mobile, 2 tablet, 3 desktop (no xl:cols-4)
- Unified gap: `gap-6 md:gap-8` instead of separate x/y gaps
- Matches spec layout exactly

---

- [ ] **Step 4: Verify PosterCard props match new data**

Check that the `.map()` on line 131 passes correct props:

```tsx
{posters.map((poster) => (
  <PosterCard 
    key={poster.id}
    slug={poster.slug}
    title={poster.title}
    imageUrl={poster.imageUrl}
    mockupUrl={poster.mockupUrl}
    price={formatPrice(poster.basePrice)}
    aspectRatio={poster.aspectRatio}
    tags={poster.tags}
  />
))}
```

Expected: All props match new data structure (especially `imageUrl`, `mockupUrl`, `tags`).

---

- [ ] **Step 5: Run type checking**

Run: `npm run typecheck`

Expected: No errors. All props passed to PosterCard are valid.

---

- [ ] **Step 6: Test responsive layout**

Run: `npm run dev`

Visit: `http://localhost:3000`

Visual checks:
- [ ] **Mobile (375px):** Products display in 1 column
- [ ] **Tablet (768px):** Products display in 2 columns
- [ ] **Desktop (1440px):** Products display in 3 columns
- [ ] New heading visible: "Limitowana kolekcja 10 ujęć..."
- [ ] Subheading visible and centered
- [ ] All 10 products render without errors
- [ ] Mockup images load (interior context)
- [ ] Tags display under images
- [ ] Prices format correctly (85 PLN, 79 PLN, etc.)

---

- [ ] **Step 7: Test hover effects (desktop)**

On desktop browser:
- [ ] Hover over any product image
- [ ] Mockup → raw photo transition (should switch images)
- [ ] "Wizualizacja" badge appears when hovering over mockup
- [ ] Badge disappears when viewing raw photo
- [ ] Scale-up effect visible on hover (subtle zoom)

---

- [ ] **Step 8: Verify section integrates correctly**

On homepage:
- [ ] Value Proposition section (with 3 benefit cards) displays above
- [ ] Product section displays directly below Value Proposition (no gap)
- [ ] FAQ section (if exists) displays below Products
- [ ] All sections flow naturally without alignment issues

---

- [ ] **Step 9: Commit section updates**

```bash
git add app/page.tsx
git commit -m "feat: replace product section with new 'Limitowana kolekcja 10 ujęć' catalog

- Update section heading to 'Limitowana kolekcja 10 ujęć. Wybierz swój kawałek Południa.'
- Add compelling subheading about hover effects and cart integration
- Simplify grid to 1/2/3 columns (mobile/tablet/desktop)
- Update gap to unified gap-6 md:gap-8
- Maintain PosterCard hover effect (mockup ↔ raw photo toggle)
- All 10 new SEO-optimized products now display on homepage
- No page navigation required—complete shop on one page
"
```

---

## Chunk 3: Final QA and Verification

### Task 3: Comprehensive Testing and Polish

**Files:**
- Test: Visual inspection of entire homepage with new product section
- Verify: No console errors, proper responsive behavior, cart integration

---

- [ ] **Step 1: Full page visual inspection (desktop)**

Run: `npm run dev` (if not already running)

Visit: `http://localhost:3000`

Visual checks:
- [ ] Hero section displays correctly (digital poster messaging)
- [ ] Value Proposition section (3 benefit cards) renders properly
- [ ] Product section header and subheading visible
- [ ] All 10 products display in 3-column grid
- [ ] Product cards show mockup images (interior context)
- [ ] Tags display under each product (country, room type, aesthetic)
- [ ] Prices formatted correctly (PLN currency)
- [ ] "Dodaj do koszyka" button visible on each card
- [ ] No layout shifts, proper spacing throughout

---

- [ ] **Step 2: Test hover effects thoroughly**

Desktop only:
- [ ] Hover over first product → image switches to raw photo ✓
- [ ] Hover over second product → mockup image switches ✓
- [ ] Hover over product in middle row → hover effect works ✓
- [ ] "Wizualizacja" badge appears/disappears correctly ✓
- [ ] Scale-up animation smooth (group-hover:scale-105) ✓
- [ ] Image transitions smooth (duration-700) ✓

---

- [ ] **Step 3: Test responsive design (mobile, tablet, desktop)**

Using DevTools responsive design mode:
- [ ] **Mobile (375px):** Products stack vertically (1 column), readable on narrow screen
- [ ] **Tablet (768px):** Products display in 2 columns, proper spacing
- [ ] **Desktop (1440px):** Products display in 3 columns evenly distributed
- [ ] **Large desktop (1920px):** Grid maintains 3 columns, content centered
- [ ] No horizontal scrolling on any device
- [ ] Text is readable at all sizes
- [ ] Images load without overflow

---

- [ ] **Step 4: Verify product data rendering**

Visual inspection:
- [ ] **Product 1:** "Plakat do salonu – Słoneczna Sycylia" with subtitle ✓
- [ ] **Product 5:** "Plakat nowoczesny – Santorini Blue Hour" with subtitle ✓
- [ ] **Product 10:** "Plakat boho – Hiszpańskie Wybrzeże" with subtitle ✓
- [ ] All tags display correctly (e.g., "Włochy", "Do Salonu", "Klimat Retro")
- [ ] All prices format correctly (8500 grosze → "85,00 PLN")
- [ ] "Cyfrowy plik JPG/PDF" label visible on each card

---

- [ ] **Step 5: Test cart integration**

If "Dodaj do koszyka" button is functional:
- [ ] Click "Dodaj do koszyka" on any product
- [ ] Cart indicator updates (if visible)
- [ ] No console errors
- [ ] Product is added to cart (or redirects to product page)

---

- [ ] **Step 6: Check console for errors**

With dev server running:
1. Open DevTools (F12)
2. Check Console tab

Expected: No JavaScript errors related to products, images, or grid layout.

---

- [ ] **Step 7: Run linting**

Run: `npm run lint`

Expected: No new errors or warnings introduced.

---

- [ ] **Step 8: Run type checking**

Run: `npm run typecheck`

Expected: No TypeScript errors.

---

- [ ] **Step 9: Verify page flow**

On homepage from top to bottom:
1. ✓ Header (if exists)
2. ✓ Hero section ("Autorskie plakaty do druku...")
3. ✓ Value Proposition section (3 benefit cards)
4. ✓ **Product section** ("Limitowana kolekcja 10 ujęć...")
5. ✓ FAQ section (if exists)
6. ✓ Footer (if exists)

---

- [ ] **Step 10: Test on real mobile device (if available)**

Using actual mobile phone or tablet:
- [ ] Products display properly in 1 column (mobile) or 2 columns (tablet)
- [ ] Images load without issues
- [ ] Text is readable without zooming
- [ ] "Dodaj do koszyka" button is touch-friendly
- [ ] No layout issues or missing content

---

- [ ] **Step 11: Final commit (if needed)**

If only minor polish/fixes were applied:

```bash
git log --oneline -2
# Should show the two commits from Tasks 1 and 2
```

If fixes were made:

```bash
git add .
git commit -m "polish: final touches to product section layout and styling"
```

---

## Success Criteria

✅ **All of the following must be true:**

1. ✅ All 10 products display on homepage in correct grid (1/2/3 columns)
2. ✅ Products display with correct SEO-optimized titles and subtitles
3. ✅ Mockup images load and display (interior context, default view)
4. ✅ Hover effect works: mockup ↔ raw photo toggle on desktop
5. ✅ "Wizualizacja" badge appears/disappears correctly on hover
6. ✅ Product tags display (country, room type, aesthetic)
7. ✅ Prices format correctly with PLN currency
8. ✅ "Dodaj do koszyka" button visible and accessible
9. ✅ Section integrates between Value Proposition and FAQ (if exists)
10. ✅ Responsive design works on mobile (375px), tablet (768px), desktop (1440px+)
11. ✅ No TypeScript errors, no console errors, linting passes
12. ✅ All Polish language text displays with correct characters
13. ✅ No page navigation required—complete shop on homepage

---

## Notes

- This implementation transforms the homepage into a **one-page shop**—all 10 products visible without pagination or page navigation
- Product titles now target search intent ("Plakat do salonu", "Plakat do kuchni", etc.) for better SEO
- Mockup-first design (interior context) with hover-to-reveal raw photo builds confidence in quality
- No changes to PosterCard component—existing hover effects and design work perfectly
- Cart integration remains on same page (no redirect to separate checkout)
- All image URLs use Unsplash for consistency and reliability

---

## Rollback Plan

If critical issues are discovered:

```bash
# View recent commits
git log --oneline -5

# Revert to before product redesign
git revert HEAD~1
git revert HEAD

# Or hard reset if not yet pushed
git reset --hard HEAD~2
```

Changes are isolated to two files:
- `lib/posters.ts` (data)
- `app/page.tsx` (section rendering)

---

## Performance Considerations

- 10 product cards × 2 images each = 20 Unsplash image loads
- Images are optimized via Next.js Image component (responsive, lazy loading)
- `sizes` attribute in PosterCard ensures proper responsive image loading
- No performance issues expected with 10 products on one page
- Consider image preloading if performance becomes concern

---

## Future Enhancements (Out of Scope)

- Faceted filtering by country/room type/aesthetic (currently tags exist for this)
- "Add to cart" animations and feedback
- Related products carousel (relatedSlugs already populated)
- Product detail modal (currently links to `/plakat/{slug}` pages)
- Cart slide-out UI (currently part of checkout flow)
