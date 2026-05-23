'use client';

import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {images.slice(0, 4).map((image, idx) => (
        <div 
          key={idx} 
          className="group overflow-hidden bg-zinc-100 w-full flex items-center justify-center min-h-[500px] md:min-h-[600px]"
        >
          <Image
            src={image}
            alt={`${title} - view ${idx + 1}`}
            width={600}
            height={800}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            priority={idx < 2}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ))}
    </div>
  );
}
