import { Geist_Mono, Inter, Playfair_Display } from "next/font/google"
import { Header } from "@/components/shop/Header"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin', 'latin-ext'],variable:'--font-sans'})
const playfair = Playfair_Display({ subsets: ["latin", "latin-ext"], variable: "--font-serif" })

const fontMono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
})

export const metadata = {
  title: "Autorskie Plakaty do Druku – Pobierz i Wydrukuj w 2 Minuty",
  description: "Zapomnij o masowych grafikach ze stocku. Pobierz autorskie plakaty do samodzielnego druku (A4-70x100) i stwórz unikalną galerię ścienną natychmiast!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pl"
      suppressHydrationWarning
      className={cn("antialiased selection:bg-black selection:text-white bg-background text-foreground", fontMono.variable, "font-sans", inter.variable, playfair.variable)}
    >
      <body className="bg-background text-foreground">
        <ThemeProvider>
            <Header />
            <main>{children}</main>
            
             <footer className="border-t border-border py-12 md:py-16 bg-muted/50">
               <div className="container mx-auto px-6 lg:px-8 max-w-[1200px] flex flex-col items-center justify-center gap-8">
                 
                 {/* SEO Anchor Text (Natural but optimized) */}
                 <div className="max-w-2xl text-center">
                   <p className="font-sans text-xs sm:text-sm leading-relaxed text-foreground/80 text-balance">
                     Tworzymy unikalne, autorskie plakaty do druku, które stanowią idealną alternatywę dla powtarzalnych dekoracji ściennych. Nasza misja to dostarczanie sztuki cyfrowej premium wprost na Twój e-mail – bez czekania, bez ryzyka uszkodzenia w transporcie i w zgodzie z Twoim własnym stylem. Drukuj lokalnie, dekoruj z pasją.
                   </p>
                 </div>

                 {/* Copyright */}
                 <div className="text-center text-[10px] uppercase tracking-[0.2em] text-foreground/60 mt-4">
                   <p>&copy; {new Date().getFullYear()} Plik Na Plakat. Wszelkie Prawa Zastrzeżone.</p>
                 </div>
                 
               </div>
             </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
