'use client';

import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-black/10 pb-6 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left transition-colors hover:text-zinc-600"
      >
        <h3 className="font-semibold text-black text-base leading-relaxed">
          {question}
        </h3>
        <span className="text-zinc-600 text-lg ml-4 flex-shrink-0">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <p className="text-sm text-zinc-700 leading-relaxed mt-4">
          {answer}
        </p>
      )}
    </div>
  );
}
