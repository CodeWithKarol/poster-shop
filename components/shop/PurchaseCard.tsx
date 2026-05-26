'use client';

import { useRouter } from 'next/navigation';
import { Poster, formatPrice } from '@/lib/posters';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

interface PurchaseCardProps {
  poster: Poster;
}

export function PurchaseCard({ poster }: PurchaseCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      slug: poster.slug,
      title: poster.title,
      artist: poster.artist,
      imageUrl: poster.imageUrl,
      price: poster.basePrice,
    });
    router.push('/checkout');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Title */}
      <h1 className="font-serif text-3xl md:text-4xl mb-4 text-foreground leading-tight">
        {poster.title}
        <span className="block text-base font-sans font-normal text-muted-foreground mt-2">
          Produkt Cyfrowy
        </span>
      </h1>

      {/* Price */}
      <div className="mb-6">
        <span className="font-serif text-4xl text-foreground">
          {formatPrice(poster.basePrice)}
        </span>
        <p className="text-xs text-muted-foreground mt-2">
          Plik cyfrowy JPG do pobrania
        </p>
      </div>

      {/* Short Emotional Description */}
      <p className="font-sans text-base leading-relaxed text-muted-foreground mb-8">
        {poster.subtitle}
      </p>

      {/* Three Main Highlights */}
      <div className="space-y-4 mb-8 pb-8 border-b border-border">
        <div className="flex items-start gap-4">
          <span className="text-2xl flex-shrink-0">⚡</span>
          <div>
            <p className="font-semibold text-foreground text-sm">
              Błyskawiczna dostawa
            </p>
            <p className="text-xs text-muted-foreground">
              Link do pliku na Twoim e-mailu w 60 sekund po opłaceniu
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <span className="text-2xl flex-shrink-0">📐</span>
          <div>
            <p className="font-semibold text-foreground text-sm">
              Uniwersalny format
            </p>
            <p className="text-xs text-muted-foreground">
              Jeden plik pozwala na bezstratny druk od A4 aż do XXL (50x70 / B2)
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <span className="text-2xl flex-shrink-0">🌍</span>
          <div>
            <p className="font-semibold text-foreground text-sm">
              100% Autentyczność
            </p>
            <p className="text-xs text-muted-foreground">
              Fotografia wykonana osobiście, niedostępna w masowych sieciówkach
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-muted border border-border p-4 mb-6 rounded-none">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong>Uwaga:</strong> Kupujesz produkt cyfrowy w wysokiej rozdzielczości do samodzielnego wydruku. 
          Rama oraz druk fizyczny nie są częścią zamówienia.
        </p>
      </div>

      {/* CTA Button */}
      <Button 
        className="w-full rounded-none bg-foreground text-background hover:bg-zinc-800 py-6 uppercase tracking-[0.15em] font-semibold text-sm mb-6"
        onClick={handleAddToCart}
      >
        KUP PLAKAT I POBIERZ TERAZ
      </Button>

      {/* Trust Badges */}
      <div className="text-center space-y-2">
        <p className="text-xs text-muted-foreground">✓ Szybka dostawa</p>
        <p className="text-xs text-muted-foreground">✓ Bezpieczna płatność (BLIK, Przelew)</p>
      </div>
    </div>
  );
}
