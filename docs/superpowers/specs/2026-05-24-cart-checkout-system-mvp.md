# Cart & Checkout System - MVP Design Spec
**Date:** May 24, 2026  
**Project:** Poster Shop - Digital Poster E-Commerce MVP  
**Scope:** Complete checkout flow from cart → payment → download  
**Status:** Ready for Spec Review  

---

## Executive Summary

This spec defines the MVP cart and checkout system optimized for **digital poster products** with zero logistics overhead. The system uses a simplified cart model (no variants), Stripe Payment Element for payment methods (BLIK + cards), and stateless download links secured via hashed tokens stored in secure cookies.

**Key constraints:**
- Minimal form fields (Name + Email only)
- One-page checkout (no multi-step)
- Instant download links (no email queue)
- localStorage cart persistence (MVP-level)
- Secure download verification via hashed tokens

---

## 1. Cart Data Model

### CartContext (Simplified for Digital Products)

**CartItem Interface:**
```typescript
interface CartItem {
  id: string;           // equals slug (unique per poster)
  slug: string;         // e.g., "sloneczna-sycylia"
  title: string;        // full product name
  artist: string;       // photographer name
  imageUrl: string;     // thumbnail for cart display
  price: number;        // in grosze (e.g., 3900 = 39.00 PLN)
  addedAt: number;      // timestamp for analytics
}
```

**Key difference from existing CartContext:**
- ❌ NO `size`, `frame` fields (digital products have no variants)
- ❌ NO `quantity` field (each poster = 1 file, user needs only 1 per product)
- ✅ Simplified to: `slug`, `title`, `artist`, `imageUrl`, `price`

**CartContext Methods:**
```typescript
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "id" | "addedAt">) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;  // total in grosze
}
```

**addToCart Logic:**
- If `slug` already exists in cart → return (no duplicates)
- Otherwise → add with `addedAt: Date.now()`

**Storage:**
- localStorage key: `poster_shop_cart_mvp`
- Auto-save on any change
- Auto-load on page mount

---

## 2. Checkout Page (`/checkout`)

### Route & Structure
```
GET /checkout
  ├─ Verify cart is not empty (if empty → redirect to /)
  ├─ Render CheckoutPage
  └─ Wrap with Stripe provider (Elements)
```

### Layout Sections (Top to Bottom)

#### 2.1 Header
```tsx
<div className="flex justify-between items-center py-6 border-b border-black/10">
  <Link href="/">← Wróć do kolekcji</Link>
  <h1>Finalizuj zamówienie</h1>
  <div />
</div>
```

#### 2.2 Cart Summary Section
```
Title: "Twój koszyk (X produktów)"

For each item:
  ┌─────────────────────────────────┐
  │ [Thumbnail] Title               │
  │            Cyfrowy (PDF/JPG)    │
  │            XX,XX zł  [Usuń]    │
  └─────────────────────────────────┘

Subtotal line:
  Wartość zamówienia: XX,XX zł
  Dostawa: 0,00 zł (cyfrowa)
  ─────────────────────
  SUMA: XX,XX zł
```

**Component:** `CartSummary.tsx`
- Reads from `useCart()`
- Maps over `cartItems`
- Shows remove button (→ `removeFromCart()`)
- Displays price formatting via `formatPrice()`

#### 2.3 Up-Sell Box
```
"Te plakaty idealnie łączą się w pary! 
 Dobierz drugi kadr z kolekcji i stwórz 
 spójną galerię na ścianie."

 [Random Related Poster Thumbnail]
 [Tytuł] [+ DODAJ ZA XX,XX ZŁ]
```

**Component:** `CartUpSell.tsx`
- Select 1 random poster NOT in cart (from remaining 9)
- Show thumbnail + title + quick add button
- On click → `addToCart()` → update summary

#### 2.4 Contact Information Form
```
DANE KONTAKTOWE

Imię i Nazwisko *
[Input - required, min 3 chars]

Adres e-mail *
[Input - required, valid email]
"Na ten adres wyślemy linki do pobrania
 zaraz po opłaceniu. Upewnij się, że nie
 zawiera błędów."
```

**Component:** `CheckoutForm.tsx`
- Controlled inputs (React state)
- Basic validation: name length, email format
- Error messages below each field
- Form submission → create PaymentIntent

#### 2.5 Payment Method
```
METODA PŁATNOŚCI

[Stripe Payment Element]
(automatically renders: BLIK, Karty, Apple Pay, Google Pay, etc.)
```

**Component:** `PaymentElementWrapper.tsx`
- Use `@stripe/react-stripe-js` Elements provider
- Mount PaymentElement in this section
- Handle `stripe.confirmPayment()` on form submit

#### 2.6 Trust Seals
```
✓ Bezpieczna płatność: Szyfrowanie SSL
⚡ Natychmiastowy dostęp: Linki w ciągu minuty
📐 Gwarancja jakości: 300 DPI, XXL ready
```

**Component:** `TrustSeals.tsx`
- Static icons + text

#### 2.7 CTA Button
```
[PŁACĘ I POBIERAM TERAZ]
```
- Full-width button
- Black background, uppercase
- On click → validate form → create PaymentIntent → confirm payment

### Responsive Behavior
- **Mobile:** Single column, stacked sections
- **Tablet/Desktop:** Two-column optional (cart left, form right) or single-column full-width

---

## 3. Success Page (`/checkout/success`)

### Route & Query Parameters
```
GET /checkout/success?payment_intent=pi_1234567890&client_secret=seti_xxx
```

### Server-Side Logic (Async Component)

```typescript
export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ payment_intent?: string; client_secret?: string }>;
}) {
  const { payment_intent } = await searchParams;

  // 1. Verify payment_intent exists
  if (!payment_intent) {
    return <ErrorPage reason="missing_payment_intent" />;
  }

  // 2. Retrieve PaymentIntent from Stripe
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  let intent;
  try {
    intent = await stripe.paymentIntents.retrieve(payment_intent);
  } catch (e) {
    return <ErrorPage reason="invalid_payment_intent" />;
  }

  // 3. Verify status === "succeeded"
  if (intent.status !== "succeeded") {
    return <ErrorPage reason="payment_not_succeeded" status={intent.status} />;
  }

  // 4. Set secure cookie with payment_intent (for download verification later)
  const cookies = await import("next/headers").then(m => m.cookies());
  (await cookies).set("payment_intent", payment_intent, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 86400, // 24 hours
  });

  // 5. Get cartItems from metadata (stored in PaymentIntent)
  // OR retrieve from request body (we'll pass it during payment creation)
  const cartItems = JSON.parse(intent.metadata?.cartItems || "[]");

  return (
    <SuccessPageContent
      paymentIntent={payment_intent}
      cartItems={cartItems}
    />
  );
}
```

### Layout - Success State (Minimal)

```
                    ✓ (large icon)

    SUKCES! TWOJE PLAKATY CZEKAJĄ

Kod zamówienia: #10234

Na Twój adres e-mail (user@mail.com) wysłaliśmy
wszystkie pliki (PDF i JPG) jako załączniki.
Sprawdź swoją skrzynkę odbiorczą!

Jeśli nie widzisz maila, sprawdź folder SPAM.

[WRÓĆ NA STRONĘ GŁÓWNĄ]
```

**Component:** `SuccessPageContent.tsx`
- Shows order number
- Shows customer email
- Shows confirmation message
- Simple, minimal design

### Error States

#### Missing Payment Intent
```
Coś poszło nie tak.
Nie udało nam się odnaleźć Twojej transakcji.
[Wróć do kasy]
```

#### Payment Failed / Not Succeeded
```
Płatność nie powiodła się.
Nie udało nam się potwierdzić Twojej płatności.
Spróbuj ponownie lub skontaktuj się z nami.
[Wróć do kasy]
```

**Component:** `ErrorPage.tsx`
- Reusable error template
- Different messages based on error reason

### Post-Success Actions
1. Verify PaymentIntent in Stripe
2. Send confirmation email via Resend (with download links)
3. Clear cart from localStorage (`clearCart()`)
4. Display success message + download buttons
5. Display email confirmation message

---

## 4. Email with File Attachments

**Resend sends email with PDF + JPG files as attachments:**

```
To: customer@email.com
Subject: Twoje zamówienie #10234 - Pliki do pobrania
From: noreply@poster-shop.com

Body: Order confirmation + pro tips

Attachments:
- sloneczna-sycylia-pdf.pdf (from /public/downloads/)
- sloneczna-sycylia-jpg.jpg (from /public/downloads/)
```

**No download links in email** — files are directly attached.

**Storage:** Files stored in `public/downloads/` directory for email attachment access only (not publicly served via HTTP).

**Size limit:** Resend supports up to 25MB per email. MVP constraint: all files must be < 25MB total per order.

---

## 5. Email Service (Resend) with Attachments

### Resend Integration

**When:** Success Page → after PI verification → before rendering

**What to send:**
```
From: noreply@poster-shop.com
To: customer@email.com
Subject: Twoje zamówienie #10234 - Wszystkie pliki w załączniku!

Body (HTML template):
- Order confirmation
- List of products
- Pro tips about paper/printing

Attachments:
- sloneczna-sycylia-pdf.pdf
- sloneczna-sycylia-jpg.jpg
- ... (all products)
```

**Implementation:**
```typescript
import { Resend } from "resend";
import { readFileSync } from "fs";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

// Called from /checkout/success
const attachments = cartItems.flatMap((item) => [
  {
    filename: `${item.slug}-pdf.pdf`,
    content: readFileSync(
      path.join(process.cwd(), "public/downloads", `${item.slug}-pdf.pdf`)
    ),
  },
  {
    filename: `${item.slug}-jpg.jpg`,
    content: readFileSync(
      path.join(process.cwd(), "public/downloads", `${item.slug}-jpg.jpg`)
    ),
  },
]);

await resend.emails.send({
  from: "Poster Shop <noreply@poster-shop.com>",
  to: customerEmail,
  subject: `Twoje zamówienie #${orderNumber} - Wszystkie pliki w załączniku!`,
  react: (
    <OrderConfirmationEmail
      orderNumber={orderNumber}
      customerName={customerName}
      products={cartItems}
    />
  ),
  attachments,
});
```

**Email Template:** `components/emails/OrderConfirmationEmail.tsx`
- React component (Resend supports JSX emails)
- Shows order number, products list
- Pro tips about paper/printing
- No download links (files attached directly)

---

## 6. API Routes

### POST `/api/create-payment-intent` (Updated)

**Request body:**
```json
{
  "cartItems": [
    {
      "slug": "sloneczna-sycylia",
      "title": "Plakat do salonu – Słoneczna Sycylia",
      "price": 3900
    }
  ],
  "amount": 3900,
  "customerName": "Jan Kowalski",
  "customerEmail": "jan@example.com"
}
```

**Response:**
```json
{
  "clientSecret": "pi_1234567890_secret_abcd",
  "paymentIntentId": "pi_1234567890"
}
```

**Logic:**
```typescript
export async function POST(request: Request) {
  const { cartItems, amount, customerName, customerEmail } = await request.json();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  // Store cartItems in metadata for later retrieval
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "pln",
    automatic_payment_methods: { enabled: true },
    metadata: {
      cartItems: JSON.stringify(cartItems),
      customerName,
      customerEmail,
    },
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  });
}
```

### No Download API Route Needed

Files are served directly from `public/downloads/` - no custom API route required.
Vercel/Next.js handles static file serving automatically.

---

## 6. Component Checklist

### Cart & Checkout Components
- [ ] **CartSummary.tsx** - list products, show subtotal
- [ ] **CartUpSell.tsx** - recommend 1 random poster
- [ ] **CheckoutForm.tsx** - name + email form with validation
- [ ] **PaymentElementWrapper.tsx** - Stripe Payment Element mount + confirm
- [ ] **TrustSeals.tsx** - static trust icons
- [ ] **app/checkout/page.tsx** - main checkout page layout

### Success & Download Components
- [ ] **SuccessPageContent.tsx** - success layout wrapper
- [ ] **DownloadSection.tsx** - download buttons per product
- [ ] **ProTip.tsx** - paper/print tips box
- [ ] **ErrorPage.tsx** - error states (missing PI, failed payment)
- [ ] **app/checkout/success/page.tsx** - server component with verification

### API Routes
- [ ] **POST /api/create-payment-intent** (update existing)

### Updated Components
- [ ] **CartContext.tsx** - simplified model
- [ ] **PurchaseCard.tsx** - connect addToCart + redirect
- [ ] **lib/posters.ts** - ensure all products have metadata

### Download Files
- [ ] Create `public/downloads/` directory
- [ ] Add sample PDFs: `sloneczna-sycylia-pdf.pdf`, etc.
- [ ] Add sample JPGs: `sloneczna-sycylia-jpg.jpg`, etc.

---

## 7. Data Flow Diagram

```
┌──────────────────────────────────────────┐
│ User on Product Page / Homepage          │
└───────────────┬──────────────────────────┘
                │ [Click: Dodaj do koszyka]
                ▼
        ┌───────────────┐
        │ CartContext   │
        │ addToCart()   │
        │ → localStorage│
        └───────┬───────┘
                │ Redirect: /checkout
                ▼
    ┌─────────────────────┐
    │ /checkout Page      │
    │ - CartSummary       │
    │ - CheckoutForm      │
    │ - PaymentElement    │
    └──────────┬──────────┘
               │ [Click: PŁACĘ]
               │ validate form
               │ POST /api/create-payment-intent
               ▼
        ┌──────────────┐
        │ Stripe API   │
        │ create PI    │
        └──────┬───────┘
               │ clientSecret + PIId
               ▼
        ┌──────────────┐
        │ Stripe JS    │
        │ confirmPayment
        └──────┬───────┘
               │ payment succeeded
               │ Redirect: /checkout/success?pi=...
               ▼
    ┌────────────────────────────────────┐
    │ /checkout/success Page (Server)    │
    │ - Verify PI in Stripe              │
    │ - Send email via Resend            │
    │   (with download links)            │
    │ - Display success message          │
    │ - Display download buttons         │
    │ - clearCart()                      │
    └────────────┬───────────────────────┘
                │
    ┌───────────┴──────────────┐
    │                          │
    ▼                          ▼
┌────────────┐          ┌─────────────────┐
│   Email    │          │ Success Page    │
│ (Resend)   │          │ Display         │
│ Sent to    │          │ - Order #       │
│ Customer   │          │ - Download btns │
└────────────┘          │ - Pro tips      │
                        └────────┬────────┘
                                 │
                   User clicks download links
                                 │
                    /downloads/[slug].pdf
                         (static file)
```

---

## 8. Environment Variables Required

```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx

# Resend Email
RESEND_API_KEY=re_xxxxx
NEXT_PUBLIC_SITE_URL=https://poster-shop.com (or http://localhost:3000 in dev)
```

---

## 9. Testing Checklist

- [ ] Cart persists in localStorage after page refresh
- [ ] Duplicate products don't get added twice
- [ ] Removing from cart updates total
- [ ] Up-sell suggests random poster not in cart
- [ ] Form validation: name required, email format
- [ ] Payment Element renders (BLIK option visible)
- [ ] Payment succeeds → redirects to /checkout/success?pi=...
- [ ] Success page verifies PI in Stripe
- [ ] Email sent via Resend with correct download links
- [ ] Download links in email point to `/downloads/[slug]`
- [ ] Download files accessible from `/public/downloads/`
- [ ] Cart cleared after success
- [ ] Error page shows for failed payments
- [ ] Responsive layout on mobile/tablet/desktop
- [ ] Resend email template renders correctly
- [ ] Order number displayed on success page

---

## 10. Success Criteria (MVP)

1. ✅ Simplified cart model (no size/frame variants)
2. ✅ Checkout page with form + Stripe Payment Element
3. ✅ Success page with instant download links
4. ✅ Secure token-based download verification
5. ✅ Secure cookie for payment_intent
6. ✅ localStorage persistence
7. ✅ All TypeScript types correct
8. ✅ Responsive design (minimalist monochrome)
9. ✅ No external email service (Etap 2 feature)
10. ✅ All 10 products can be purchased and downloaded

---

## 11. Known Limitations & Etap 2

**MVP doesn't include:**
- Email confirmations (will add Resend/SendGrid in Etap 2)
- Invoice generation / NIP field (Etap 2)
- Download history / database tracking (Etap 2)
- Analytics / conversion tracking (Etap 2)
- Webhook handlers for Stripe events (Etap 2)
- Subscription products (out of scope)

**Etap 2 will add:**
- Automated email with download links
- NIP field + fake invoice generation
- Database persistence (orders table)
- GA4 conversion tracking
- Stripe webhook webhooks for safety
- Thank you page A/B testing
- Abandoned cart recovery email

---

## 12. File Organization

```
app/
├── checkout/
│   ├── page.tsx                    (main checkout page)
│   ├── success/
│   │   └── page.tsx                (success page with verification + Resend)
│   └── error.tsx                   (error handling)
├── api/
│   └── create-payment-intent/
│       └── route.ts                (updated)

components/
├── shop/
│   ├── CartSummary.tsx
│   ├── CartUpSell.tsx
│   ├── CheckoutForm.tsx
│   ├── PaymentElementWrapper.tsx
│   ├── TrustSeals.tsx
│   ├── SuccessPageContent.tsx
│   ├── DownloadSection.tsx
│   ├── ProTip.tsx
│   └── ErrorPage.tsx
├── emails/
│   └── OrderConfirmationEmail.tsx  (Resend email template)

context/
└── CartContext.tsx                 (updated - simplified)

lib/
├── posters.ts                      (unchanged)
└── stripe-helpers.ts               (new - utilities)

public/
└── downloads/
    ├── sloneczna-sycylia-pdf.pdf
    ├── sloneczna-sycylia-jpg.jpg
    ├── ... (all 10 products × 2 formats)
```

---

## References

- [Stripe Payment Element Docs](https://stripe.com/docs/stripe-js/elements/payment-element)
- [Next.js Cookies API](https://nextjs.org/docs/app/api-reference/functions/cookies)
- [HMAC-SHA256 Security](https://nodejs.org/api/crypto.html)
- [AGENTS.md - Stripe Integration Notes](../../../AGENTS.md)
