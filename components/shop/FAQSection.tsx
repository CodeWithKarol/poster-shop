'use client';

import { FAQItem as FAQItemType } from '@/lib/faq';
import { FAQItem } from './FAQItem';

interface FAQSectionProps {
  items: FAQItemType[];
}

export function FAQSection({ items }: FAQSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <h2 className="font-serif text-3xl md:text-4xl mb-12 text-foreground">
        Pytania i odpowiedzi
      </h2>

      <div className="max-w-2xl space-y-0">
        {items.map((item, idx) => (
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
