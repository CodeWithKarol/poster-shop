'use client';

interface TechnicalInfoProps {
  resolution?: string;
}

export function TechnicalInfo({ resolution }: TechnicalInfoProps) {
  return (
    <section className="border-t border-black/10 py-16 md:py-24">
      <h2 className="font-serif text-3xl md:text-4xl mb-12 text-black">
        Informacje techniczne
      </h2>

      <div className="max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <h3 className="font-semibold text-black mb-2 text-sm uppercase tracking-wider">
            Format pliku
          </h3>
          <p className="text-sm text-zinc-700 leading-relaxed">
            Bezstratny format cyfrowy JPG (JPEG) w przestrzeni barwnej RGB. Gotowy do druku bez dodatkowego przetwarzania.
          </p>
        </div>

        {resolution && (
          <div>
            <h3 className="font-semibold text-black mb-2 text-sm uppercase tracking-wider">
              Wymiary pliku
            </h3>
            <p className="text-sm text-zinc-700 leading-relaxed">
              {resolution} px
            </p>
          </div>
        )}

        <div>
          <h3 className="font-semibold text-black mb-2 text-sm uppercase tracking-wider">
            Maksymalny rozmiar druku
          </h3>
          <p className="text-sm text-zinc-700 leading-relaxed">
            Przygotowany pod plakaty XXL do druku – idealna ostrość do formatu 50x70 cm, B2, a nawet B1.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-black mb-2 text-sm uppercase tracking-wider">
            Elastyczność skalowania
          </h3>
          <p className="text-sm text-zinc-700 leading-relaxed">
            Plik możesz wydrukować w mniejszych formatach (A4, A3, A2) – drukarnia automatycznie dopasuje kadr.
          </p>
        </div>
      </div>
    </section>
  );
}
