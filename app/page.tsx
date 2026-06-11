'use client'

import React from "react"
import Link from "next/link"
import { Store, WebSite, WithContext, FAQPage } from "schema-dts"
import { PosterCard } from "@/components/shop/PosterCard"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Frame } from "lucide-react"
import { formatPrice, posters } from "@/lib/posters"
import { homeFaqItems } from "@/lib/faq"
import { FAQSection } from "@/components/shop/FAQSection"
import Image from "next/image"

export default function Home() {
  const jsonLd: (WithContext<Store> | WithContext<WebSite> | WithContext<FAQPage>)[] = [
    {
      "@context": "https://schema.org",
      "@type": "Store",
      "@id": "https://www.pliknaplakat.pl/#store",
      name: "Plik Na Plakat",
      url: "https://www.pliknaplakat.pl/",
      logo: "https://www.pliknaplakat.pl/images/logo.png",
      image: "https://www.pliknaplakat.pl/images/glowna-reprezentacyjna.jpg",
      description: "Autorskie plakaty do druku na ścianę – zapomnij o masowych grafikach ze stocku. Pobierz cyfrowe grafiki premium w wysokiej rozdzielczości (300 DPI) do samodzielnego wydruku od formatu A4 aż do 70x100 cm.",
      priceRange: "$$",
      slogan: "Autorskie plakaty do druku – pobierz i wydrukuj w 2 minuty",
      address: {
        "@type": "PostalAddress",
        addressCountry: "PL"
      }
    } as WithContext<Store & { slogan: string }>,
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://www.pliknaplakat.pl/#website",
      name: "Plik Na Plakat - Plakaty do druku",
      url: "https://www.pliknaplakat.pl/",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://www.pliknaplakat.pl/szukaj?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    } as WithContext<WebSite>,
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://www.pliknaplakat.pl/#faq",
      mainEntity: homeFaqItems.map(item => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    }
  ];


  const handleScrollToProducts = () => {
    const element = document.getElementById('products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
       {/* HERO SECTION - EDITORIAL SPLIT LAYOUT */}
       <section className="w-full min-h-[100svh] lg:h-[100svh] flex flex-col lg:flex-row bg-background border-b border-border 2xl:max-w-[1920px] 2xl:mx-auto overflow-hidden">
         
         {/* LEFT COLUMN: Editorial Typography & CTA */}
         <div className="w-full lg:w-[50%] flex flex-col justify-center px-4 sm:px-6 pt-24 pb-12 md:px-12 lg:px-12 xl:px-20 2xl:px-32 lg:py-0 border-b lg:border-b-0 lg:border-r border-border order-1">
            <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 2xl:gap-8 max-w-2xl 2xl:max-w-3xl mx-auto lg:mx-0 lg:ml-auto mt-4 lg:mt-8">
              
              {/* Eyebrow Label */}
              <div className="flex items-center gap-3 md:gap-4">
                <span className="w-6 md:w-8 h-[1px] bg-foreground"></span>
                <span className="font-sans text-[9px] md:text-[10px] 2xl:text-xs tracking-[0.25em] uppercase text-foreground/80 font-medium">
                  Nowa Kolekcja
                </span>
              </div>

              {/* Main H1 - Primary USP */}
              <h1 className="font-serif text-[2rem] leading-[1.1] sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.5rem] 2xl:text-[4.5rem] tracking-tight text-foreground text-balance">
                Odkryj autorskie plakaty do druku, które przeniosą leniwy klimat śró&shy;dziem&shy;no&shy;mor&shy;skie&shy;go lata wprost do Twojego domu.
              </h1>

              {/* Editorial Divider */}
              <div className="w-12 md:w-16 h-[1px] bg-border my-1 hidden sm:block"></div>

              {/* H2 Subheading - Story & Differentiation */}
              <h2 className="font-sans text-sm sm:text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl leading-relaxed text-foreground/70 text-pretty">
                Zapomnij o masowych grafikach ze stocku. Wprowadź do swojego wnętrza unikalne, pełne ciepła kadry złapane podczas prawdziwych podróży – gotowe do natychmiastowego pobrania.
              </h2>

              {/* CTA Button & Microcopy */}
              <div className="pt-2 sm:pt-4 w-full flex flex-col gap-3 items-start">
                <Button 
                  onClick={handleScrollToProducts}
                  className="rounded-none h-auto px-5 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 uppercase tracking-[0.1em] sm:tracking-[0.15em] font-semibold text-[11px] sm:text-sm flex flex-row items-center justify-center sm:justify-start gap-3 md:gap-4 group bg-foreground text-background hover:bg-foreground/80 w-full sm:w-fit"
                >
                  <span className="text-center sm:text-left leading-relaxed">
                    Pobierz kolekcję premium
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </Button>

                {/* Micro-copy - Removes friction & objections */}
                <p className="font-sans text-[10px] md:text-xs text-foreground/60 font-medium w-full text-center sm:text-left">
                  Pliki cyfrowe 300 DPI – dostawa w 60 sekund na e-mail.
                </p>
              </div>
            </div>
         </div>

         {/* RIGHT COLUMN: Visual Hero Image */}
         <div className="w-full lg:w-[50%] relative flex-1 min-h-[35vh] sm:min-h-[50vh] lg:min-h-full bg-muted order-2">
           <Image
             src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2800&auto=format&fit=crop"
             alt="Śródziemnomorskie wnętrze z plakatami"
             fill
             className="object-cover object-center"
             priority
             sizes="(max-width: 1024px) 100vw, 50vw"
           />
           {/* Subtle inner border to frame the image in classic editorial style */}
           <div className="absolute inset-4 lg:inset-6 2xl:inset-8 border border-white/20 pointer-events-none hidden md:block"></div>
         </div>
       </section>

       {/* SECTION 2: PROBLEM & STORY (Soap Opera Sequence) */}
       <section className="w-full bg-muted/30 py-24 md:py-32 lg:py-40">
         <div className="container mx-auto px-6 lg:px-8 max-w-[1200px]">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
             
             {/* Left - Heading (The Hook/Problem) */}
             <div className="lg:col-span-5">
               <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground leading-[1.15] text-balance">
                 Dlaczego Twoje ściany zasługują na coś więcej niż bezosobowy druk z marketu?
               </h2>
             </div>

             {/* Right - Storytelling (Attractive Character) */}
             <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
               <div className="border-l-2 border-foreground/20 pl-6 md:pl-8">
                 <p className="font-sans text-base md:text-lg lg:text-xl leading-relaxed text-foreground/70 text-pretty italic">
                   "Przemierzam wąskie uliczki rzymskiego Trastevere, czekam godzinami na idealny moment, gdy słońce chowa się za horyzontem na Santorini... Nie tworzę kolejnych powtarzalnych grafik wektorowych, które znajdziesz w każdym popularnym sklepie."
                 </p>
               </div>

               <p className="font-sans text-base md:text-lg lg:text-xl leading-relaxed text-foreground/80 text-pretty">
                 Moje plakaty do druku to prawdziwe, autorskie pamiątki uchwycone z pasji. Przekazuję w Twoje ręce zapach morskiej soli, ciepły marmur i głęboki błękit południowego nieba uchwycony na fotografiach. 
                 <strong className="block mt-6 font-semibold text-foreground">
                   Kupujesz unikalną opowieść, która odmieni charakter Twojego salonu lub sypialni.
                 </strong>
               </p>
             </div>

           </div>
         </div>
       </section>

        {/* SECTION 3: THE OFFER STACK (Irresistible Offer) */}
        <section id="products-section" className="w-full bg-background border-y border-border py-16 sm:py-24 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 md:mb-20">
              <h2 className="font-serif text-[2rem] leading-[1.15] sm:text-4xl lg:text-5xl text-foreground mb-4 sm:mb-6 text-balance">
                Edycja Limitowana – Kolekcja Śródziemnomorska MVP
              </h2>
              <p className="font-sans text-sm sm:text-base md:text-lg text-foreground/70 text-pretty px-2">
                Wyselekcjonowane plakaty do druku, stworzone by tworzyć harmonijną całość. Zbuduj profesjonalną galerię ścienną w 5 minut.
              </p>
            </div>

            {/* Offer Layout - 2 Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
              
              {/* Left Column - Visual/Mockup */}
              <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square bg-muted p-4 sm:p-8 flex items-center justify-center border border-border">
                {/* Fallback image representing the gallery bundle - replace with actual composite mockup later */}
                <div className="relative w-full h-full">
                   <Image
                     src="/mockups/wloskie-swiatlocienie-fasada-mockup.webp"
                     alt="Wizualizacja kolekcji sześciu plakatów w ramkach na ścianie nad kanapą"
                     fill
                     sizes="(max-width: 768px) 100vw, 50vw"
                     loading="eager"
                     priority
                     className="object-cover opacity-90"
                     placeholder="empty"
                   />
                   <div className="absolute inset-0 border-[8px] sm:border-[12px] border-background mix-blend-overlay"></div>
                </div>
              </div>

              {/* Right Column - The Stack */}
              <div className="flex flex-col">
                <h3 className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] text-foreground/60 font-bold mb-6 sm:mb-8 text-center lg:text-left">
                  Co dokładnie otrzymujesz?
                </h3>

                {/* Stack Items */}
                <div className="flex flex-col gap-6 mb-10 sm:mb-12">
                  
                  {/* Item 1 */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="mt-0.5 sm:mt-1 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center shrink-0 border border-foreground/20 rounded-full">
                      <span className="text-foreground text-[10px] sm:text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold text-foreground text-sm sm:text-base md:text-lg mb-1 leading-snug">
                        6 Cyfrowych Plakatów Premium (300 DPI)
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-foreground/70 mb-1 leading-relaxed">Pełna kolekcja autorskich fotografii w formatach do druku (od A4 do 50x70cm).</p>
                      <p className="font-sans text-[10px] sm:text-xs font-semibold text-foreground/60 line-through">Wartość: 240 zł</p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="mt-0.5 sm:mt-1 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center shrink-0 border border-foreground/20 rounded-full">
                      <span className="text-foreground text-[10px] sm:text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold text-foreground text-sm sm:text-base md:text-lg mb-1 leading-snug flex flex-wrap items-center gap-2">
                        <span>Poradnik Kompozycji i Druku</span>
                        <span className="text-[9px] sm:text-[10px] uppercase bg-foreground text-background px-2 py-0.5 rounded-full">Bonus</span>
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-foreground/70 mb-1 leading-relaxed">E-book: Jak idealnie zaplanować galerię ścienną i dobrać ramy do wnętrza.</p>
                      <p className="font-sans text-[10px] sm:text-xs font-semibold text-foreground/60 line-through">Wartość: 49 zł</p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="mt-0.5 sm:mt-1 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center shrink-0 border border-foreground/20 rounded-full">
                      <span className="text-foreground text-[10px] sm:text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold text-foreground text-sm sm:text-base md:text-lg mb-1 leading-snug">
                        Zero marż i kosztów kuriera
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-foreground/70 leading-relaxed">
                        Omijając fizyczną wysyłkę, płacisz tylko za sztukę. Drukujesz lokalnie lub zamawiasz w sieciowej drukarni internetowej za grosze.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Price & CTA Section */}
                <div className="bg-muted/50 p-6 sm:p-8 border border-border flex flex-col items-center text-center">
                  <div className="flex items-baseline gap-3 sm:gap-4 mb-2">
                    <span className="font-sans text-base sm:text-lg text-foreground/60 line-through decoration-1">289 zł</span>
                    <span className="font-serif text-3xl sm:text-4xl text-foreground font-semibold">149 zł</span>
                  </div>
                  <p className="font-sans text-[10px] sm:text-xs uppercase tracking-widest text-foreground/80 mb-5 sm:mb-6">Cena Kompletnej Kolekcji MVP</p>
                  
                  <Button 
                    asChild
                    className="w-full rounded-none h-auto py-5 sm:py-6 lg:py-7 uppercase tracking-wider sm:tracking-[0.15em] font-semibold text-[10px] sm:text-xs md:text-sm lg:text-[11px] xl:text-xs bg-foreground text-background hover:bg-foreground/80 transition-colors px-2 sm:px-4"
                  >
                    <Link href="https://karolmodelski.gumroad.com/l/plakaty-do-druku-kolekcja-srodziemnomorska" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-center w-full min-h-[1.5rem]">
                      <span className="break-words max-w-[250px] sm:max-w-none leading-relaxed text-balance">
                        Zamów kolekcję <br className="sm:hidden lg:block xl:hidden" /> i pobierz natychmiast
                      </span>
                    </Link>
                  </Button>
                  
                  <div className="flex items-center gap-1.5 sm:gap-2 mt-4 text-foreground/70">
                    <Zap className="w-3 h-3 shrink-0" />
                    <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-wider">Automatyczna dostawa 24/7</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: URGENCY & SCARCITY (Brunson's Push) */}
        <section className="w-full bg-foreground text-background py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8 max-w-[1200px]">
            <div className="max-w-4xl mx-auto flex flex-col gap-12 md:gap-16">
              
              {/* Section Header */}
              <div className="text-center">
                <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-background/60 font-bold mb-4">
                  Ograniczona Edycja
                </p>
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-background text-balance">
                  Dlaczego warto zdecydować się właśnie w ten weekend?
                </h3>
              </div>

              {/* 2-Column Pitch */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                
                {/* Point 1: Instant Gratification */}
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 flex items-center justify-center border border-background/20 rounded-full mb-2">
                    <Zap className="w-5 h-5 text-background" />
                  </div>
                  <h4 className="font-sans text-lg md:text-xl font-semibold text-background">
                    Natychmiastowa satysfakcja
                  </h4>
                  <p className="font-sans text-sm md:text-base leading-relaxed text-background/70">
                    Tradycyjne sklepy potrzebują dni na realizację i wysyłkę kurierską. Twoje nowe plakaty do druku mogą zawisnąć na Twojej ścianie jeszcze dziś. Robisz metamorfozę pokoju? 
                    <strong className="text-background font-medium"> Pliki pobierasz od razu po opłaceniu zamówienia.</strong>
                  </p>
                </div>

                {/* Point 2: Scarcity */}
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 flex items-center justify-center border border-background/20 rounded-full mb-2">
                    <Frame className="w-5 h-5 text-background" />
                  </div>
                  <h4 className="font-sans text-lg md:text-xl font-semibold text-background">
                    Ekskluzywność
                  </h4>
                  <p className="font-sans text-sm md:text-base leading-relaxed text-background/70">
                    To jest limitowane wydanie MVP. Zależy mi, aby te kadry zdobiły domy osób szukających prawdziwej unikalności, dlatego 
                    <strong className="text-background font-medium"> dostęp do tej kolekcji w tej cenie jest ograniczony czasowo.</strong> Nie jesteśmy kolejną masową fabryką plakatów.
                  </p>
                </div>

              </div>
              
              {/* Reminder CTA */}
              <div className="flex justify-center mt-4">
                 <Button 
                    onClick={handleScrollToProducts}
                    className="rounded-none px-8 py-6 uppercase tracking-widest font-semibold text-xs bg-background text-foreground hover:bg-background/80 transition-colors"
                  >
                    Odbierz limitowaną kolekcję
                 </Button>
              </div>

            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-6 lg:px-8 max-w-[1400px] py-16 md:py-24 border-t border-border">
          <FAQSection items={homeFaqItems} />
        </section>
      </div>
    );
  }
