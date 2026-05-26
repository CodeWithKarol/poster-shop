'use client';

import { useState } from 'react';
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
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '' });

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-background py-12 px-6">
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

    if (!response.ok) throw new Error('Błąd tworzenia płatności');
    const { clientSecret: secret } = await response.json();
    setClientSecret(secret);
    setFormData(data);
    return secret;
  };

  if (!clientSecret) {
    return (
      <CheckoutPageLayout cartItems={cartItems} cartTotal={cartTotal}>
        <div className="lg:col-span-2 order-1 lg:order-2">
          <CheckoutFormPhase1 onPaymentIntentCreated={handleCreatePaymentIntent} />
        </div>
      </CheckoutPageLayout>
    );
  }

  const elementsOptions: StripeElementsOptions = {
    clientSecret,
    appearance: { theme: 'stripe' },
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
  cartTotal,
  children,
}: {
  cartItems: any[];
  cartTotal: number;
  children: React.ReactNode;
}) {
  return (
    <main className="bg-background min-h-screen py-12">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1200px]">
        <div className="flex justify-between items-center mb-12 pb-6 border-b border-border">
          <Link href="/" className="text-sm hover:text-muted-foreground transition">
            ← Wróć do kolekcji
          </Link>
          <h1 className="font-serif text-2xl text-foreground">Finalizuj zamówienie</h1>
          <div />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <CartSummary />
            <CartUpSell />
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}

function CheckoutFormPhase1({
  onPaymentIntentCreated,
}: {
  onPaymentIntentCreated: (formData: { name: string; email: string }) => Promise<string>;
}) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [validationErrors, setValidationErrors] = useState<{ name?: string; email?: string }>({});

  const validate = () => {
    const errors: { name?: string; email?: string } = {};
    if (!formData.name.trim()) errors.name = 'Imię i nazwisko jest wymagane';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) errors.email = 'Podaj prawidłowy adres e-mail';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      await onPaymentIntentCreated(formData);
    } catch (err: any) {
      setError(err.message || 'Błąd');
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && <div className="p-4 border border-destructive bg-destructive/10 text-destructive text-sm">{error}</div>}
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-foreground">Imię i Nazwisko *</label>
          <input
            required
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (validationErrors.name) setValidationErrors({ ...validationErrors, name: undefined });
            }}
            className={`w-full px-4 py-3 border rounded-none bg-background text-foreground ${validationErrors.name ? 'border-destructive' : 'border-border'}`}
          />
          {validationErrors.name && <p className="text-xs text-destructive mt-1">{validationErrors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-foreground">Adres e-mail *</label>
          <input
            required
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (validationErrors.email) setValidationErrors({ ...validationErrors, email: undefined });
            }}
            className={`w-full px-4 py-3 border rounded-none bg-background text-foreground ${validationErrors.email ? 'border-destructive' : 'border-border'}`}
          />
          {validationErrors.email && <p className="text-xs text-destructive mt-1">{validationErrors.email}</p>}
        </div>
        <button type="submit" disabled={isLoading} className="w-full bg-foreground text-background py-6 uppercase tracking-widest font-semibold text-sm">
          {isLoading ? 'Przetwarzanie...' : 'POBIERAM I PŁACĘ'}
        </button>
      </form>
    </div>
  );
}

function CheckoutFormPhase2({ formData }: { formData: { name: string; email: string } }) {
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
      } else if (paymentIntent?.status === 'succeeded') {
        router.push(`/checkout/success?payment_intent=${paymentIntent.id}`);
      } else {
        setError('Płatność wymaga dodatkowego potwierdzenia.');
        setIsLoading(false);
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
      {error && <div className="p-4 border border-destructive bg-destructive/10 text-destructive text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-foreground">Imię i Nazwisko</label>
          <div className="w-full border border-border px-4 py-3 bg-muted text-muted-foreground">{formData.name}</div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-foreground">Adres e-mail</label>
          <div className="w-full border border-border px-4 py-3 bg-muted text-muted-foreground">{formData.email}</div>
        </div>
        <PaymentElementWrapper />
        <button type="submit" disabled={isLoading} className="w-full bg-foreground text-background py-6 uppercase tracking-widest font-semibold text-sm">
          {isLoading ? 'Przetwarzanie...' : 'PŁACĘ'}
        </button>
      </form>
      {stripe && elements && <TrustSeals />}
    </div>
  );
}
