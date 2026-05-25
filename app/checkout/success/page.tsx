import { Stripe } from 'stripe';
import Link from 'next/link';
import { readFileSync } from 'fs';
import path from 'path';
import { OrderConfirmationEmail } from '@/components/emails/OrderConfirmationEmail';
import { CheckCircle2 } from 'lucide-react';
import { CartCleaner } from '@/components/shop/CartCleaner';

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

  // 2. Initialize Stripe
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock');

  // 3. Retrieve PaymentIntent from Stripe
  let intent;
  try {
    intent = await stripe.paymentIntents.retrieve(payment_intent as string);
  } catch (e) {
    return <ErrorPage reason="invalid_payment_intent" />;
  }

  // 4. Verify status === "succeeded"
  if (intent.status !== 'succeeded') {
    return <ErrorPage reason="payment_not_succeeded" status={intent.status} />;
  }

  // 5. Get cart items from metadata (includes quantity now!)
  const cartItems = JSON.parse(intent.metadata?.cartItems || '[]');
  const customerName = intent.metadata?.customerName || 'Kliencie';
  const customerEmail = intent.metadata?.customerEmail || '';
  const orderNumber = payment_intent.slice(-5).toUpperCase();

  // 6. Read files and prepare attachments for Resend
  let attachments: any[] = [];
  try {
    attachments = cartItems.flatMap((item: any) => [
      {
        filename: `${item.slug}.jpg`,
        content: readFileSync(
          path.join(process.cwd(), 'public/downloads', `${item.slug}.jpg`)
        ),
      },
    ]);
  } catch (err) {
    console.error('❌ Error reading download files:', err);
  }

  // 7. Send email via Resend with attachments
  let emailSent = false;
  let emailError: string | null = null;

  if (customerEmail) {
    if (!process.env.RESEND_API_KEY) {
      emailError = 'RESEND_API_KEY not configured. Please add it to .env.local';
      console.warn('⚠️ Email not sent:', emailError);
    } else {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        const response = await resend.emails.send({
          from: 'Plik Na Plakat <sklep@pliknaplakat.pl>',
          to: customerEmail,
          subject: `Twoje zamówienie #${orderNumber} - Pliki gotowe do pobrania!`,
          react: (
            <OrderConfirmationEmail
              orderNumber={orderNumber}
              customerName={customerName}
              products={cartItems}
            />
          ) as any,
          attachments,
        });
        if (response.error) {
          emailError = response.error.message || 'Resend API error';
          console.error('❌ Resend error:', response.error);
        } else {
          emailSent = true;
          console.log('✅ Email sent successfully');
        }
      } catch (err) {
        emailError = err instanceof Error ? err.message : 'Unknown error';
        console.error('❌ Failed to send email:', emailError);
      }
    }
  }

  return (
    <main className="bg-white min-h-[80vh] flex flex-col items-center justify-center px-6 py-12">
      {/* Clears the cart on client side safely */}
      <CartCleaner />

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
        <div className={`border p-6 rounded-none mb-8 text-left ${
          emailError 
            ? 'bg-red-50 border-red-200' 
            : 'bg-zinc-50 border-black/10'
        }`}>
          {emailError ? (
            <>
              <p className="text-sm text-red-700 mb-2 font-semibold">
                ⚠️ Problem z wysłaniem emaila
              </p>
              <p className="text-xs text-red-600 mb-3">
                {emailError}
              </p>
              <p className="text-xs text-red-600">
                Wydaje się, że wystąpił problem z wysyłką pliku na Twój e-mail. Skontaktuj się z nami pod adresem <strong>kontakt@pliknaplakat.pl</strong> podając numer zamówienia.
              </p>
            </>
          ) : emailSent ? (
            <>
              <p className="text-sm text-zinc-700 mb-4">
                ✅ Email wysłany pomyślnie na <strong>{customerEmail}</strong>
              </p>
              <p className="text-xs text-zinc-700 mb-2">
                Plik JPG znajduje się w załączniku wiadomości. Jest w pełni gotowy do druku!
              </p>
              <p className="text-xs text-zinc-600">
                Jeśli nie widzisz maila w ciągu 2 minut, sprawdź folder SPAM.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-zinc-700 mb-4">
                Na Twój adres e-mail (<strong>{customerEmail}</strong>) wysłaliśmy
                plik JPG jako załącznik. Sprawdź swoją skrzynkę
                odbiorczą!
              </p>
              <p className="text-xs text-zinc-600">
                Jeśli nie widzisz maila, upewnij się czy sprawdziłeś folder SPAM.
              </p>
            </>
          )}
        </div>

        {/* Pro Tip */}
        <div className="bg-zinc-50 border border-black/10 p-6 rounded-none mb-8 text-left">
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
    missing_payment_intent: 'Nie znaleźliśmy Twojej transakcji.',
    invalid_payment_intent: 'Transakcja jest nieprawidłowa lub wygasła.',
    payment_not_succeeded: `Płatność nie powiodła się (status: ${status}).`,
  };

  return (
    <main className="bg-white min-h-[80vh] flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center max-w-2xl">
        <h1 className="font-serif text-4xl mb-4">Coś poszło nie tak.</h1>
        <p className="text-zinc-600 mb-8">
          {messages[reason] || 'Nieznany błąd.'}
        </p>
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
