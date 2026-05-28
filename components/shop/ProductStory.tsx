'use client';

import { Poster } from '@/lib/posters';

interface ProductStoryProps {
  poster: Poster;
}

export function ProductStory({ poster }: ProductStoryProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-2xl">
        {/* Story Section */}
        <h2 className="font-serif text-3xl md:text-4xl mb-6 text-foreground">
          Historia kadru
        </h2>
        
        <p className="font-sans text-base leading-relaxed text-muted-foreground mb-12">
          {poster.productPage.story}
        </p>

        {/* Use Cases Section */}
        <h3 className="font-serif text-2xl mb-4 text-foreground">
          Wskazówki aranżacyjne
        </h3>
        
        <p className="font-sans text-base leading-relaxed text-muted-foreground">
          {poster.productPage.placementTips}
        </p>
      </div>
    </section>
  );
}
