import React from 'react'
import { Shield, Zap, RotateCcw } from 'lucide-react'

export function TrustBar() {
  return (
    <div className="border-t border-b border-black/10 bg-zinc-50 py-4 md:py-5">
      <div className="max-w-2xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Secure Payments */}
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-sans font-semibold text-sm text-black">
                Bezpieczne Płatności
              </p>
              <p className="font-sans text-xs text-zinc-600 mt-0.5">
                BLIK, karty, PayPal
              </p>
            </div>
          </div>

          {/* Fast Shipping */}
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-sans font-semibold text-sm text-black">
                Szybka Wysyłka
              </p>
              <p className="font-sans text-xs text-zinc-600 mt-0.5">
                InPost w 24-48h
              </p>
            </div>
          </div>

          {/* Returns */}
          <div className="flex items-start gap-3">
            <RotateCcw className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-sans font-semibold text-sm text-black">
                30 Dni na Zwrot
              </p>
              <p className="font-sans text-xs text-zinc-600 mt-0.5">
                Pełny refund, bez pytań
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
