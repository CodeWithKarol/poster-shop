# Value Proposition Section Design Spec
**Date:** May 24, 2026  
**Project:** Poster Shop - Value Proposition Section  
**Scope:** "Dlaczego te ujęcia odmienią Twój dom?" Benefits Section  
**Status:** Ready for Implementation

---

## Overview
Add a new "Value Proposition" section immediately after the Hero section that emphasizes authenticity, aesthetic appeal, and printing flexibility. The section features 3 benefit cards in a responsive grid layout with icons, headings, and descriptive text. Reinforces brand messaging and eliminates concerns about generic stock images or mass-market alternatives.

---

## Design Goals
1. **Build Trust:** Communicate that these are authentic, original photographs—not stock images
2. **Aesthetic Appeal:** Show that the visual style matches modern interior design trends
3. **Value Clarity:** Emphasize the flexibility and long-term value of digital file ownership
4. **Reduce Friction:** Address unspoken customer objections (generic content, limited customization)
5. **Emotional Connection:** Use warm, personal language to reinforce artisan/authentic positioning

---

## Section Architecture

### **Section Container**
```tsx
<section className="container mx-auto px-6 lg:px-8 max-w-[1400px] py-20 md:py-32 border-t border-black/10">
```

**Properties:**
- Container width: `container mx-auto` (full-width with max breakpoint)
- Horizontal padding: `px-6 lg:px-8` (matches Hero and Products sections)
- Max width: `max-w-[1400px]`
- Vertical padding: `py-20 md:py-32` (matches Products section)
- Top border: `border-t border-black/10` (divider, consistent with Products section styling)

---

### **Section Header**

**H2 Heading:**
```
Dlaczego te ujęcia odmienią Twój dom?
```

**Styling:**
- Font: `font-serif` (Playfair Display)
- Size: `text-3xl md:text-4xl lg:text-5xl`
- Color: `text-black`
- Margin-bottom: `mb-12 md:mb-16`
- Alignment: Left-aligned (default)

**Purpose:** Lead question that sets up the three benefit cards below

---

### **Cards Grid Container**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
```

**Responsive Behavior:**
- Mobile (default): 1 column (full-width cards)
- Tablet (md): 2 columns
- Desktop (lg): 3 columns
- Gap between cards: `gap-6 md:gap-8` (horizontal and vertical spacing)

---

## Benefit Card Design

### **Card Container**
```tsx
<div className="border border-black/10 p-6 md:p-8">
```

**Styling:**
- Border: `border border-black/10` (1px subtle border, maintains minimalist aesthetic)
- Padding: `p-6 md:p-8` (internal spacing for content)
- Background: None (white/transparent)
- Border-radius: `rounded-none` (no rounding per design system)

### **Card Content Structure**

Each card contains, in order:

**1. Icon Element**
```tsx
<div className="mb-4">
  <IconComponent className="w-8 h-8 text-black" />
</div>
```

**Styling:**
- Width/Height: `w-8 h-8` (32px icons)
- Color: `text-black` (high contrast)
- Margin-bottom: `mb-4` (spacing before heading)
- Source: lucide-react icons

**2. Card Heading (H3)**
```tsx
<h3 className="font-sans text-lg md:text-xl font-semibold text-black mb-3">
  [Heading Text]
</h3>
```

**Styling:**
- Font: `font-sans` (Inter/Geist)
- Size: `text-lg md:text-xl` (responsive scaling)
- Weight: `font-semibold`
- Color: `text-black`
- Margin-bottom: `mb-3` (spacing before description)

**3. Card Description Text**
```tsx
<p className="font-sans text-sm md:text-base leading-relaxed text-zinc-700">
  [Description Text]
</p>
```

**Styling:**
- Font: `font-sans` (Inter/Geist)
- Size: `text-sm md:text-base` (responsive)
- Line-height: `leading-relaxed` (improved readability)
- Color: `text-zinc-700` (muted black for secondary text)

---

## Three Benefit Cards

### **Card 1: Authenticity**

**Icon:** `Camera` (from lucide-react)

**Heading:**
```
100% autorska fotografia
```

**Description:**
```
Każdy plakat to zatrzymany w kadrze, autentyczny moment z moich podróży. 
Nie znajdziesz ich w bankach zdjęć ani masowych sieciówkach. 
To unikalne kadry – od wąskich, sycylijskich uliczek pachnących kawą, 
po głęboki błękit greckiego nieba.
```

**Purpose:** Eliminate concern about generic stock images. Emphasize originality and personal connection.

---

### **Card 2: Aesthetic Appeal**

**Icon:** `Palette` (from lucide-react)

**Heading:**
```
Klimat jak z najpiękniejszych profili na Pinterest
```

**Description:**
```
Minimalistyczne formy, ciepłe, pastelowe barwy i naturalne światło. 
Te plakaty do salonu, sypialni czy biura idealnie wpisują się 
w nowoczesne, jasne wnętrza, dodając im elegancji i wakacyjnego luzu.
```

**Purpose:** Appeal to aesthetic sensibilities and visual trends. Show fit with modern home design.

---

### **Card 3: Flexibility & Control**

**Icon:** `Layers` (from lucide-react)

**Heading:**
```
Drukujesz tak, jak lubisz
```

**Description:**
```
Kupujesz raz, zyskujesz plik na zawsze. Otrzymujesz cyfrowy format 
doskonałej jakości, który możesz wydrukować na dowolnym materiale – 
od klasycznego papieru plakatowego po płótno, i w dokładnie takim rozmiarze, 
jakiego potrzebuje Twoja rama.
```

**Purpose:** Highlight value of digital ownership, customization freedom, and long-term flexibility.

---

## Responsive Behavior Checklist

- [ ] **Mobile (375px):** Cards display in single column, full width minus padding
- [ ] **Tablet (768px):** Cards display in 2-column grid with proper gap spacing
- [ ] **Desktop (1440px):** Cards display in 3-column grid, evenly distributed
- [ ] **Large Desktop (1920px):** Cards maintain 3-column layout within max-width container
- [ ] **Text scaling:** Headings and body text scale appropriately at all breakpoints
- [ ] **Icon sizing:** Icons remain legible at all sizes (w-8 h-8 fixed)
- [ ] **No overflow:** Content doesn't exceed card boundaries on any viewport
- [ ] **Border visibility:** 1px borders are visible and consistent across all sizes

---

## Accessibility & Best Practices

- **Semantic HTML:** Use `<h2>` for section heading, `<h3>` for card headings
- **Icon Labels:** Icons are decorative (no alt text needed since headings provide context)
- **Color Contrast:** Black text on white meets WCAG AA standards
- **Readable Font Size:** Base size `text-sm md:text-base` ensures readability
- **Line Height:** `leading-relaxed` improves text readability
- **Spacing:** Consistent padding and gaps create visual hierarchy

---

## Component Dependencies

- **lucide-react icons:** `Camera`, `Palette`, `Layers`
  - Already installed in project
  - Used consistently with existing icon patterns (see Hero section ArrowRight icon)

- **Tailwind CSS classes:** All existing, no new tokens needed
  - Border utilities: `border`, `border-black/10`
  - Spacing: `p-6`, `p-8`, `mb-3`, `mb-4`, `mb-12`, `mb-16`, `gap-6`, `gap-8`
  - Typography: `font-serif`, `font-sans`, `text-lg`, `text-xl`, etc.
  - Color: `text-black`, `text-zinc-700`

---

## Files to Create/Modify

**Files to Modify:**
- `app/page.tsx` — Add new section after Hero, before Products grid

**No new files required.** Component can be inline or later extracted to `components/shop/BenefitsSection.tsx` if reusability is needed.

---

## Positioning in Page Flow

1. **Header** (existing)
2. **Hero Section** (recently updated with digital messaging)
3. **→ VALUE PROPOSITION SECTION (NEW)** ← Insert here
4. **Products Section** ("Kolekcja Premierowa" grid)
5. **FAQ Section** (existing)
6. **Footer** (if applicable)

---

## Design System Consistency

✅ **Minimalist Monochrome Theme:**
- No box shadows
- 0px border radius
- 1px borders (`border-black/10`)
- High contrast (black/white/grays)
- Serif font for headings (Playfair Display)
- Sans font for body (Inter/Geist)

✅ **Matches Existing Sections:**
- Same container padding (`px-6 lg:px-8`)
- Same vertical spacing (`py-20 md:py-32`)
- Same border divider style (`border-t border-black/10`)
- Consistent typography scaling (responsive)

✅ **Polish Language Support:**
- All text provided in Polish
- Font already includes `latin-ext` for Polish characters

---

## Testing Checklist

- [ ] Section renders correctly on mobile, tablet, desktop
- [ ] Icons display properly (no missing/broken icons)
- [ ] Text is readable at all sizes
- [ ] Cards align properly in 1-column, 2-column, 3-column layouts
- [ ] Border color is visible (not too light/dark)
- [ ] Spacing between cards and text is consistent
- [ ] No horizontal scrolling on mobile
- [ ] Section flows naturally between Hero and Products
- [ ] TypeScript compiles without errors
- [ ] ESLint passes (no warnings related to new section)

---

## Success Criteria

1. ✅ **Section renders** on all device sizes without layout issues
2. ✅ **Copy is compelling** and addresses customer objections (authenticity, aesthetics, flexibility)
3. ✅ **Visual hierarchy** is clear (icon → heading → description)
4. ✅ **Design matches** minimalist aesthetic and existing sections
5. ✅ **No new dependencies** required
6. ✅ **Responsive grid** works seamlessly across breakpoints
7. ✅ **Polish language** displays correctly (accents, special characters)

---

## Notes

- This section directly addresses the stated goal: "Wyeliminowanie myślenia 'poszukam czegoś darmowego w sieci' lub 'pójdę do sieciówki'."
- The three benefits are complementary and together build a complete value story: original art + beautiful aesthetics + flexible customization
- Copy emphasizes emotional and practical benefits without being overly salesy
- Card-based layout with icons provides visual breaks while maintaining editorial simplicity
