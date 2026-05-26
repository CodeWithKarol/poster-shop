"use client"

import Link from "next/link"
import { Menu, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"

export function Header() {
  const { cartCount } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container mx-auto max-w-[1400px] flex h-16 md:h-20 items-center justify-between px-6 lg:px-8">
        
        {/* MOBILE MENU TRIGGER */}
        <div className="flex md:hidden flex-1">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 -ml-2 hover:bg-transparent">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] border-r-border bg-background p-0">
              <SheetTitle className="sr-only">Menu nawigacyjne</SheetTitle>
              <SheetDescription className="sr-only">Nawigacja główna sklepu z plakatami</SheetDescription>
              <div className="flex flex-col h-full py-12 px-6">
                <div className="font-serif text-xl md:text-2xl tracking-wide uppercase font-bold mb-12">
                  Plik<span className="font-light"> Na Plakat</span>
                </div>
                <nav className="flex flex-col gap-8">
                  <Link href="/" className="text-sm font-semibold uppercase tracking-[0.2em] hover:text-muted-foreground transition-colors">Sklep</Link>
                </nav>
                <div className="mt-auto pt-8 border-t border-border">
                  <p className="text-xs text-muted-foreground tracking-wider">sklep@pliknaplakat.pl</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* LOGO */}
        <div className="font-serif text-lg md:text-xl tracking-wide uppercase font-bold text-center flex-1 md:flex-none">
          <Link href="/">
            Plik<span className="font-light"> Na Plakat</span>
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 flex-1 justify-end">
          <Link href="/checkout" className="text-[10px] lg:text-xs font-semibold uppercase tracking-[0.2em] hover:opacity-50 transition-opacity duration-300">
            Koszyk ({cartCount})
          </Link>
        </nav>

        {/* MOBILE CART ICONS */}
        <div className="flex md:hidden flex-1 justify-end">
           <Link href="/checkout">
             <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-transparent relative">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-black text-[8px] text-white animate-scale-in">
                    {cartCount}
                  </span>
                )}
                <span className="sr-only">Koszyk</span>
              </Button>
           </Link>
        </div>

      </div>
    </header>
  )
}
