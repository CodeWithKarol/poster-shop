# Specyfikacja: Inteligentny Pusty Koszyk

## Cel
Przekształcenie widoku pustego koszyka z "ślepej uliczki" w narzędzie do ratowania konwersji, wykorzystując dynamiczną prezentację 3 bestsellerów i komunikację korzyści w minimalizmie zgodnym ze stylem marki.

## Elementy Projektowe
1. **Nagłówek i Komunikat:**
   - H3: "Twoja ściana wciąż czeka na słońce..."
   - Podtekst: "Twój koszyk jest obecnie pusty. Wygląda na to, że nie wybrano jeszcze żadnego kadru z południa Europy."
2. **Główne CTA:**
   - Przycisk: "[ ODKRYJ KOLEKCJĘ ]" (scroll do siatki produktów).
3. **Sekcja "Szybki Wybór":**
   - Dynamiczna siatka 3 bestsellerów (losowy wybór z `lib/posters.ts`).
   - Komponent: `ProductMiniCard` (Kompaktowy, minimalistyczny, `rounded-none`, `border-black/10`).
4. **Stopka (Micro-copy):**
   - 3 punkty: "Dostawa w 60 sekund", "Wydruk w dowolnym rozmiarze", "Unikalne kadry".

## Specyfikacja Techniczna
- **Komponenty:**
  - `components/shop/EmptyCart.tsx`: Główny kontener sekcji.
  - `components/shop/ProductMiniCard.tsx`: Nowy komponent dedykowany.
- **Logika:**
  - Wybór produktów: `[...allPosters].sort(() => 0.5 - Math.random()).slice(0, 3)`.
- **Stylizacja:**
  - Tailwind CSS 4, `rounded-none`, `border-black/10`.
- **Integracja:**
  - Wstrzyknięcie `EmptyCart` w logikę renderowania koszyka (w `CartSummary` lub bezpośrednio w `CheckoutPage`/Slide-out).

## Architektura
- Zmiana w `CartSummary` / `CheckoutPage`: warunkowe renderowanie `cartItems.length === 0 ? <EmptyCart /> : <CartSummary />`.
