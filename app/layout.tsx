import { Geist_Mono, Inter, Playfair_Display } from "next/font/google"
import { CartProvider } from "@/context/CartContext"
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
  title: "Plik Na Plakat | Autorskie Plakaty Do Druku",
  description: "Autorskie fotografie z Południa Europy. Pobierz, drukuj, ciesz się pięknem w swoim domu.",
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
          <CartProvider>
            <Header />
            <main>{children}</main>
            
             <footer className="border-t border-border py-8 md:py-12 mt-20 md:mt-32">
               <div className="container mx-auto px-6 lg:px-8 max-w-[1400px] text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                 <p>&copy; {new Date().getFullYear()} Plik Na Plakat. Autorskie Fotografie z Południa Europy.</p>
               </div>
             </footer>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
