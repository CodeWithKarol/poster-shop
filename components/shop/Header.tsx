"use client"

import Link from "next/link"

export function Header() {
  return (
    <header className="absolute top-0 z-50 w-full bg-transparent">
      <div className="container mx-auto max-w-[1400px] flex h-14 md:h-16 items-center justify-center px-6 lg:px-8">
        
        {/* LOGO */}
        <div className="font-serif text-xl md:text-2xl tracking-wide uppercase font-bold text-foreground">
          <Link href="/">
            Plik<span className="font-light"> Na Plakat</span>
          </Link>
        </div>

      </div>
    </header>
  )
}
