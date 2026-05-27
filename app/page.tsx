'use client'

import React from "react"
import { PosterCard } from "@/components/shop/PosterCard"
import { Button } from "@/components/ui/button"
import { ArrowRight, Camera, Palette, Layers, Heart, Zap, Frame, Truck, Ruler } from "lucide-react"
import { formatPrice, posters } from "@/lib/posters"
import Image from "next/image"

export default function Home() {
  const handleScrollToProducts = () => {
    const element = document.getElementById('products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      
       {/* HERO SECTION - MINIMALIST USP */}
       <section className="w-full bg-background border-b border-border">
         <div className="container mx-auto px-6 lg:px-8 max-w-[1400px] py-16 md:py-24 lg:py-32">
           <div className="flex flex-col gap-6 md:gap-10 max-w-4xl">
              {/* Main H1 - Primary USP */}
              <h1 className="font-serif text-4xl leading-[1.2] sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground">
                Słońce Południa w Twoim domu. Autorskie plakaty do druku.
              </h1>

              {/* H2 Subheading - Story & Differentiation */}
              <h2 className="font-sans text-lg md:text-xl leading-relaxed text-muted-foreground">
                Odkryj kolekcję autentycznych fotografii z Włoch, Hiszpanii i Grecji. Zapomnij o masowych grafikach ze stocku – wprowadź do swojego wnętrza unikalne, pełne ciepła kadry złapane podczas prawdziwych podróży.
              </h2>

              {/* CTA Button */}
              <div className="pt-2 w-full md:w-auto flex flex-col gap-3">
                <Button 
                  onClick={handleScrollToProducts}
                  className="rounded-none px-4 sm:px-6 md:px-8 py-5 sm:py-6 md:py-7 uppercase tracking-[0.1em] sm:tracking-[0.15em] font-semibold text-[11px] sm:text-xs md:text-sm flex items-center justify-center sm:justify-start gap-2 sm:gap-3 group bg-foreground text-background hover:bg-zinc-800 w-full sm:w-fit"
                >
                  <span>Zobacz kolekcję MVP <span className="hidden sm:inline">(6 unikalnych ujęć)</span></span>
                  <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 transition-transform group-hover:translate-x-1" />
                </Button>

                {/* Micro-copy - Removes friction & objections */}
                <p className="font-sans text-[10px] sm:text-xs md:text-sm text-muted-foreground">
                  Cyfrowa dostawa w 2 minuty na Twój e-mail • Zero kosztów wysyłki
                </p>
              </div>
           </div>
         </div>
       </section>

       {/* SECTION 2: STORYTELLING & AUTHENTICITY USP */}
       <section className="container mx-auto px-6 lg:px-8 max-w-[1400px] py-20 md:py-32">
         {/* Section Heading */}
         <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-10 md:mb-14">
           Kadry pisane słońcem, a noce spędzone na poszukiwaniu idealnego światła
         </h2>

         {/* Storytelling Content */}
         <div className="max-w-3xl">
           {/* Opening quote/philosophy */}
           <div className="mb-8 md:mb-10 border-l-2 border-border pl-6 md:pl-8">
             <p className="font-sans text-base md:text-lg leading-relaxed text-muted-foreground italic">
               Nie szukam idealnych, symetrycznych ujęć studyjnych. Przemierzam wąskie uliczki rzymskiego Trastevere, czekam na idealny moment, gdy słońce chowa się za horyzontem na Santorini i uwieczniam surową, hiszpańską teksturę murów w Andaluzji.
             </p>
           </div>

           {/* Main narrative */}
           <p className="font-sans text-base md:text-lg leading-relaxed text-muted-foreground mb-6">
             Każdy plakat na ścianę do druku, który tu znajdziesz, to moja osobista pamiątka z podróży po południu Europy. Przekazuję w Twoje ręce selekcję 6 fotografii, które najlepiej oddają ten specyficzny, leniwy klimat śródziemnomorskiego lata – zapach morskiej soli, ciepły marmur i głęboki błękit nieba.
           </p>
         </div>
        </section>

        {/* SECTION 3: HOW IT WORKS - BENEFITS & EDUCATION */}
        <section className="container mx-auto px-6 lg:px-8 max-w-[1400px] py-20 md:py-32 border-t border-border">
          {/* Section Heading */}
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-12 md:mb-16">
            Twoja nowa galeria ścienna w 3 prostych krokach
          </h2>

          {/* Steps Grid - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            
            {/* Step 1: Choose */}
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 flex items-center justify-center border border-border">
                <Heart className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-sans text-lg md:text-xl font-semibold text-foreground">
                Wybierz swój klimat
              </h3>
              <p className="font-sans text-sm md:text-base leading-relaxed text-muted-foreground">
                Wybierz jedno z 6 autorskich ujęć, które najbardziej rezonuje z Twoim wnętrzem – od ciepłej Italii po minimalistyczną, grecką estetykę.
              </p>
            </div>

            {/* Step 2: Download */}
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 flex items-center justify-center border border-border">
                <Zap className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-sans text-lg md:text-xl font-semibold text-foreground">
                Pobierz natychmiast
              </h3>
              <p className="font-sans text-sm md:text-base leading-relaxed text-muted-foreground">
                Po opłaceniu zamówienia (np. przez szybki BLIK), pliki w maksymalnej rozdzielczości trafiają prosto na Twój e-mail. Nie czekasz na kuriera, nie płacisz za dostawę.
              </p>
            </div>

            {/* Step 3: Print */}
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 flex items-center justify-center border border-border">
                <Frame className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-sans text-lg md:text-xl font-semibold text-foreground">
                Drukuj tak, jak lubisz
              </h3>
              <p className="font-sans text-sm md:text-base leading-relaxed text-muted-foreground">
                Otrzymujesz uniwersalne pliki przygotowane do druku w formatach od małego A4 aż po duży format 50x70. Wydrukuj je w domu, wyślij do lokalnej drukarni online lub opraw w ulubioną ramę z sieciówki.
              </p>
            </div>

          </div>
        </section>

        {/* PRODUCTS SECTION - 6 POSTERS MVP */}
        <section id="products-section" className="container mx-auto px-6 lg:px-8 max-w-[1400px] py-20 md:py-32 border-t border-border">
          <div className="mb-12 md:mb-16">
            {/* Eyebrow - Limited Edition Badge */}
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 md:mb-6">
              Edycja limitowana • Kolekcja Śródziemnomorska MVP
            </p>

            {/* Main Heading */}
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6 md:mb-8 text-foreground">
              Wybierz swój kadr i pobierz plakaty na ścianę do druku
            </h2>

            {/* Description */}
            <p className="font-sans text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl">
              Wyselekcjonowałem 6 autorskich fotografii z moich podróży po Południu Europy, które najlepiej zatrzymują słońce i przenoszą je wprost do Twojego wnętrza. Każdy produkt to cyfrowy plik premium – gotowy do natychmiastowego pobrania i wydruku w dowolnym formacie.
            </p>
          </div>

         {/* Product Grid - Responsive: 1 column mobile, 2 columns tablet, 3 columns desktop */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posters.map((poster) => (
            <PosterCard 
              key={poster.id}
              slug={poster.slug}
              title={poster.title}
              artist={poster.artist}
              price={formatPrice(poster.basePrice)}
              imageUrl={poster.imageUrl}
              mockupUrl={poster.mockupUrl}
              aspectRatio={poster.aspectRatio}
              tags={poster.tags}
            />
           ))}
         </div>
       </section>

       {/* BOTTOM BANNER: PRODUCT DETAILS & REASSURANCE */}
       <section className="container mx-auto px-6 lg:px-8 max-w-[1400px] py-16 md:py-20 border-t border-border">
         <div className="max-w-4xl">
           {/* Heading */}
           <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6 md:mb-8">
             Co dokładnie otrzymujesz po zakupie?
           </h2>

           {/* Main Description */}
           <div className="mb-8 md:mb-10">
              <p className="font-sans text-base md:text-lg leading-relaxed text-muted-foreground mb-4">
                Każdy plakat wysyłam w formie bezpiecznego, cyfrowego pliku JPG (JPEG). Plik jest gotowy do wydruku bez dodatkowego przetwarzania.
              </p>
             <p className="font-sans text-base md:text-lg leading-relaxed text-muted-foreground">
               Pliki otrzymujesz w uniwersalnych proporcjach boków, co oznacza, że bez straty jakości możesz je wydrukować zarówno w mniejszych formatach (np. A4, A3, 30x40 cm), jak i w dużych, spektakularnych rozmiarach (np. plakaty 50x70 cm, a nawet większych!).
             </p>
           </div>

           {/* Features Grid - 3 columns */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
             
             {/* Feature 1: Fast Delivery */}
             <div className="flex flex-col gap-3">
               <div className="flex items-center gap-3">
                 <Zap className="w-5 h-5 text-foreground flex-shrink-0" />
                 <h3 className="font-sans font-semibold text-foreground text-sm md:text-base">
                   Dostawa w 2 minuty
                 </h3>
               </div>
               <p className="font-sans text-xs md:text-sm text-muted-foreground ml-8">
                 Automatyczna wysyłka na maila od razu po zaksięgowaniu płatności
               </p>
             </div>

             {/* Feature 2: Free Shipping */}
             <div className="flex flex-col gap-3">
               <div className="flex items-center gap-3">
                 <Truck className="w-5 h-5 text-foreground flex-shrink-0" />
                 <h3 className="font-sans font-semibold text-foreground text-sm md:text-base">
                   0 zł za dostawę
                 </h3>
               </div>
               <p className="font-sans text-xs md:text-sm text-muted-foreground ml-8">
                 Kupujesz produkt cyfrowy, nie płacisz za kuriera
               </p>
             </div>

             {/* Feature 3: Flexible Format */}
             <div className="flex flex-col gap-3">
               <div className="flex items-center gap-3">
                 <Ruler className="w-5 h-5 text-foreground flex-shrink-0" />
                 <h3 className="font-sans font-semibold text-foreground text-sm md:text-base">
                   Elastyczny format
                 </h3>
               </div>
               <p className="font-sans text-xs md:text-sm text-muted-foreground ml-8">
                 Drukujesz w takim rozmiarze, jakiego potrzebuje Twoja rama
               </p>
             </div>

           </div>
         </div>
       </section>

     </div>
   );
 }
