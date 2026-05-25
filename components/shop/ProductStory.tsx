'use client';

import { Poster } from '@/lib/posters';

interface ProductStoryProps {
  poster: Poster;
}

export function ProductStory({ poster }: ProductStoryProps) {
  return (
    <section className="border-t border-black/10 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        {/* Story Section */}
        <h2 className="font-serif text-3xl md:text-4xl mb-6 text-black">
          Historia kadru
        </h2>
        
        <p className="font-sans text-base leading-relaxed text-zinc-700 mb-12">
          {poster.productPage.story}
        </p>

        {/* Use Cases Section */}
        <h3 className="font-serif text-2xl mb-4 text-black">
          Wskazówki aranżacyjne
        </h3>
        
        <p className="font-sans text-base leading-relaxed text-zinc-700">
          {poster.productPage.placementTips}
        </p>
      </div>
    </section>
  );
}
