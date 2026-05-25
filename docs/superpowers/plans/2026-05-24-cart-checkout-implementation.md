# Cart & Checkout System Implementation Plan

> **For agentic workers:** Use `superpowers:executing-plans` to implement this plan sequentially. Steps use checkbox (`- [ ]`) syntax for tracking progress.

**Goal:** Implement complete checkout flow (cart → payment → success with email) for digital posters using Stripe Payment Element and Resend.

**Architecture:** Simplified cart context (no variants), one-page checkout with Stripe Payment Element (BLIK + cards), success page with Resend email integration, public download links.

**Tech Stack:** Next.js 16, Stripe (Payment Element), Resend, React Context (localStorage), TypeScript

---

## Chunk 1: CartContext Simplification

### Task 1.1: Update CartContext for Digital Products

**Files:**
- Modify: `context/CartContext.tsx`

**Summary:** Simplify CartContext to remove `size`, `frame`, `quantity` fields. For MVP digital products, each poster is unique by `slug` only.

- [ ] **Step 1: Read current CartContext**
  
Open `context/CartContext.tsx` and review current interface structure.

- [ ] **Step 2: Update CartItem interface**

Replace the existing `CartItem` interface with simplified version:

```typescript
export interface CartItem {
  id: string;           // equals slug
  slug: string;
  title: string;
  artist: string;
  imageUrl: string;
  price: number;        // in grosze
  addedAt: number;      // timestamp
}
```

**Remove:** `size`, `frame`, `quantity`, `subtitle` (if present)

- [ ] **Step 3: Update addToCart logic**

Modify `addToCart()` to prevent duplicates (no quantity increment):

```typescript
const addToCart = (newItem: Omit<CartItem, "id" | "addedAt">) => {
  const id = newItem.slug;
  
  setCartItems((prev) => {
    // Check if poster already in cart
    if (prev.some((item) => item.id === id)) {
      return prev; // Don't add duplicates
    }
    return [...prev, { ...newItem, id, addedAt: Date.now() }];
  });
};
```

- [ ] **Step 4: Update CartContextType**

Simplify interface (remove `updateQuantity` method since no quantities):

```typescript
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "id" | "addedAt">) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}
```

- [ ] **Step 5: Test TypeScript compilation**

Run: `npm run typecheck`
Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add context/CartContext.tsx
git commit -m "refactor: simplify CartContext for digital products (MVP)"
```

---

## Chunk 2: Update Existing Components

### Task 2.1: Update PurchaseCard to Use Simplified Cart

**Files:**
- Modify: `components/shop/PurchaseCard.tsx`

**Summary:** Ensure PurchaseCard passes correct data to `addToCart()` (no size/frame).

- [ ] **Step 1: Review current PurchaseCard**

Check what data is passed to `addToCart()` in the button click handler.

- [ ] **Step 2: Update onClick handler**

Replace with simplified call (removed size/frame):

```typescript
const handleAddToCart = () => {
  useCart().addToCart({
    slug: poster.slug,
    title: poster.title,
    artist: poster.artist,
    imageUrl: poster.imageUrl,
    price: poster.basePrice,
  });
  // Redirect to checkout
  router.push("/checkout");
};
```

- [ ] **Step 3: Ensure redirect after add**

Add redirect: `router.push("/checkout")` after `addToCart()`.

- [ ] **Step 4: Test**

Click "Dodaj do koszyka" on a product page → should redirect to `/checkout` and add product to cart.

- [ ] **Step 5: Commit**

```bash
git add components/shop/PurchaseCard.tsx
git commit -m "feat: update PurchaseCard for simplified cart flow"
```

---

## Chunk 3: Create Checkout Page & Components

### Task 3.1: Create CheckoutForm Component

**Files:**
- Create: `components/shop/CheckoutForm.tsx`

**Summary:** Form with Imię i Nazwisko + Email fields.

- [ ] **Step 1: Create CheckoutForm.tsx**

```typescript
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CheckoutFormProps {
  onSubmit: (data: { name: string; email: string }) => Promise<void>;
  isLoading?: boolean;
}

export function CheckoutForm({ onSubmit, isLoading = false }: CheckoutFormProps) {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name || formData.name.length < 3) {
      newErrors.name = "Imię i nazwisko musi mieć co najmniej 3 znaki";
    }
    if (!formData.email || !formData.email.includes("@")) {
      newErrors.email = "Podaj prawidłowy adres e-mail";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2">
          Imię i Nazwisko *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border border-black/10 px-4 py-3 rounded-none"
          placeholder="Jan Kowalski"
          disabled={isLoading}
        />
        {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Adres e-mail *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border border-black/10 px-4 py-3 rounded-none"
          placeholder="jan@example.com"
          disabled={isLoading}
        />
        <p className="text-xs text-zinc-600 mt-2">
          Na ten adres wyślemy linki do pobrania zaraz po opłaceniu. Upewnij się, że nie zawiera błędów.
        </p>
        {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-none bg-black text-white hover:bg-zinc-800 py-6 uppercase tracking-[0.15em] font-semibold text-sm"
      >
        {isLoading ? "Przetwarzanie..." : "PŁACĘ I POBIERAM TERAZ"}
      </Button>
    </form>
  );
}
```

- [ ] **Step 2: Test form validation**

Run dev server, test form:
- Empty fields → show error
- Valid data → no error
- Submit → called with correct data

- [ ] **Step 3: Commit**

```bash
git add components/shop/CheckoutForm.tsx
git commit -m "feat: add CheckoutForm component"
```

---

### Task 3.2: Create CartSummary Component

**Files:**
- Create: `components/shop/CartSummary.tsx`

**Summary:** Display list of products in cart with remove buttons.

- [ ] **Step 1: Create CartSummary.tsx**

```typescript
"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/posters";

export function CartSummary() {
  const { cartItems, removeFromCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-zinc-600">Twój koszyk jest pusty.</p>
      </div>
    );
  }

  return (
    <div className="border border-black/10 p-6 rounded-none">
      <h2 className="font-serif text-2xl mb-6">
        Twój koszyk ({cartItems.length} {cartItems.length === 1 ? "produkt" : "produkty"})
      </h2>

      <div className="space-y-4 mb-8 pb-8 border-b border-black/10">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="w-16 h-20 flex-shrink-0 bg-zinc-100 overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={64}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-black">{item.title}</p>
              <p className="text-xs text-zinc-600">Cyfrowy (PDF/JPG)</p>
              <div className="flex justify-between items-center mt-2">
                <span className="font-semibold">{formatPrice(item.price)}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-xs text-zinc-600 hover:text-red-600 transition"
                >
                  Usuń
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Wartość zamówienia:</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Dostawa:</span>
          <span>0,00 zł (cyfrowa)</span>
        </div>
        <div className="flex justify-between font-semibold text-base pt-2 border-t border-black/10">
          <span>SUMA:</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Test with cart items**

Run dev, add product to cart, check CartSummary renders correctly.

- [ ] **Step 3: Commit**

```bash
git add components/shop/CartSummary.tsx
git commit -m "feat: add CartSummary component"
```

---

### Task 3.3: Create CartUpSell Component

**Files:**
- Create: `components/shop/CartUpSell.tsx`

**Summary:** Suggest one random poster from remaining products.

- [ ] **Step 1: Create CartUpSell.tsx**

```typescript
"use client";

import { useMemo } from "react";
import Image from "next/image";
import { posters, formatPrice } from "@/lib/posters";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

export function CartUpSell() {
  const { cartItems, addToCart } = useCart();

  const suggestedPoster = useMemo(() => {
    const availableSlugs = posters.filter(
      (p) => !cartItems.some((item) => item.id === p.slug)
    );
    if (availableSlugs.length === 0) return null;
    return availableSlugs[Math.floor(Math.random() * availableSlugs.length)];
  }, [cartItems]);

  if (!suggestedPoster) return null;

  const handleAddUpsell = () => {
    addToCart({
      slug: suggestedPoster.slug,
      title: suggestedPoster.title,
      artist: suggestedPoster.artist,
      imageUrl: suggestedPoster.imageUrl,
      price: suggestedPoster.basePrice,
    });
  };

  return (
    <div className="border border-black/10 p-6 rounded-none bg-zinc-50 my-6">
      <p className="text-sm text-zinc-700 mb-4">
        Te plakaty idealnie łączą się w pary! Dobierz drugi kadr z kolekcji i stwórz spójną galerię na ścianie.
      </p>

      <div className="flex gap-4 items-center">
        <div className="w-20 h-24 flex-shrink-0 bg-zinc-200 overflow-hidden">
          <Image
            src={suggestedPoster.imageUrl}
            alt={suggestedPoster.title}
            width={80}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">{suggestedPoster.title}</p>
          <p className="text-xs text-zinc-600 mt-1">{formatPrice(suggestedPoster.basePrice)}</p>
        </div>
        <Button
          onClick={handleAddUpsell}
          className="rounded-none bg-black text-white hover:bg-zinc-800 px-4 py-2 text-xs uppercase tracking-wider whitespace-nowrap"
        >
          + Dodaj
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Test upsell logic**

Add one product, check CartUpSell suggests different product.

- [ ] **Step 3: Commit**

```bash
git add components/shop/CartUpSell.tsx
git commit -m "feat: add CartUpSell component"
```

---

### Task 3.4: Create TrustSeals Component

**Files:**
- Create: `components/shop/TrustSeals.tsx`

**Summary:** Static trust badges.

- [ ] **Step 1: Create TrustSeals.tsx**

```typescript
export function TrustSeals() {
  return (
    <div className="border border-black/10 p-6 rounded-none bg-zinc-50">
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <span className="text-lg">🔒</span>
          <p className="text-xs text-zinc-700">
            <strong>Bezpieczna płatność:</strong> Szyfrowanie SSL oraz autoryzacja przez certyfikowanych operatorów.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-lg">⚡</span>
          <p className="text-xs text-zinc-700">
            <strong>Natychmiastowy dostęp:</strong> Linki do pobrania na e-mail w mniej niż minutę.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-lg">📐</span>
          <p className="text-xs text-zinc-700">
            <strong>Gwarancja jakości:</strong> Pliki przygotowane profesjonalnie pod plakaty XXL do druku w rozdzielczości 300 DPI.
          </p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/shop/TrustSeals.tsx
git commit -m "feat: add TrustSeals component"
```

---

### Task 3.5: Create PaymentElementWrapper

**Files:**
- Create: `components/shop/PaymentElementWrapper.tsx`

**Summary:** Stripe Payment Element mount + styling.

- [ ] **Step 1: Create PaymentElementWrapper.tsx**

```typescript
"use client";

import { PaymentElement } from "@stripe/react-stripe-js";

export function PaymentElementWrapper() {
  return (
    <div className="border border-black/10 p-6 rounded-none">
      <h3 className="font-semibold text-black mb-4">METODA PŁATNOŚCI</h3>
      <PaymentElement
        options={{
          layout: "tabs",
        }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/shop/PaymentElementWrapper.tsx
git commit -m "feat: add PaymentElementWrapper component"
```

---

### Task 3.6: Create /checkout/page.tsx

**Files:**
- Create: `app/checkout/page.tsx`

**Summary:** Main checkout page that combines all components.

- [ ] **Step 1: Create checkout page**

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/js";
import { CartSummary } from "@/components/shop/CartSummary";
import { CartUpSell } from "@/components/shop/CartUpSell";
import { CheckoutForm } from "@/components/shop/CheckoutForm";
import { PaymentElementWrapper } from "@/components/shop/PaymentElementWrapper";
import { TrustSeals } from "@/components/shop/TrustSeals";
import { useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();
  const router = useRouter();

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    router.push("/");
    return null;
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutPageContent cartTotal={cartTotal} />
    </Elements>
  );
}

function CheckoutPageContent({ cartTotal }: { cartTotal: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: { name: string; email: string }) => {
    if (!stripe || !elements) return;

    setIsLoading(true);

    try {
      // 1. Create PaymentIntent
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: cartTotal,
          cartItems: cartItems.map((item) => ({
            slug: item.slug,
            title: item.title,
            price: item.price,
          })),
          customerName: formData.name,
          customerEmail: formData.email,
        }),
      });

      const { clientSecret } = await response.json();

      // 2. Confirm payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        redirect: "if_required",
      });

      if (error) {
        console.error("Payment error:", error);
        setIsLoading(false);
        return;
      }

      // 3. Redirect to success
      if (paymentIntent?.status === "succeeded") {
        router.push(
          `/checkout/success?payment_intent=${paymentIntent.id}&client_secret=${clientSecret}`
        );
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1200px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-12 pb-6 border-b border-black/10">
          <Link href="/" className="text-sm hover:text-zinc-600 transition">
            ← Wróć do kolekcji
          </Link>
          <h1 className="font-serif text-2xl">Finalizuj zamówienie</h1>
          <div />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Cart Summary */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <CartSummary />
            <CartUpSell />
          </div>

          {/* Right: Checkout Form */}
          <div className="lg:col-span-2 order-1 lg:order-2 space-y-6">
            <CheckoutForm onSubmit={handleSubmit} isLoading={isLoading} />
            <PaymentElementWrapper />
            <TrustSeals />
          </div>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Install Stripe elements provider**

Check if `@stripe/react-stripe-js` is installed:
```bash
npm list @stripe/react-stripe-js
```

If not installed, add it (should already exist from previous Stripe setup).

- [ ] **Step 3: Test checkout page**

Run dev server, add product to cart, navigate to `/checkout`:
- Should see CartSummary, form, PaymentElement
- Form validation should work
- No crashes

- [ ] **Step 4: Commit**

```bash
git add app/checkout/page.tsx
git commit -m "feat: add checkout page with form and Stripe integration"
```

---

## Chunk 4: Create Success Page with Resend Email

### Task 4.1: Setup Resend

**Files:**
- No files to modify yet

**Summary:** Prepare Resend setup.

- [ ] **Step 1: Install Resend package**

```bash
npm install resend
```

- [ ] **Step 2: Get Resend API key**

Sign up at resend.com if not done, get API key.

- [ ] **Step 3: Add to .env.local**

```env
RESEND_API_KEY=re_xxxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

(In production, change to actual domain)

- [ ] **Step 4: Commit .env changes**

(If using .gitignore for .env.local, just note this was added locally)

---

### Task 4.2: Create Email Template Component

**Files:**
- Create: `components/emails/OrderConfirmationEmail.tsx`

**Summary:** React component for order confirmation email with attachments (Resend format).

- [ ] **Step 1: Create email template**

```typescript
import { formatPrice } from "@/lib/posters";

interface OrderConfirmationEmailProps {
  orderNumber: string;
  customerName: string;
  products: Array<{
    slug: string;
    title: string;
    price: number;
  }>;
}

export function OrderConfirmationEmail({
  orderNumber,
  customerName,
  products,
}: OrderConfirmationEmailProps) {
  const total = products.reduce((sum, p) => sum + p.price, 0);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.5" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
        Sukces! 🎉 Twoje plakaty czekają.
      </h1>

      <p>
        Cześć {customerName},<br />
        Twoje zamówienie <strong>#{orderNumber}</strong> zostało pomyślnie
        opłacone. Wszystkie pliki (PDF i JPG) znajdują się w załączniku tego
        emaila.
      </p>

      <h2 style={{ fontSize: "18px", fontWeight: "bold", marginTop: "20px" }}>
        Zawartość zamówienia:
      </h2>
      <ul>
        {products.map((p) => (
          <li key={p.slug}>
            {p.title} – {formatPrice(p.price)} (PDF + JPG w załączniku)
          </li>
        ))}
      </ul>

      <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
        <strong>Suma: {formatPrice(total)}</strong>
      </p>

      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#f5f5f5",
          borderRadius: "0px",
        }}
      >
        <h3 style={{ fontSize: "14px", fontWeight: "bold" }}>💡 Pro Tip:</h3>
        <p style={{ fontSize: "13px", color: "#666", margin: "10px 0 0 0" }}>
          Aby uzyskać niesamowity efekt głębi kolorów, przekaż pliki do drukarni
          z prośbą o wydruk na papierze matowym, gramatura min. 180-200g. Druk
          pigmentowy jest najtrwalszy i nie blaknie przez lata.
        </p>
      </div>

      <p style={{ fontSize: "12px", color: "#999", marginTop: "30px" }}>
        Pytania? Odpisz na tego emaila lub odwiedź poster-shop.com
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/emails/OrderConfirmationEmail.tsx
git commit -m "feat: add OrderConfirmationEmail template with attachments"
```

---

### Task 4.3: Create Success Page with Verification & Email

**Files:**
- Modify: `app/checkout/success/page.tsx` (update existing)

**Summary:** Update success page to verify payment and send email via Resend with file attachments.

- [ ] **Step 1: Read current success page**

Check what's currently in `app/checkout/success/page.tsx`.

- [ ] **Step 2: Replace with new implementation**

```typescript
import { Stripe } from "stripe";
import { Resend } from "resend";
import Link from "next/link";
import { readFileSync } from "fs";
import path from "path";
import { OrderConfirmationEmail } from "@/components/emails/OrderConfirmationEmail";
import { CheckCircle2 } from "lucide-react";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ payment_intent?: string }>;
}) {
  const { payment_intent } = await searchParams;

  // 1. Verify payment_intent exists
  if (!payment_intent) {
    return <ErrorPage reason="missing_payment_intent" />;
  }

  // 2. Retrieve PaymentIntent from Stripe
  let intent;
  try {
    intent = await stripe.paymentIntents.retrieve(payment_intent as string);
  } catch (e) {
    return <ErrorPage reason="invalid_payment_intent" />;
  }

  // 3. Verify status === "succeeded"
  if (intent.status !== "succeeded") {
    return <ErrorPage reason="payment_not_succeeded" status={intent.status} />;
  }

  // 4. Get cart items from metadata
  const cartItems = JSON.parse(intent.metadata?.cartItems || "[]");
  const customerName = intent.metadata?.customerName || "Kliencie";
  const customerEmail = intent.metadata?.customerEmail || "";
  const orderNumber = payment_intent.slice(-5).toUpperCase();

  // 5. Read files and prepare attachments for Resend
  const attachments = cartItems.flatMap((item: any) => [
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

  // 6. Send email via Resend with attachments
  if (customerEmail) {
    try {
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
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      // Don't fail the whole page if email fails
    }
  }

  return (
    <main className="bg-white min-h-[80vh] flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center max-w-2xl">
        {/* Success Icon */}
        <div className="mb-8">
          <CheckCircle2 className="w-20 h-20 text-black mx-auto" strokeWidth={1} />
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl md:text-5xl mb-6">
          Sukces! Twoje plakaty czekają.
        </h1>

        {/* Order Number */}
        <p className="text-sm text-zinc-600 mb-8">
          Kod zamówienia: <strong>#{orderNumber}</strong>
        </p>

        {/* Email Confirmation */}
        <div className="bg-zinc-50 border border-black/10 p-6 rounded-none mb-8">
          <p className="text-sm text-zinc-700 mb-4">
            Na Twój adres e-mail (<strong>{customerEmail}</strong>) wysłaliśmy
            wszystkie pliki (PDF i JPG) jako załączniki. Sprawdź swoją skrzynkę
            odbiorczą!
          </p>
          <p className="text-xs text-zinc-600">
            Jeśli nie widzisz maila, sprawdź folder SPAM.
          </p>
        </div>

        {/* Pro Tip */}
        <div className="bg-zinc-50 border border-black/10 p-6 rounded-none mb-8">
          <h3 className="font-semibold text-sm mb-2">💡 Pro Tip:</h3>
          <p className="text-xs text-zinc-700 leading-relaxed">
            Aby uzyskać niesamowity efekt głębi kolorów, przekaż pliki do drukarni
            z prośbą o wydruk na papierze matowym, gramatura min. 180-200g.
            Druk pigmentowy jest najtrwalszy i nie blaknie przez lata.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="inline-block px-8 py-6 bg-black text-white rounded-none uppercase tracking-[0.15em] font-semibold text-sm hover:bg-zinc-800 transition"
        >
          Wróć na stronę główną
        </Link>
      </div>
    </main>
  );
}

function ErrorPage({
  reason,
  status,
}: {
  reason: string;
  status?: string;
}) {
  const messages: Record<string, string> = {
    missing_payment_intent: "Nie znaleźliśmy Twojej transakcji.",
    invalid_payment_intent: "Transakcja jest nieprawidłowa lub wygasła.",
    payment_not_succeeded: `Płatność nie powiodła się (status: ${status}).`,
  };

  return (
    <main className="bg-white min-h-[80vh] flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center max-w-2xl">
        <h1 className="font-serif text-4xl mb-4">Coś poszło nie tak.</h1>
        <p className="text-zinc-600 mb-8">{messages[reason] || "Nieznany błąd."}</p>
        <Link
          href="/checkout"
          className="inline-block px-8 py-3 border border-black rounded-none uppercase tracking-wider text-xs hover:bg-black hover:text-white transition"
        >
          Wróć do kasy
        </Link>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Test success page flow**

- Complete a test payment
- Should verify PI in Stripe
- Should send email via Resend with attachments (check Resend dashboard)
- Success page should show confirmation

- [ ] **Step 4: Commit**

```bash
git add app/checkout/success/page.tsx
git commit -m "feat: add success page with Stripe verification and Resend email attachments"
```

---

## Chunk 5: Update API Routes

### Task 5.1: Verify create-payment-intent API stores metadata

**Files:**
- Modify: `app/api/create-payment-intent/route.ts`

**Summary:** Ensure route stores `cartItems`, `customerName`, `customerEmail` in metadata (needed for email + success page).

- [ ] **Step 1: Review current route**

Check existing `app/api/create-payment-intent/route.ts` and verify it stores metadata.

- [ ] **Step 2: Ensure metadata is saved**

The route should include:

```typescript
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
```

If already correct, no changes needed. If missing, add metadata section.

- [ ] **Step 3: Test**

Create a test payment and verify metadata is stored in Stripe dashboard.

- [ ] **Step 4: Commit (if modified)**

```bash
git add app/api/create-payment-intent/route.ts
git commit -m "fix: ensure payment intent stores customer metadata for email"
```

---

## Chunk 6: Add Download Files for Email Attachments

### Task 6.1: Create public/downloads directory and add sample files

**Files:**
- Create: `public/downloads/[all 10 products × 2 formats]`

**Summary:** Add PDF and JPG files for all 10 products (used for Resend email attachments).

- [ ] **Step 1: Create downloads directory**

```bash
mkdir -p public/downloads
```

- [ ] **Step 2: Add sample files**

Create placeholder files with correct naming. You'll replace these with real PDFs/JPGs later:

```
public/downloads/
├── sloneczna-sycylia-pdf.pdf
├── sloneczna-sycylia-jpg.jpg
├── rzymskie-wakacje-pdf.pdf
├── rzymskie-wakacje-jpg.jpg
├── wloskie-espresso-pdf.pdf
├── wloskie-espresso-jpg.jpg
├── wybrzeze-amalfi-pdf.pdf
├── wybrzeze-amalfi-jpg.jpg
├── santorini-blue-hour-pdf.pdf
├── santorini-blue-hour-jpg.jpg
├── greckie-slonce-pdf.pdf
├── greckie-slonce-jpg.jpg
├── srodziemnomorski-luz-pdf.pdf
├── srodziemnomorski-luz-jpg.jpg
├── architektura-andaluzji-pdf.pdf
├── architektura-andaluzji-jpg.jpg
├── palma-w-barcelonie-pdf.pdf
├── palma-w-barcelonie-jpg.jpg
├── hiszpanskie-wybrzeze-pdf.pdf
└── hiszpanskie-wybrzeze-jpg.jpg
```

Create dummy files for MVP testing (replace with real files later):

```bash
# Create dummy PDFs
for slug in sloneczna-sycylia rzymskie-wakacje wloskie-espresso wybrzeze-amalfi santorini-blue-hour greckie-slonce srodziemnomorski-luz architektura-andaluzji palma-w-barcelonie hiszpanskie-wybrzeze; do
  echo "%PDF-1.4" > "public/downloads/${slug}-pdf.pdf"
  echo "Dummy PDF for $slug" >> "public/downloads/${slug}-pdf.pdf"
done

# Create dummy JPGs (placeholder text files for MVP)
for slug in sloneczna-sycylia rzymskie-wakacje wloskie-espresso wybrzeze-amalfi santorini-blue-hour greckie-slonce srodziemnomorski-luz architektura-andaluzji palma-w-barcelonie hiszpanskie-wybrzeze; do
  echo "Dummy JPG for $slug - Replace with real image" > "public/downloads/${slug}-jpg.jpg"
done
```

- [ ] **Step 3: Verify files exist**

```bash
ls -la public/downloads/ | wc -l
```

Should show 20 files (10 products × 2 formats).

- [ ] **Step 4: Note for later**

Remember to **replace dummy files with real PDFs and JPGs** before production. These are placeholders only.

- [ ] **Step 5: Commit**

```bash
git add public/downloads/
git commit -m "feat: add placeholder download files for email attachments"
```

---

## Chunk 7: Testing & Verification

### Task 7.1: Manual End-to-End Testing

**No files to modify**

**Summary:** Test the complete checkout flow.

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

Expected: Server running on http://localhost:3000

- [ ] **Step 2: Add product to cart**

Navigate to homepage, click "Dodaj do koszyka" on a product → should redirect to `/checkout`.

- [ ] **Step 3: Verify cart shows correctly**

CartSummary should show product, price, totals.

- [ ] **Step 4: Fill checkout form**

Enter name and email.

- [ ] **Step 5: View Payment Element**

Should see "BLIK" option + other payment methods.

- [ ] **Step 6: Test with Stripe test card**

Use card: `4242 4242 4242 4242`, expiry: `12/26`, CVC: `123`.

Click "PŁACĘ I POBIERAM TERAZ".

- [ ] **Step 7: Verify success page**

Should redirect to success page with:
- ✓ Order number displayed
- ✓ Email confirmation message
- ✓ Download buttons for PDF + JPG
- ✓ Pro tip box

- [ ] **Step 8: Verify email sent**

Check Resend dashboard: email should be sent with download links.

- [ ] **Step 9: Verify email attachments**

Check Resend dashboard and downloaded email:
- Email should have PDF + JPG attachments for each product
- Filenames should be correct (`product-slug-pdf.pdf`, etc.)

- [ ] **Step 10: Verify cart cleared**

Go back to home, add product again → cart should be empty (or only new product).

- [ ] **Step 11: Run TypeScript check**

```bash
npm run typecheck
```

Expected: 0 errors

- [ ] **Step 12: Run linter**

```bash
npm run lint
```

Expected: 0 errors

---

### Task 7.2: Commit final changes

- [ ] **Step 1: Check git status**

```bash
git status
```

Should show clean working tree (all changes committed).

- [ ] **Step 2: View recent commits**

```bash
git log --oneline -10
```

Should show all commits from this implementation.

- [ ] **Step 3: Final commit (if any uncommitted)**

```bash
git add .
git commit -m "chore: finalize cart & checkout implementation"
```

---

## Summary

**Completed:**
- ✅ CartContext simplified (no variants)
- ✅ Checkout page with form + Stripe Payment Element
- ✅ Success page with PaymentIntent verification
- ✅ Resend email integration with order confirmation
- ✅ Public download links for all products
- ✅ TrustSeals, UpSell, CartSummary components
- ✅ Full end-to-end testing

**Files Created/Modified:**
- New: `components/shop/CheckoutForm.tsx`
- New: `components/shop/CartSummary.tsx`
- New: `components/shop/CartUpSell.tsx`
- New: `components/shop/TrustSeals.tsx`
- New: `components/shop/PaymentElementWrapper.tsx`
- New: `app/checkout/page.tsx`
- New: `components/emails/OrderConfirmationEmail.tsx`
- Modified: `app/checkout/success/page.tsx`
- Modified: `context/CartContext.tsx`
- Modified: `components/shop/PurchaseCard.tsx`
- Modified: `app/api/create-payment-intent/route.ts`
- New: `public/downloads/` (20 dummy files)

**Next Steps (Etap 3):**
- Replace dummy PDFs/JPGs with real poster files
- Add webhook handlers for Stripe events
- Implement download analytics
- Add A/B testing on success page
- Setup production Stripe/Resend accounts
