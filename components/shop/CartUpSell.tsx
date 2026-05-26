'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { posters, formatPrice } from '@/lib/posters';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

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
     <div className="border border-border p-4 md:p-6 lg:p-7 rounded-none bg-card my-6 lg:my-8">
       <p className="text-xs md:text-sm lg:text-base text-muted-foreground mb-4 md:mb-6 lg:mb-7">
         Te plakaty idealnie łączą się w pary! Dobierz drugi kadr z kolekcji i stwórz spójną galerię na ścianie.
       </p>

       {/* Mobile/Tablet: column, Desktop (1024px+): image left + content right (stacked) */}
       <div className="flex flex-col gap-3 md:gap-3 lg:flex-row lg:gap-6 lg:items-start">
         {/* Image - responsive size */}
         <div className="w-full md:w-full lg:w-32 lg:h-40 lg:flex-shrink-0 h-32 bg-muted overflow-hidden">
           <Image
             src={suggestedPoster.imageUrl}
             alt={suggestedPoster.title}
             width={128}
             height={160}
             className="w-full h-full object-cover"
           />
         </div>

         {/* Content container - text stacked above button on desktop */}
         <div className="flex flex-col gap-3 md:gap-3 lg:gap-4 flex-1">
           {/* Text section */}
           <div>
             <p className="text-xs md:text-sm lg:text-base font-semibold text-foreground">{suggestedPoster.title}</p>
             <p className="text-[11px] md:text-xs lg:text-sm text-muted-foreground mt-1">
               {formatPrice(suggestedPoster.basePrice)}
             </p>
           </div>

           {/* Button - full width on mobile/tablet, auto width on desktop */}
           <Button
             onClick={handleAddUpsell}
             className="rounded-none bg-foreground text-background hover:bg-zinc-800 px-3 md:px-4 py-2 text-[11px] md:text-xs uppercase tracking-wider w-full lg:w-fit"
           >
             + Dodaj
           </Button>
         </div>
       </div>
     </div>
   );
}
