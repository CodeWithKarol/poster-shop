'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { CartSummary } from '@/components/shop/CartSummary';
import { CartUpSell } from '@/components/shop/CartUpSell';
import { PaymentElementWrapper } from '@/components/shop/PaymentElementWrapper';
import { TrustSeals } from '@/components/shop/TrustSeals';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '' });

  // Remove redirect logic entirely
  // useEffect(() => {
  //   if (cartItems.length === 0) {
  //     router.push('/');
  //   }
  // }, [cartItems, router]);

  // Show EmptyCart if cart is empty
  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-white py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <CartSummary />
        </div>
      </main>
    );
  }

  const handleCreatePaymentIntent = async (data: {
    name: string;
    email: string;
  }): Promise<string> => {
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: cartTotal,
          cartItems: cartItems.map((item) => ({
            slug: item.slug,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
          })),
          customerName: data.name,
          customerEmail: data.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Błąd tworzenia płatności');
      }

      const { clientSecret: secret } = await response.json();
      setClientSecret(secret);
      setFormData(data); // Store form data for later use
      return secret;
    } catch (err) {
      console.error('Failed to create payment intent:', err);
      throw err;
    }
  };

  // Only render Elements when we have a real clientSecret
  if (!clientSecret) {
    return (
      <CheckoutPageLayout cartItems={cartItems} cartTotal={cartTotal}>
        <div className="lg:col-span-2 order-1 lg:order-2">
          <CheckoutFormPhase1
            onPaymentIntentCreated={handleCreatePaymentIntent}
          />
        </div>
      </CheckoutPageLayout>
    );
  }

  const elementsOptions: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  return (
    <Elements stripe={stripePromise} options={elementsOptions}>
      <CheckoutPageLayout cartItems={cartItems} cartTotal={cartTotal}>
        <div className="lg:col-span-2 order-1 lg:order-2">
          <CheckoutFormPhase2 formData={formData} />
        </div>
      </CheckoutPageLayout>
    </Elements>
  );
}

function CheckoutPageLayout({
  cartItems,
  cartTotal,
  children,
}: {
  cartItems: any[];
  cartTotal: number;
  children: React.ReactNode;
}) {
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

          {/* Right: Checkout Form + Payment */}
          {children}
        </div>
      </div>
    </main>
  );
}

/**
 * Phase 1: Collect name and email, create PaymentIntent
 * Form fields are NOT reset when submitted
 */
function CheckoutFormPhase1({
  onPaymentIntentCreated,
}: {
  onPaymentIntentCreated: (formData: {
    name: string;
    email: string;
  }) => Promise<string>;
}) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errors: Record<string, string> = {};
    
    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Imię i nazwisko jest wymagane';
    } else if (formData.name.trim().length < 3) {
      errors.name = 'Imię i nazwisko musi mieć co najmniej 3 znaki';
    } else if (formData.name.trim().length > 100) {
      errors.name = 'Imię i nazwisko może mieć maksymalnie 100 znaków';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Adres e-mail jest wymagany';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Podaj prawidłowy adres e-mail (np. jan@example.com)';
    } else if (formData.email.trim().length > 254) {
      errors.email = 'Adres e-mail jest zbyt długi';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await onPaymentIntentCreated(formData);
      // Don't reset form - parent will re-render with Phase 2
    } catch (err) {
      console.error('Failed to create payment intent:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Błąd podczas tworzenia płatności'
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 border border-red-600 bg-red-50 rounded-none">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

       <form onSubmit={handleSubmit} noValidate className="space-y-6">
         {/* Validation Summary - Display all errors at top */}
         {Object.keys(validationErrors).length > 0 && (
           <div className="p-4 border-2 border-red-600 bg-red-50 rounded-none">
             <p className="text-sm font-semibold text-red-700 mb-2">Popraw błędy przed wysłaniem:</p>
             <ul className="text-xs text-red-600 space-y-1">
               {validationErrors.name && <li>✕ {validationErrors.name}</li>}
               {validationErrors.email && <li>✕ {validationErrors.email}</li>}
             </ul>
           </div>
         )}

         {/* Name Field */}
         <div>
           <label className="block text-sm font-semibold mb-2">
             Imię i Nazwisko *
           </label>
           <input
             type="text"
             value={formData.name}
             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
             className={`w-full px-4 py-3 rounded-none transition-all border ${
               validationErrors.name
                 ? 'border-2 border-red-600 bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500'
                 : 'border-black/10 focus:outline-none focus:ring-1 focus:ring-black/20'
             }`}
             placeholder="Jan Kowalski"
             disabled={isLoading}
           />
           {validationErrors.name && (
             <p className="text-xs text-red-600 mt-2 font-semibold">✕ {validationErrors.name}</p>
           )}
         </div>

         {/* Email Field */}
         <div>
           <label className="block text-sm font-semibold mb-2">
             Adres e-mail *
           </label>
           <input
             type="email"
             value={formData.email}
             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
             className={`w-full px-4 py-3 rounded-none transition-all border ${
               validationErrors.email
                 ? 'border-2 border-red-600 bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500'
                 : 'border-black/10 focus:outline-none focus:ring-1 focus:ring-black/20'
             }`}
             placeholder="jan@example.com"
             disabled={isLoading}
           />
           {validationErrors.email ? (
             <p className="text-xs text-red-600 mt-2 font-semibold">✕ {validationErrors.email}</p>
           ) : (
             <p className="text-xs text-zinc-600 mt-2">
               Na ten adres wyślemy linki do pobrania zaraz po opłaceniu. Upewnij się, że nie zawiera błędów.
             </p>
           )}
         </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-none bg-black text-white hover:bg-zinc-800 py-6 uppercase tracking-[0.15em] font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isLoading ? 'Przetwarzanie...' : 'POBIERAM I PŁACĘ'}
        </button>
      </form>

      {isLoading && (
        <div className="p-4 border border-black/10 bg-zinc-50 rounded-none">
          <p className="text-sm text-zinc-600">
            Przygotowuję metodę płatności...
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Phase 2: Show PaymentElement and confirm payment
 * Form fields are read-only (display previously entered data)
 */
function CheckoutFormPhase2({
  formData,
}: {
  formData: { name: string; email: string };
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError('Czekanie na załadowanie metody płatności...');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: paymentError, paymentIntent } =
        await stripe.confirmPayment({
          elements,
          redirect: 'if_required',
        });

      if (paymentError) {
        console.error('Payment error:', paymentError);
        setError(
          paymentError.message || 'Błąd podczas przetwarzania płatności'
        );
        setIsLoading(false);
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        router.push(`/checkout/success?payment_intent=${paymentIntent.id}`);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Nieznany błąd podczas realizacji zamówienia'
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 border border-red-600 bg-red-50 rounded-none">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Display previously entered data (read-only) */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Imię i Nazwisko
          </label>
          <div className="w-full border border-black/10 px-4 py-3 rounded-none bg-zinc-50 text-zinc-700">
            {formData.name}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Adres e-mail
          </label>
          <div className="w-full border border-black/10 px-4 py-3 rounded-none bg-zinc-50 text-zinc-700">
            {formData.email}
          </div>
          <p className="text-xs text-zinc-600 mt-2">
            Na ten adres wyślemy linki do pobrania zaraz po opłaceniu.
          </p>
        </div>

        {/* Payment Element Section */}
        <div>
          <PaymentElementWrapper />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-none bg-black text-white hover:bg-zinc-800 py-6 uppercase tracking-[0.15em] font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isLoading ? 'Przetwarzanie...' : 'PŁACĘ'}
        </button>
      </form>

      {stripe && elements && <TrustSeals />}
    </div>
  );
}
