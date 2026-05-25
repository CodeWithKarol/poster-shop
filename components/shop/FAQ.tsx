'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: 'Jak pakujecie plakaty?',
    answer: 'Plakaty wysyłamy zwinięte w wzmocnione tuby kartonowe. Każda tuba jest wewnątrz wzmocniona dodatkowymi warstwami papieru, co gwarantuje 100% bezpieczeństwa podczas transportu. Brak ryzyka pognięcia lub uszkodzenia.'
  },
  {
    question: 'Jaki jest czas dostawy?',
    answer: 'Wysyłka następuje w ciągu 24-48 godzin od potwierdzenia zamówienia. Dostarczamy przez InPost, co pozwala na szybkie i bezpieczne dotarcie do Ciebie. Tracking dostępny od razu po wysłaniu.'
  },
  {
    question: 'Czy cena zawiera ramę?',
    answer: 'Nie, podana cena dotyczy tylko samego plakatu. Ramę wybierasz osobnie opcjonalnie. Plakat pasuje do wszystkich standardowych ram (np. Ribba z IKEA, Knoppäng), które znajdziesz w każdym sklepie meblowym.'
  },
  {
    question: 'Jaki papier używacie?',
    answer: 'Używamy matowego papieru artystycznego o gramaturze 200g/m² z certyfikatami ekologicznymi. Papier jest wytrzymały, nie błyskliwy i wspaniały dla oka. Druk wykonujemy pigmentami, które nie blakną przez lata.'
  },
  {
    question: 'Czy mogę zwrócić plakat?',
    answer: 'Tak! Mamy 30-dniową politykę zwrotu bez pytań. Jeśli plakat Ci się nie spodoba, wystarczy go zwrócić w oryginalnym opakowaniu. Refundujemy pełną kwotę, w tym koszty wysyłki.'
  },
  {
    question: 'Czy plakat przychodzi zwinięty?',
    answer: 'Tak, plakat przychodzi zwinięty w tubie. Taki format minimalizuje rozmiar paczki i koszty wysyłki. Najpierw rozwiń plakat i przez 24 godziny przechowaj go w rozłożeniu, aby wyrównał się wszelkie zmarszczki.'
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="border-t border-black/10 py-20 md:py-24">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl mb-12 text-center">Najczęstsze Pytania</h2>

        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border border-black/10 rounded-none overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 md:p-5 hover:bg-zinc-50 transition-colors text-left"
              >
                <h3 className="font-sans font-semibold text-sm md:text-base text-black">
                  {item.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-black flex-shrink-0 ml-4 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-4 md:px-5 pb-4 md:pb-5 bg-zinc-50 border-t border-black/10">
                  <p className="font-sans text-sm text-zinc-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
