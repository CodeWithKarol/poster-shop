'use client'

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface PosterCardProps {
  title: string
  artist: string
  price: string
  imageUrl: string
  mockupUrl: string
  slug: string
  aspectRatio?: "portrait" | "landscape" | "square"
  tags?: string[]
}

export function PosterCard({ title, artist, price, imageUrl, mockupUrl, slug, aspectRatio = "portrait", tags = [] }: PosterCardProps) {
  const [showMockup, setShowMockup] = React.useState(false);

  return (
    <Link href={`/plakat/${slug}`} className="group flex flex-col gap-4 cursor-pointer block">
      {/* Image Container with Zoom Effect & Image Toggle */}
      <div 
        className={`relative overflow-hidden bg-zinc-100 ${
          aspectRatio === "portrait" ? "aspect-[3/4]" : 
          aspectRatio === "landscape" ? "aspect-[4/3]" : "aspect-square"
        }`}
        onMouseEnter={() => setShowMockup(true)}
        onMouseLeave={() => setShowMockup(false)}
      >
        <Image
          src={showMockup ? mockupUrl : imageUrl}
          alt={showMockup ? `${title.replace("do druku", "").trim()} - wizualizacja we wnętrzu` : `${title.replace("do druku", "").trim()} - plakat do druku wysokiej jakości`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Hover Overlay with CTA */}
        <div className="hidden md:flex absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10 items-center justify-center opacity-0 group-hover:opacity-100">
          <Button variant="default" className="translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out font-sans uppercase tracking-[0.1em] text-xs px-8 py-6 rounded-none bg-black text-white hover:bg-zinc-800">
            Zobacz szczegóły
          </Button>
        </div>

        {/* Mockup Indicator Badge */}
        {showMockup && (
          <div className="absolute bottom-4 right-4 bg-black text-white px-3 py-1 text-[9px] uppercase tracking-[0.15em] font-semibold rounded-none">
            Wizualizacja
          </div>
        )}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center px-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[8px] md:text-[9px] uppercase tracking-[0.15em] font-semibold border border-black/20 px-2 py-1 rounded-none bg-zinc-50 text-zinc-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Meta Information */}
      <div className="flex flex-col gap-1 items-center text-center w-full px-2">
        <h3 className="font-serif text-xl md:text-2xl tracking-wide text-balance break-words max-w-full">{title}</h3>
        <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-zinc-500 break-words max-w-full">{artist}</p>
        <p className="font-sans text-sm mt-2">{price}</p>
      </div>
    </Link>
  )
}
