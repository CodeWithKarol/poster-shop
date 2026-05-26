'use client';

import { useState, useEffect } from 'react';
import { getRandomPosters, type Poster } from '@/lib/posters';
import { ProductMiniCard } from './ProductMiniCard';
import { Button } from '@/components/ui/button';

export function EmptyCart() {
  const [suggested, setSuggested] = useState<Poster[]>([]);

  // Generate random posters only on client to avoid hydration mismatch
  useEffect(() => {
    setSuggested(getRandomPosters(3));
  }, []);

  return (
    <div className="text-center py-12 px-4">
      <h3 className="font-serif text-2xl mb-2 text-foreground">Twoja ściana wciąż czeka na słońce...</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Twój koszyk jest obecnie pusty. Wygląda na to, że nie wybrano jeszcze żadnego kadru z południa Europy.
      </p>
      <Button 
        className="mb-12 rounded-none bg-foreground text-background hover:bg-zinc-800 uppercase tracking-widest text-xs py-6"
        onClick={() => window.location.href = '/'}
      >
        ODKRYJ KOLEKCJĘ
      </Button>

      <h4 className="text-sm font-semibold mb-4 text-left text-foreground">Sprawdź nasze najpopularniejsze plakaty:</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-12">
        {suggested.map((p) => (
          <ProductMiniCard key={p.slug} poster={p} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 text-xs text-muted-foreground border-t border-border pt-8 text-left">
        <p>⚡ Dostawa w 60 sekund – Pliki trafiają na Twój e-mail natychmiast po opłaceniu.</p>
        <p>📐 Wydruk w dowolnym rozmiarze – Od małego formatu po plakaty xxl (B2).</p>
        <p>🌍 Unikalne kadry – Autentyczna fotografia z podróży.</p>
      </div>
    </div>
  );
}
