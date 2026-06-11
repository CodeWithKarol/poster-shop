'use client';

import { FAQItem as FAQItemType } from '@/lib/faq';
import { FAQItem } from './FAQItem';

interface FAQSectionProps {
  items: FAQItemType[];
}

export function FAQSection({ items }: FAQSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground text-balance">
          Wszystko, co musisz wiedzieć o naszych plakatach do druku
        </h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-0">
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
