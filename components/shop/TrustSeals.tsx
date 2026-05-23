'use client';

export function TrustSeals() {
  return (
    <div className="border border-black/10 p-6 rounded-none bg-zinc-50">
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <span className="text-lg">🔒</span>
          <p className="text-xs text-zinc-700">
            <strong>Bezpieczna płatność:</strong> Szyfrowanie SSL oraz
            autoryzacja przez certyfikowanych operatorów.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-lg">⚡</span>
          <p className="text-xs text-zinc-700">
            <strong>Natychmiastowy dostęp:</strong> Linki do pobrania na e-mail
            w mniej niż minutę.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-lg">📐</span>
          <p className="text-xs text-zinc-700">
            <strong>Gwarancja jakości:</strong> Pliki przygotowane
            profesjonalnie pod plakaty XXL do druku.
          </p>
        </div>
      </div>
    </div>
  );
}
