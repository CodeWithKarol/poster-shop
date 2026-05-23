# Product Catalog Redesign - MVP Spec
**Date:** May 24, 2026  
**Project:** Poster Shop - One-Page Catalog + Shop  
**Scope:** Restructure product section to be main catalog/shop interface  
**Status:** Ready for Implementation

---

## Overview

Replace the "Kolekcja Premierowa" section with a comprehensive **"Limitowana kolekcja 10 ujęć"** product catalog that serves as the primary shop interface. Users discover, preview, and purchase all 10 products on the main page without navigating to subpages. The design emphasizes:

1. **Visual discovery** via mockup-first presentation (product in styled room)
2. **Detail transparency** via hover to reveal raw photography
3. **Instant purchasing** ("Dodaj do koszyka" button on each card)
4. **Emotional positioning** via SEO-friendly titles targeting room types and aesthetic styles

---

## Design Goals

1. **Reduce friction:** No page navigation required—entire shop experience on homepage
2. **Visual-first selling:** Mockup images show styled room context; hover reveals photography detail
3. **SEO + Conversion:** Product titles optimize for intent ("Plakat do salonu – Słoneczna Sycylia")
4. **Emotional trust:** Subtitles describe the mood/room fit, not just image specs
5. **Mobile-optimized:** Responsive grid works on all devices (1/2/3 columns)
6. **Category clarity:** Tags show room type, country, and aesthetic style

---

## Data Structure

### **Enhanced Poster Interface**

Extend existing `Poster` interface (in `lib/posters.ts`) with new fields:

```typescript
export interface Poster {
  id: string;
  slug: string;
  title: string;           // SEO-friendly: "Plakat do salonu – Słoneczna Sycylia"
  subtitle: string;        // Benefit/mood: "Wąska uliczka, pranie schnące w słońcu..."
  artist: string;
  basePrice: number;       // in grosze (e.g. 8500 = 85.00 PLN)
  imageUrl: string;        // Raw photo (revealed on hover)
  mockupUrl: string;       // Interior visualization (default view)
  gallery: string[];       // Additional images
  aspectRatio: "portrait" | "landscape" | "square";
  description: string;     // Full product description (for detail page)
  relatedSlugs: string[];  // Cross-sell
  tags: string[];          // ["Włochy", "Do Salonu", "Minimalizm", "Retro"]
  category?: string;       // "Włochy" | "Grecja" | "Hiszpania" (can also use first tag)
  roomType?: string;       // "Do Salonu", "Do Kuchni", "Do Sypialni", etc. (via tags)
}
```

**Note:** Existing structure already supports all needed fields. `category` and `roomType` can be derived from `tags` array or added as explicit fields.

---

## 10 Products

### **WŁOCHY (4 products)**

**1. Plakat do salonu – Słoneczna Sycylia**
- `slug`: `sloneczna-sycylia`
- `subtitle`: "Wąska uliczka, pranie schnące w słońcu i zapach porannej kawy. Idealny do jasnego salonu."
- `category`: "Włochy"
- `roomType`: "Do Salonu"
- `basePrice`: 8500 (85 PLN)
- `imageUrl`: Raw Sicilian street scene
- `mockupUrl`: Same photo in frame, hanging in bright living room
- `tags`: ["Włochy", "Do Salonu", "Klimat Retro", "Ciepłe Tony"]

**2. Plakat na ścianę – Rzymskie Wakacje**
- `slug`: `rzymskie-wakacje`
- `subtitle`: "Ciepła, pastelowa fasada kamienicy w sercu Wiecznego Miasta uchwycona w południowym słońcu."
- `category`: "Włochy"
- `roomType`: "Na Ścianę" (flexible room placement)
- `basePrice`: 8900 (89 PLN)
- `imageUrl`: Warm Roman architecture
- `mockupUrl`: Architecture photo in frame, interior setting
- `tags`: ["Włochy", "Architektura", "Pastelowe Barwy", "Ciepła Estetyka"]

**3. Plakat do kuchni – Włoskie Espresso**
- `slug`: `wloskie-espresso`
- `subtitle`: "Detal – filiżanka kawy na marmurowym stoliku w klimatycznej kawiarni. Genialny akcent do jadalni lub kuchni."
- `category`: "Włochy"
- `roomType`: "Do Kuchni"
- `basePrice`: 7900 (79 PLN)
- `imageUrl`: Coffee cup detail
- `mockupUrl`: Coffee detail in frame, kitchen aesthetic
- `tags`: ["Włochy", "Do Kuchni", "Minimalizm", "Akcent"]

**4. Plakat do sypialni – Wybrzeże Amalfi**
- `slug`: `wybrzeze-amalfi`
- `subtitle`: "Głęboki błękit morza skontrastowany z charakterystycznymi, kolorowymi parasolami."
- `category`: "Włochy"
- `roomType`: "Do Sypialni"
- `basePrice`: 9500 (95 PLN)
- `imageUrl`: Amalfi coast with umbrellas
- `mockupUrl`: Coastal scene in frame, bedroom setting
- `tags`: ["Włochy", "Do Sypialni", "Błękit Morza", "Relaksacyjna Estetyka"]

---

### **GRECJA (3 products)**

**5. Plakat nowoczesny – Santorini Blue Hour**
- `slug`: `santorini-blue-hour`
- `subtitle`: "Klasyczna, biała architektura Cyklad na tle morza w trakcie złotej godziny. Ikona stylu z Pinterest."
- `category`: "Grecja"
- `roomType`: "Nowoczesny"
- `basePrice`: 9900 (99 PLN)
- `imageUrl`: Santorini blue hour architecture
- `mockupUrl`: Architecture in frame, modern interior
- `tags`: ["Grecja", "Architektura", "Minimalizm", "Złota Godzina", "Pinterest Aesthetic"]

**6. Plakat minimalistyczny – Greckie Słońce**
- `slug`: `greckie-slonce`
- `subtitle`: "Detal starych, drewnianych drzwi w kolorze indygo na tle idealnie białej, chropowatej ściany."
- `category`: "Grecja"
- `roomType`: "Minimalistyczny"
- `basePrice`: 7900 (79 PLN)
- `imageUrl`: Blue door detail
- `mockupUrl`: Door detail in frame, minimalist setting
- `tags`: ["Grecja", "Minimalizm", "Detal", "Indygo", "Tekstury"]

**7. Plakat na ścianę – Śródziemnomorski Luz**
- `slug`: `srodziemnomorski-luz`
- `subtitle`: "Gałązka oliwna rzucająca głęboki cień na rozgrzany mur. Minimalizm i spokój."
- `category`: "Grecja"
- `roomType`: "Na Ścianę"
- `basePrice`: 8500 (85 PLN)
- `imageUrl`: Olive branch shadow on wall
- `mockupUrl`: Shadow detail in frame, peaceful interior
- `tags`: ["Grecja", "Minimalizm", "Natura", "Cień", "Spokój"]

---

### **HISZPANIA (3 products)**

**8. Plakat do salonu – Architektura Andaluzji**
- `slug`: `architektura-andaluzji`
- `subtitle`: "Ciepłe, terakotowe łuki i gra świateł w hiszpańskim patio."
- `category`: "Hiszpania"
- `roomType`: "Do Salonu"
- `basePrice`: 8900 (89 PLN)
- `imageUrl`: Andalusian architecture
- `mockupUrl`: Architecture in frame, living room setting
- `tags`: ["Hiszpania", "Do Salonu", "Architektura", "Terakota", "Światło"]

**9. Plakat botaniczny – Palma w Barcelonie**
- `slug`: `palma-w-barcelonie`
- `subtitle`: "Liście palmy na tle bezchmurnego, pastelowego nieba. Przynosi natychmiastowe poczucie letniej sjesty."
- `category`: "Hiszpania"
- `roomType`: "Botaniczny"
- `basePrice`: 8300 (83 PLN)
- `imageUrl`: Palm leaves against sky
- `mockupUrl`: Palm in frame, bohemian interior
- `tags`: ["Hiszpania", "Botanika", "Pastelowe", "Egzotyka", "Sjesta"]

**10. Plakat boho – Hiszpańskie Wybrzeże**
- `slug`: `hiszpanskie-wybrzeze`
- `subtitle`: "Dzika, piaszczysta plaża na Costa Brava z trawami kołyszącymi się na wietrze. Idealny do wnętrz w stylu skandynawskim lub boho."
- `category`: "Hiszpania"
- `roomType`: "Boho"
- `basePrice`: 8700 (87 PLN)
- `imageUrl`: Wild beach with grasses
- `mockupUrl`: Beach scene in frame, scandinavian/boho interior
- `tags`: ["Hiszpania", "Plaża", "Boho", "Skandynawskie", "Natura"]

---

## Section Structure

### **Container & Header**

```tsx
<section id="products-section" className="container mx-auto px-6 lg:px-8 max-w-[1400px] py-20 md:py-32 border-t border-black/10">
  {/* Header with Title + Subheading */}
  <div className="mb-12 md:mb-16 text-center">
    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4 text-black">
      Limitowana kolekcja 10 ujęć. Wybierz swój kawałek Południa.
    </h2>
    <p className="font-sans text-sm md:text-base leading-relaxed text-zinc-600 max-w-2xl mx-auto">
      Kliknij w plakat, aby zobaczyć szczegóły, lub dodaj go od razu do koszyka. 
      Wszystkie kadry idealnie łączą się ze sobą, tworząc spójne domowe galerie ścienne.
    </p>
  </div>

  {/* Product Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
    {/* PosterCard components (10 cards) */}
  </div>
</section>
```

**Styling:**
- Container: `container mx-auto px-6 lg:px-8 max-w-[1400px]`
- Vertical padding: `py-20 md:py-32`
- Top border: `border-t border-black/10` (divider)
- Grid responsive: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Grid gap: `gap-6 md:gap-8`

---

## Product Card (Updated PosterCard)

### **Card Layout**

Each card displays:

1. **Image container** (default: mockup image)
   - Aspect ratio: portrait/landscape/square (depends on image)
   - Hover effect: switches to raw photo
   - Scale on hover: `group-hover:scale-105` (subtle zoom)
   - Mockup badge: Shows "Wizualizacja" when mockup displayed

2. **Card metadata** (below image)
   - `title` (SEO-optimized, larger font)
   - `subtitle` (benefit/mood description, smaller, muted)
   - Tags (room type, country, aesthetic)
   - Price (`basePrice` formatted with currency)
   - "Dodaj do koszyka" button (with add-to-cart functionality)

### **Card Styling**

```tsx
<Link href={`/plakat/${slug}`} className="group flex flex-col gap-4 cursor-pointer">
  {/* Image Container */}
  <div className="relative overflow-hidden bg-zinc-100 aspect-[3/4]"
    onMouseEnter={() => setShowMockup(true)}
    onMouseLeave={() => setShowMockup(false)}>
    <Image
      src={showMockup ? mockupUrl : imageUrl}
      alt={title}
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-105"
    />
    {showMockup && (
      <div className="absolute bottom-4 right-4 bg-black text-white px-3 py-1 text-[9px] uppercase rounded-none">
        Wizualizacja
      </div>
    )}
  </div>

  {/* Card Metadata */}
  <div>
    <h3 className="font-sans text-base md:text-lg font-semibold text-black mb-1">
      {title}
    </h3>
    <p className="font-sans text-xs md:text-sm leading-relaxed text-zinc-600 mb-3">
      {subtitle}
    </p>
    {tags && (
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag) => (
          <span key={tag} className="text-[10px] uppercase tracking-[0.1em] text-zinc-500">
            {tag}
          </span>
        ))}
      </div>
    )}
    <div className="flex items-center justify-between mb-4">
      <span className="font-semibold text-black">
        {price}
      </span>
      <span className="text-[10px] text-zinc-500 uppercase tracking-[0.1em]">
        Cyfrowy plik JPG/PDF
      </span>
    </div>
    <Button className="w-full rounded-none bg-black text-white hover:bg-zinc-800 uppercase tracking-[0.15em] text-xs py-4">
      Dodaj do koszyka
    </Button>
  </div>
</Link>
```

---

## Responsive Behavior

| Breakpoint | Columns | Gap | Notes |
|-----------|---------|-----|-------|
| Mobile (< 768px) | 1 | gap-6 | Full-width cards, touch-friendly |
| Tablet (768px - 1024px) | 2 | gap-8 | Two products per row |
| Desktop (> 1024px) | 3 | gap-8 | Three products per row (3-3-4 distribution) |

---

## Hover Effects (Desktop Only)

1. **Image hover:**
   - Mockup → Raw photo transition (smooth)
   - Scale up slightly (`group-hover:scale-105`)
   - "Wizualizacja" badge shows on mockup, hides on raw photo

2. **Card hover:**
   - Slight visual feedback (optional: shadow, border change)
   - "Dodaj do koszyka" button remains accessible

---

## Product Placement in Page

**Page Flow:**
1. Header
2. Hero Section (digital messaging)
3. Value Proposition Section (3 benefit cards)
4. **→ PRODUCT CATALOG (NEW - 10 cards in grid)** ← INSERT HERE
5. FAQ Section (existing)
6. Footer (if applicable)

The entire product discovery and purchase experience happens on one page.

---

## Cart Integration (MVP)

**"Dodaj do koszyka" Button:**
- Clicking adds product to cart
- Cart lives on same page (slide-up from bottom or sidebar)
- Shows selected items, total price, payment button
- Payment via BLIK (no redirect)
- After successful payment, system sends download links via email
- User never leaves homepage

**Future enhancement:** Detailed checkout flow with shipping options (if expanding beyond digital)

---

## SEO & Marketing Benefits

**Product titles** target room-based intent:
- "Plakat do salonu" (targeting: living room poster search)
- "Plakat do kuchni" (targeting: kitchen poster search)
- "Plakat do sypialni" (targeting: bedroom poster search)

**Tags** enable:
- Faceted filtering (future feature)
- Related product suggestions
- Content organization (by country, room, style)

**Subtitles** build emotional connection and communicate product fit

---

## Accessibility & Best Practices

- **Semantic HTML:** Links wrap cards, headings use proper hierarchy (h2, h3)
- **Image alt text:** Descriptive alt text on all images
- **Keyboard navigation:** Cards are clickable/link elements, fully navigable
- **Color contrast:** Black text on white meets WCAG AA
- **Responsive images:** `sizes` attribute for optimized loading across devices
- **Mobile experience:** Touch-friendly, no hover-dependent functionality

---

## Testing Checklist

- [ ] All 10 products render in correct grid layout (1/2/3 columns)
- [ ] Hover effects work on desktop (mockup ↔ raw photo switch)
- [ ] Product titles, subtitles, prices all display correctly
- [ ] Tags display and are properly formatted
- [ ] "Dodaj do koszyka" button is visible and clickable
- [ ] Grid layout is responsive on mobile (375px), tablet (768px), desktop (1440px)
- [ ] Images load without errors (mockup and raw photo)
- [ ] Product data is properly mapped from new dataset
- [ ] No console errors or TypeScript warnings
- [ ] Section integrates cleanly between Value Proposition and FAQ

---

## Success Criteria

1. ✅ All 10 products display in optimized grid layout
2. ✅ Mockup-first presentation with hover-to-reveal raw photo
3. ✅ SEO-optimized titles + emotional subtitles visible
4. ✅ Room type, country, aesthetic tags displayed
5. ✅ Price and "Cyfrowy plik" label shown
6. ✅ "Dodaj do koszyka" button functional
7. ✅ Responsive design works on all devices
8. ✅ No page navigation required—entire shop on homepage
9. ✅ Polish language renders correctly
10. ✅ Cart/checkout accessible on same page

---

## Notes

- This redesign transforms the homepage into a **one-page shop**—no separate product pages required for MVP
- Product images will be sourced from Unsplash with mockup positioning to show styled room contexts
- Hover effect (mockup ↔ raw photo) builds confidence in photo quality without needing separate detail pages
- SEO-friendly titles + room-based positioning should drive organic search traffic ("plakat do salonu", "plakat do kuchni", etc.)
- Simple, elegant design maintains minimalist aesthetic while optimizing for conversions
