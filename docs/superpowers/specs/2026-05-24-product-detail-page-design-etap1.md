# Product Detail Page Design Spec - Etap 1 (Struktura & Layout)
**Date:** May 24, 2026  
**Project:** Poster Shop - Product Detail Page  
**Scope:** Dynamic product page template, layout, components, responsive behavior  
**Status:** Ready for Implementation  
**Note:** Etap 1 focuses on structure/layout. Etap 2 (copywriting optimization per product) comes later.

---

## Overview

Create a dynamic product detail page template (`/plakat/[slug]`) that serves all 10 products. The page is structured as a sales funnel:
1. **Above the fold** (visual + purchase decision) - Two-column layout with gallery + purchase card
2. **Storytelling** (emotional connection) - Product history and use case scenarios
3. **Technical confidence** (remove friction) - Format specs, DPI, FAQ
4. **Cross-sell** (increase AOV) - Related products from `relatedSlugs`

The page leverages existing product data from `lib/posters.ts` and requires minimal new data fields (storytelling copy will be added in Etap 2).

---

## Design Goals

1. **Reduce purchase hesitation** - Gallery shows product in realistic contexts (mockups) + raw quality detail
2. **Build emotional connection** - Storytelling section creates narrative around each product
3. **Address technical concerns** - FAQ + format specs answer common questions before customer reaches cart
4. **Increase order value** - Related products suggest complementary purchases
5. **SEO long-tail positioning** - Meta tags, headings, and content optimize for "plakaty do salonu", "plakaty XXL", etc. (Etap 2)
6. **Mobile-friendly** - Responsive layout works seamlessly from mobile to desktop

---

## Route & File Structure

### **Dynamic Route**
```
app/plakat/[slug]/page.tsx     (Server component - fetches product data)
app/plakat/[slug]/layout.tsx   (Optional - shared layout)
```

### **Component Architecture**
```
components/
├── shop/
│   ├── ProductDetail.tsx           (Main page wrapper)
│   ├── ProductGallery.tsx          (4-image grid)
│   ├── PurchaseCard.tsx            (Right column - purchase info)
│   ├── ProductStory.tsx            (Storytelling section)
│   ├── TechnicalInfo.tsx           (Static specs)
│   ├── FAQSection.tsx              (Static FAQ)
│   └── RelatedProducts.tsx         (Cross-sell grid)
```

### **Data**
- Source: `lib/posters.ts` (existing product data)
- Helper function: `getPosterBySlug(slug: string)`
- Gallery: Uses `gallery` array (4 images)
- Related: Uses `relatedSlugs` array (static)
- Story/UseCase: Will be added to Poster interface in Etap 2

---

## Page Layout & Sections

### **Section 1: Breadcrumbs + Page Header**

**Component:** Inline (not separate component)

```tsx
<div className="container mx-auto px-6 lg:px-8 max-w-[1400px] py-8 md:py-12">
  {/* Breadcrumbs */}
  <nav className="flex items-center gap-2 text-xs md:text-sm text-zinc-600 mb-8">
    <Link href="/">Sklep</Link>
    <span>/</span>
    <Link href="/">Plakaty do druku</Link>
    <span>/</span>
    <span className="text-black font-semibold">{poster.tags[0]}</span> {/* First tag = country */}
  </nav>

  {/* Main content area - two columns on desktop */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
    {/* LEFT COLUMN: GALLERY */}
    <ProductGallery images={poster.gallery} title={poster.title} />

    {/* RIGHT COLUMN: PURCHASE CARD */}
    <PurchaseCard poster={poster} />
  </div>
</div>
```

---

### **Section 2: ProductGallery Component**

**Purpose:** Display 4 images in 2x2 grid showing product in different contexts

**Props:**
```typescript
interface ProductGalleryProps {
  images: string[];  // 4 images from poster.gallery
  title: string;     // for alt text
}
```

**Layout:**
- Desktop: `grid-cols-2 gap-4`
- Mobile: `grid-cols-1` (stacked vertically)
- Each image: Aspect ratio `aspect-[3/4]` or auto based on image

**Functionality:**
- No lightbox/modal (per spec - grid layout)
- All 4 images visible at once on desktop
- Hover effect: subtle zoom (`group-hover:scale-105`)
- Lazy loading via Next.js `Image` component

**Code Structure:**
```tsx
export function ProductGallery({ images, title }: ProductGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {images.map((image, idx) => (
        <div key={idx} className="group overflow-hidden bg-zinc-100">
          <Image
            src={image}
            alt={`${title} - view ${idx + 1}`}
            width={600}
            height={800}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
```

---

### **Section 3: PurchaseCard Component**

**Purpose:** Right column with product info, price, and CTA button

**Props:**
```typescript
interface PurchaseCardProps {
  poster: Poster;
}
```

**Content (in order):**

**3.1 Product Title (H1)**
```tsx
<h1 className="font-serif text-3xl md:text-4xl mb-4 text-black">
  {poster.title}
  <span className="block text-base font-sans font-normal text-zinc-600">Produkt Cyfrowy</span>
</h1>
```

**3.2 Price**
```tsx
<div className="mb-6">
  <span className="font-serif text-4xl text-black">{formatPrice(poster.basePrice)}</span>
  <p className="text-xs text-zinc-600 mt-2">Plik cyfrowy JPG/PDF do pobrania</p>
</div>
```

**3.3 Short Emotional Description**
```tsx
<p className="font-sans text-base leading-relaxed text-zinc-700 mb-8">
  {poster.subtitle}
</p>
```

**3.4 Three Main Highlights (with icons)**
```tsx
<div className="space-y-4 mb-8 pb-8 border-b border-black/10">
  <div className="flex items-start gap-4">
    <span className="text-2xl">⚡</span>
    <div>
      <p className="font-semibold text-black text-sm">Błyskawiczna dostawa</p>
      <p className="text-xs text-zinc-600">Link do pliku na Twoim e-mailu w 60 sekund po opłaceniu</p>
    </div>
  </div>

  <div className="flex items-start gap-4">
    <span className="text-2xl">📐</span>
    <div>
      <p className="font-semibold text-black text-sm">Uniwersalny format</p>
      <p className="text-xs text-zinc-600">Jeden plik pozwala na bezstratny druk od A4 aż do XXL (50x70 / B2)</p>
    </div>
  </div>

  <div className="flex items-start gap-4">
    <span className="text-2xl">🌍</span>
    <div>
      <p className="font-semibold text-black text-sm">100% Autentyczność</p>
      <p className="text-xs text-zinc-600">Fotografia wykonana osobiście, niedostępna w masowych sieciówkach</p>
    </div>
  </div>
</div>
```

**3.5 Disclaimer Label**
```tsx
<div className="bg-zinc-50 border border-black/10 p-4 mb-6 rounded-none">
  <p className="text-xs text-zinc-700">
    <strong>Uwaga:</strong> Kupujesz produkt cyfrowy w wysokiej rozdzielczości do samodzielnego wydruku. 
    Rama oraz druk fizyczny nie są częścią zamówienia.
  </p>
</div>
```

**3.6 CTA Button**
```tsx
<Button 
  className="w-full rounded-none bg-black text-white hover:bg-zinc-800 py-6 uppercase tracking-[0.15em] font-semibold text-sm"
  onClick={() => addToCart(poster.id)}
>
  KUP PLAKAT I POBIERZ TERAZ
</Button>
```

**3.7 Trust Badges (Optional)**
```tsx
<div className="mt-6 text-center space-y-2">
  <p className="text-xs text-zinc-600">✓ Szybka dostawa</p>
  <p className="text-xs text-zinc-600">✓ Bezpieczna płatność (BLIK, Przelew)</p>
</div>
```

---

### **Section 4: ProductStory Component**

**Purpose:** Storytelling section - build emotional connection

**Props:**
```typescript
interface ProductStoryProps {
  poster: Poster;
}
```

**Structure (full-width below gallery + card):**

```tsx
<section className="container mx-auto px-6 lg:px-8 max-w-[1400px] py-16 md:py-24 border-t border-black/10">
  <div className="max-w-2xl mx-auto">
    <h2 className="font-serif text-3xl md:text-4xl mb-6 text-black">
      Historia jednego kadru
    </h2>
    
    <p className="font-sans text-base leading-relaxed text-zinc-700 mb-6">
      {poster.description}
    </p>

    {/* Sekcja: Gdzie sprawdzi się ten plakat? */}
    <h3 className="font-serif text-2xl mt-12 mb-4 text-black">
      Stwórz domową galerię w stylu śródziemnomorskim
    </h3>
    
    <p className="font-sans text-base leading-relaxed text-zinc-700">
      [Placeholder for Etap 2 - use case scenarios]
    </p>
  </div>
</section>
```

**Note:** Actual story content (`poster.description`, use cases, etc.) will be completed in Etap 2. For Etap 1, use existing `description` field or placeholder text.

---

### **Section 5: TechnicalInfo Component**

**Purpose:** Static technical specifications (same for all products)

**Props:** None (static)

**Structure:**

```tsx
<section className="container mx-auto px-6 lg:px-8 max-w-[1400px] py-16 md:py-24 border-t border-black/10">
  <h2 className="font-serif text-3xl md:text-4xl mb-12 text-black">
    Informacje techniczne
  </h2>

  <div className="max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>
      <h3 className="font-semibold text-black mb-2">Format pliku</h3>
      <p className="text-sm text-zinc-700">
        Bezstratny format cyfrowy JPG oraz przygotowany do druku PDF w przestrzeni barwnej CMYK.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-black mb-2">Rozdzielczość</h3>
      <p className="text-sm text-zinc-700">
        Ponad 300 DPI (maksymalna jakość druku).
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-black mb-2">Maksymalny rozmiar druku</h3>
      <p className="text-sm text-zinc-700">
        Przygotowany pod plakaty XXL do druku – idealna ostrość do formatu 50x70 cm, B2, a nawet B1.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-black mb-2">Elastyczność skalowania</h3>
      <p className="text-sm text-zinc-700">
        Plik możesz wydrukować w mniejszych formatach (A4, A3, A2) – drukarnia automatycznie dopasuje kadr.
      </p>
    </div>
  </div>
</section>
```

---

### **Section 6: FAQSection Component**

**Purpose:** Static FAQ (same for all products)

**Props:** None (static)

**Structure:**

```tsx
<section className="container mx-auto px-6 lg:px-8 max-w-[1400px] py-16 md:py-24 border-t border-black/10">
  <h2 className="font-serif text-3xl md:text-4xl mb-12 text-black">
    Pytania i odpowiedzi
  </h2>

  <div className="max-w-2xl space-y-8">
    <FAQItem
      question="Czy mogę wydrukować plakat więcej niż raz?"
      answer="Tak! Plik kupujesz na własny użytek do końca życia. Jeśli po roku zechcesz zmienić ramę na większą lub wydrukować ten sam plakat jako prezent – możesz to zrobić."
    />

    <FAQItem
      question="Gdzie mam to wydrukować?"
      answer="Plik możesz wgrać na stronę dowolnej drukarni internetowej (np. Grupowa, Drukomat, Piga) lub zgrać na pendrive i podejść do najbliższego cyfrowego punktu ksero w Twoim mieście. Koszt wydruku formatu 50x70 na dobrym papierze to zazwyczaj kilkanaście złotych."
    />

    <FAQItem
      question="Jaki papier polecacie do wydruku?"
      answer="Polecamy papier matowy o gramaturze 200-300 g/m² z certyfikacją FSC. Unika się papieru błyszczącego – robi się mało estetycznie. Druk pigmentowy jest najtrwalszy i nie blaknie przez lata."
    />
  </div>
</section>
```

**FAQItem Component:**
```tsx
interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-black/10 pb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left"
      >
        <h3 className="font-semibold text-black text-base">{question}</h3>
        <span className="text-zinc-600">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <p className="text-sm text-zinc-700 leading-relaxed mt-4">
          {answer}
        </p>
      )}
    </div>
  );
}
```

---

### **Section 7: RelatedProducts Component**

**Purpose:** Cross-sell section with products from `relatedSlugs`

**Props:**
```typescript
interface RelatedProductsProps {
  relatedSlugs: string[];
  currentSlug: string;  // to exclude current product
}
```

**Structure:**

```tsx
<section className="container mx-auto px-6 lg:px-8 max-w-[1400px] py-16 md:py-24 border-t border-black/10">
  <h2 className="font-serif text-3xl md:text-4xl mb-12 text-black">
    Pasuje do zestawu
  </h2>

  <p className="text-base text-zinc-700 mb-12 max-w-2xl">
    Te plakaty mają podobne kolory i styl. Jeśli kupisz 2-3 pliki, Twoja ściana będzie wyglądać profesjonalnie.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
    {relatedProducts.map((poster) => (
      <PosterCard
        key={poster.id}
        slug={poster.slug}
        title={poster.title}
        subtitle={poster.subtitle}
        imageUrl={poster.imageUrl}
        mockupUrl={poster.mockupUrl}
        price={formatPrice(poster.basePrice)}
        aspectRatio={poster.aspectRatio}
        tags={poster.tags}
      />
    ))}
  </div>
</section>
```

**Fetching related products:**
```tsx
// In page.tsx
const relatedProducts = poster.relatedSlugs
  .map(slug => getPosterBySlug(slug))
  .filter((p): p is Poster => p !== undefined)
  .slice(0, 3);  // Max 3 products
```

---

## Responsive Behavior

### **Mobile (< 768px)**
- Single column layout
- Gallery stacks vertically (1 column)
- Purchase card below gallery
- Full-width story, tech info, FAQ
- Related products: 1 column grid

### **Tablet (768px - 1024px)**
- Single column (gallery full-width above card, or narrow two-col)
- Story, tech info, FAQ full-width
- Related products: 2 columns

### **Desktop (> 1024px)**
- Two-column: Gallery (left 55-60%), Card (right 40-45%)
- Story, tech info, FAQ full-width below
- Related products: 3 columns

---

## Data & Props Flow

```
app/plakat/[slug]/page.tsx (Server Component)
  ├─ getPosterBySlug(slug) → poster data
  ├─ relatedProducts = poster.relatedSlugs mapped to Poster objects
  └─ Render:
      ├─ ProductGallery (images, title)
      ├─ PurchaseCard (poster)
      ├─ ProductStory (poster)
      ├─ TechnicalInfo ()
      ├─ FAQSection ()
      └─ RelatedProducts (relatedProducts, currentSlug)
```

---

## Component Checklist

- [ ] **ProductGallery** - 2x2 grid, lazy loading, hover effect
- [ ] **PurchaseCard** - Title, price, description, highlights, disclaimer, CTA
- [ ] **ProductStory** - H2 title, description section, use case section (placeholder for Etap 2)
- [ ] **TechnicalInfo** - Static 4-item grid (format, resolution, max size, scaling)
- [ ] **FAQSection** - Collapsible accordion with 3 Q&A items
- [ ] **FAQItem** - Reusable FAQ item with expand/collapse
- [ ] **RelatedProducts** - Grid 1/2/3 columns, uses PosterCard component, max 3 items
- [ ] **Product Page Layout** - Combines all sections, breadcrumbs, two-column above-fold

---

## Styling Guidelines

- **Minimalist monochrome:** No shadows, 0px border-radius, 1px borders `border-black/10`
- **Typography:** Serif headings (Playfair), sans body (Inter)
- **Colors:** Black text, `text-zinc-700` for secondary, `text-zinc-600` for tertiary
- **Spacing:** Consistent `py-16 md:py-24` between sections, `gap-6 md:gap-8` in grids
- **Buttons:** `rounded-none`, full-width on mobile, uppercase, `tracking-[0.15em]`

---

## SEO & Meta Tags

(Implementation detail for page.tsx)
```tsx
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const poster = getPosterBySlug(params.slug);
  
  return {
    title: `${poster?.title} | Poster Shop`,
    description: poster?.subtitle,
    // Additional meta tags added in Etap 2 (SEO optimization)
  };
}
```

---

## Testing Checklist

- [ ] Page loads correctly for all 10 products (test 3+ different slugs)
- [ ] Gallery displays all 4 images in 2x2 grid (desktop)
- [ ] Gallery stacks vertically on mobile
- [ ] Purchase card displays all sections (title, price, description, highlights, disclaimer, CTA)
- [ ] Breadcrumbs show correct country (first tag)
- [ ] Story section renders (description + use case placeholder)
- [ ] Technical info displays all 4 items
- [ ] FAQ items expand/collapse on click
- [ ] Related products fetch correctly from `relatedSlugs`
- [ ] Related products max out at 3 items
- [ ] Related products use PosterCard component correctly
- [ ] No console errors
- [ ] Responsive layout works on mobile/tablet/desktop
- [ ] All links (breadcrumbs, related products) work

---

## Success Criteria

1. ✅ Dynamic route `/plakat/[slug]` works for all 10 products
2. ✅ Gallery displays 4 images in 2x2 grid (desktop) / 1 column (mobile)
3. ✅ Purchase card shows all required sections
4. ✅ Storytelling section renders with description
5. ✅ Technical info is static and correct
6. ✅ FAQ section is interactive (expand/collapse)
7. ✅ Related products display from `relatedSlugs`
8. ✅ Responsive design works across all breakpoints
9. ✅ Minimalist design aesthetic maintained
10. ✅ No TypeScript errors, no console errors

---

## Notes for Etap 1 vs Etap 2

**Etap 1 (This phase):**
- Structure, layout, components
- Static content (tech info, FAQ)
- Placeholder story content
- Related products from `relatedSlugs`

**Etap 2 (Future phase):**
- SEO optimization (meta tags, h2/h3 hierarchy, keyword density)
- Unique story copy per product (where shot, emotional hook)
- Unique use case copy per product (room-specific recommendations)
- Product-specific FAQ (if needed)
- Schema markup / structured data

---

## File Organization

```
app/
├── plakat/
│   └── [slug]/
│       └── page.tsx              (Main product page, Server Component)

components/shop/
├── ProductDetail.tsx             (Wrapper - optional, or inline in page.tsx)
├── ProductGallery.tsx            (Gallery grid)
├── PurchaseCard.tsx              (Right column card)
├── ProductStory.tsx              (Storytelling section)
├── TechnicalInfo.tsx             (Static specs)
├── FAQSection.tsx                (FAQ section)
├── FAQItem.tsx                   (Individual FAQ item)
└── RelatedProducts.tsx           (Cross-sell grid)
```

---

## Dependencies & Assumptions

- `lib/posters.ts` has `getPosterBySlug(slug)` function ✅ (already added)
- `PosterCard` component exists and is reusable ✅
- `formatPrice()` function exists ✅
- `Button` component from shadcn ✅
- `Image` component from Next.js ✅
- All 10 products have valid `gallery` (4 images) and `relatedSlugs` arrays
- Products have `description` field (will expand in Etap 2)

---

## Cart Integration (Out of Scope for Etap 1)

The "KUP PLAKAT I POBIERZ TERAZ" button will trigger `addToCart(poster.id)` which will be connected to cart state management. Cart logic (slide-out, BLIK payment, email delivery) is separate from this page design.
