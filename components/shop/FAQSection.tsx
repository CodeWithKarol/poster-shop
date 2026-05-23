'use client';

import { FAQItem } from './FAQItem';

const faqItems = [
  {
    question: 'Czy mogę wydrukować plakat więcej niż raz?',
    answer: 'Tak! Plik kupujesz na własny użytek do końca życia. Jeśli po roku zechcesz zmienić ramę na większą lub wydrukować ten sam plakat jako prezent – możesz to zrobić.',
  },
  {
    question: 'Gdzie mam to wydrukować?',
    answer: 'Plik możesz wgrać na stronę dowolnej drukarni internetowej (np. Grupowa, Drukomat, Piga) lub zgrać na pendrive i podejść do najbliższego cyfrowego punktu ksero w Twoim mieście. Koszt wydruku formatu 50x70 na dobrym papierze to zazwyczaj kilkanaście złotych.',
  },
  {
    question: 'Jaki papier polecacie do wydruku?',
    answer: 'Polecamy papier matowy o gramaturze 200-300 g/m² z certyfikacją FSC. Unika się papieru błyszczącego – robi się mało estetycznie. Druk pigmentowy jest najtrwalszy i nie blaknie przez lata.',
  },
];

export function FAQSection() {
  return (
    <section className="border-t border-black/10 py-16 md:py-24">
      <h2 className="font-serif text-3xl md:text-4xl mb-12 text-black">
        Pytania i odpowiedzi
      </h2>

      <div className="max-w-2xl space-y-0">
        {faqItems.map((item, idx) => (
          <FAQItem
            key={idx}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </section>
  );
}
