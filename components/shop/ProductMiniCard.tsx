'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

export function ProductMiniCard({ poster }: { poster: any }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      slug: poster.slug,
      title: poster.title,
      artist: poster.artist,
      imageUrl: poster.imageUrl,
      price: poster.basePrice,
    });
  };

  return (
    <div className="border border-border p-2 rounded-none bg-card">
      <Image 
        src={poster.imageUrl} 
        alt={poster.title} 
        width={150} 
        height={150} 
        className="w-full aspect-square object-cover mb-2" 
      />
      <h4 className="text-xs font-semibold mb-1 text-foreground">{poster.title}</h4>
      <p className="text-xs text-muted-foreground mb-2">{(poster.basePrice / 100).toFixed(2)} zł</p>
      <Button 
        variant="outline" 
        className="w-full text-xs rounded-none border-border"
        onClick={handleAdd}
      >
        + Dodaj
      </Button>
    </div>
  );
}
