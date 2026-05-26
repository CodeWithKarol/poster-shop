'use client';

export function TrustSeals() {
  return (
    <div className="border border-border p-6 rounded-none bg-muted">
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <span className="text-lg">🔒</span>
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">Bezpieczna płatność:</strong> Szyfrowanie SSL oraz
            autoryzacja przez certyfikowanych operatorów.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-lg">⚡</span>
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">Natychmiastowy dostęp:</strong> Linki do pobrania na e-mail
            w mniej niż minutę.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-lg">📐</span>
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">Gwarancja jakości:</strong> Pliki przygotowane
            profesjonalnie pod plakaty XXL do druku.
          </p>
        </div>
      </div>
    </div>
  );
}
