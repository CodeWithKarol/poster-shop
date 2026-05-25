'use client';

import { PaymentElement } from '@stripe/react-stripe-js';

export function PaymentElementWrapper() {
  return (
    <div className="border border-black/10 p-6 rounded-none">
      <h3 className="font-semibold text-black mb-4">METODA PŁATNOŚCI</h3>
      <PaymentElement
        options={{
          layout: 'tabs',
        }}
      />
    </div>
  );
}
