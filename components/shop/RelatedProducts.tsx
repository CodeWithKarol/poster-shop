'use client';

import { Poster, getPosterBySlug, formatPrice } from '@/lib/posters';
import { PosterCard } from '@/components/shop/PosterCard';

interface RelatedProductsProps {
  relatedSlugs: string[];
  currentSlug: string;
}

export function RelatedProducts({ relatedSlugs, currentSlug }: RelatedProductsProps) {
  // Fetch related poster data and filter out current product
  const relatedProducts = relatedSlugs
    .map(slug => getPosterBySlug(slug))
    .filter((p): p is Poster => p !== undefined)
    .filter(p => p.slug !== currentSlug)
    .slice(0, 3);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24">
      <h2 className="font-serif text-3xl md:text-4xl mb-4 text-foreground">
        Pasuje do zestawu
      </h2>
      
      <p className="text-base text-muted-foreground mb-12 max-w-2xl">
        Te plakaty mają podobne kolory i styl. Jeśli kupisz 2-3 pliki, Twoja ściana będzie wyglądać profesjonalnie.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {relatedProducts.map((poster) => (
          <PosterCard
            key={poster.id}
            slug={poster.slug}
            title={poster.title}
            artist={poster.artist}
            imageUrl={poster.imageUrl}
            mockupUrl={poster.mockupUrl}
            price={formatPrice(poster.basePrice)}
            aspectRatio={poster.aspectRatio}
            tags={poster.tags}
          />
        ))}
      </div>
    </section>
  );
}
