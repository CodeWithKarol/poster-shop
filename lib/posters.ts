export interface Poster {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  artist: string;
  basePrice: number; // in grosze (e.g. 4900 = 49.00 PLN)
  imageUrl: string;
  mockupUrl: string;
  gallery: string[];
  aspectRatio: "portrait" | "landscape" | "square";
  description: string;
  relatedSlugs: string[];
  tags: string[];
  colors: string[];
  resolution: string; // e.g. "3024x4032"
  productPage: {
    story: string;
    placementTips: string;
    metaTitle: string;
    metaDescription: string;
  };
}

export const getRandomPosters = (count: number) => {
  return [...posters].sort(() => 0.5 - Math.random()).slice(0, count);
};

export const posters: Poster[] = [
  {
    id: "IMG_1007",
    slug: "plakat-do-salonu-greckie-okno",
    title: "Plakat do salonu – Greckie Okno",
    subtitle: "Minimalistyczny detal z Cyklad",
    artist: "Karol",
    basePrice: 4900,
    imageUrl: "/images/greckie-okno-santorini.webp",
    mockupUrl: "/mockups/wloskie-swiatlocienie-fasada-mockup.webp",
    gallery: ["/images/greckie-okno-santorini.webp"],
    aspectRatio: "portrait",
    description: "Klasyczny kontrast głębokiego, greckiego błękitu indygo i nieskazitelnej, bielonej ściany. Kwintesencja wyspiarskiego minimalizmu uzupełniona o akcent kwitnącej bougainvillei.",
    relatedSlugs: ["plakat-na-sciane-wloska-uliczka", "plakat-do-kuchni-wloskie-klimaty"],
    tags: ["plakaty do druku", "plakaty do salonu", "plakaty z pinteresta", "minimalizm", "błękit"],
    colors: ["#FFFFFF", "#0A4D92", "#D2B48C"],
    resolution: "3024x4032",
    productPage: {
      story: "Ten kadr złapałem w bocznej, cichej uliczce na Santorini, z dala od tłumu turystów. Intensywne, południowe słońce idealnie odcinało geometrię klasycznego, greckiego okna od chropowatej, wielokrotnie bielonej ściany. Głęboki odcień okiennic o barwie indygo perfekcyjnie kontrastuje z czystą bielą, a spływające z boku różowe kwiaty bougainvillei dopełniają ten widok. Ten plakat to czysty spokój, powiew morskiej bryzy i esencja greckiego klimatu 'siga-siga' – powoli, bez pośpiechu.",
      placementTips: "Genialnie sprawdzi się jako nowoczesny plakat do salonu lub sypialni urządzonych w stylu skandynawskim, marynistycznym lub nowoczesnym minimalizmie. Biel mocno rozjaśni optycznie przestrzeń, a błękit doda jej głębi.",
      metaTitle: "Plakat do salonu Greckie Okno | Plakaty do druku cyfrowe",
      metaDescription: "Kup autorski plakat do druku 'Greckie Okno'. Cyfrowy plik JPG gotowy w 60 sekund. Przenieś słońce Grecji na swoją ścianę!"
    }
  },
  {
    id: "IMG_3200",
    slug: "plakat-na-sciane-wloska-swiatlocienie",
    title: "Plakat na ścianę – Włoskie Światłocienie",
    subtitle: "Gra cieni na rozgrzanej fasadzie",
    artist: "Karol",
    basePrice: 4900,
    imageUrl: "/images/wloskie-swiatlocienie-fasada.webp",
    mockupUrl: "/mockups/egzotyczne-cienie-palma-mockup.webp",
    gallery: ["/images/wloskie-swiatlocienie-fasada.webp"],
    aspectRatio: "portrait",
    description: "Spektakularna gra cieni i ciepłych odcieni piaskowca na włoskiej kamienicy z klasycznymi okiennicami. Poczuj leniwy klimat południowego popołudnia.",
    relatedSlugs: ["plakat-do-salonu-greckie-okno", "plakat-do-kuchni-wloskie-klimaty"],
    tags: ["plakaty do druku", "plakaty na ścianę", "plakaty do salonu", "włochy", "ciepłe barwy"],
    colors: ["#E8DCC4", "#8B5A2B", "#556B2F"],
    resolution: "3024x4032",
    productPage: {
      story: "To ujęcie powstało wczesnym popołudniem we Włoszech, gdy słońce zaczyna wędrować niżej i tworzy na budynkach niezwykłe, geometryczne płaszczyzny. Zachwyciła mnie ta idealna, długa linia cienia odcinająca się pod skosem od rozgrzanej, piaskowo-beżowej fasady kamienicy z tradycyjnymi, drewnianymi okiennicami. Soczysta zielona roślinność w donicach u dołu kadru dodaje całości naturalnego balansu i życia. To kwintesencja włoskiego 'dolce far niente' – sztuki słodkiego nicnierobienia.",
      placementTips: "Idealny plakat na ścianę do przedpokoju, jadalni lub salonu, gdzie dominują naturalne kolory ziemi, drewno, beże i tekstylia z lnu. Wprowadza niesamowity, przytulny i ciepły, śródziemnomorski klimat.",
      metaTitle: "Plakat na ścianę Włoskie Światłocienie | Autorskie plakaty do druku",
      metaDescription: "Odkryj plakat do pobrania 'Włoskie Światłocienie'. Autentyczna fotografia z podróży do Włoch. Pobierz, wydrukuj lokalnie i stwórz ciepły klimat w swoim domu."
    }
  },
  {
    id: "IMG_3217",
    slug: "plakat-do-kuchni-wloskie-klimaty",
    title: "Plakat do kuchni – Włoskie Klimaty",
    subtitle: "Kaktusy i surowa faktura rustykalnego muru",
    artist: "Karol",
    basePrice: 4900,
    imageUrl: "/images/wloskie-kaktusy-terakota.webp",
    mockupUrl: "/mockups/palma-w-sloncu-liscie-mockup.webp",
    gallery: ["/images/wloskie-kaktusy-terakota.webp"],
    aspectRatio: "square",
    description: "Rustykalny urok prowincji. Egzotyczna opuncja i sukulenty w terakotowych donicach na tle wiekowego muru i drewnianych wrót.",
    relatedSlugs: ["plakat-do-salonu-greckie-okno", "plakat-na-sciane-wloska-swiatlocienie"],
    tags: ["plakaty do druku", "plakaty do kuchni", "plakaty z pinteresta", "terakota", "boho"],
    colors: ["#DF9B74", "#6B8E23", "#F5F5DC"],
    resolution: "3963x2972",
    productPage: {
      story: "To ujęcie to czysta definicja rustykalnego południa. Zatrzymałem się przy wejściu do starego domu, gdzie surowość i faktura wiekowych, drewnianych wrót oraz chropowatego muru w odcieniach beżu i ochry spotkała się z organicznymi kształtami kaktusów (w tym charakterystycznej opuncji) stojących w tradycyjnych, glinianych donicach. Kolorystyka tej kompozycji idealnie oddaje barwę rozgrzanej słońcem ziemi. To detal z podróży, który ma w sobie mnóstwo naturalnej, spokojnej energii.",
      placementTips: "Doskonale sprawdzi się jako plakat do kuchni, jadalni lub jasnego aneksu kuchennego. Pięknie komponuje się z nowoczesnymi wnętrzami z elementami stylu boho, japandi lub rustykalnego, obok świeżych ziół i glinianych naczyń.",
      metaTitle: "Plakat do kuchni Włoskie Klimaty | Plakaty xxl do druku",
      metaDescription: "Dodaj smaku swojej przestrzeni. Plakat do kuchni z motywem kaktusów i włoskiej terakoty. Pobierz cyfrowy plik wysokiej jakości i wydrukuj w minutę."
    }
  },
  {
    id: "IMG_4134",
    slug: "plakat-nowoczesny-hiszpanski-balkon",
    title: "Plakat nowoczesny – Hiszpański Balkon",
    subtitle: "Klasyczna architektura w mocnym słońcu",
    artist: "Karol",
    basePrice: 4900,
    imageUrl: "/images/hiszpanski-balkon-architektura.webp",
    mockupUrl: "/mockups/hiszpanski-balkon-architektura-mockup.webp",
    gallery: ["/images/hiszpanski-balkon-architektura.webp"],
    aspectRatio: "landscape",
    description: "Symetria, kunsztowne detale z kutejo żelaza i ciepłe andaluzyjskie światło na jasnej fasadzie.",
    relatedSlugs: ["plakat-minimalistyczny-egzotyczne-cienie", "plakat-botaniczny-palma-w-sloncu"],
    tags: ["plakaty do druku", "plakaty do salonu", "architektura", "elegancki", "hiszpania"],
    colors: ["#F4EFEB", "#A0522D", "#333333"],
    resolution: "2944x3926",
    productPage: {
      story: "Kadr uchwycony w południowej Hiszpanii podczas popołudniowej sjesty, gdy ulice zamierają, a główną rolę zaczyna grać ostre światło. Kontrast między idealnie jasną, geometryczną płaszczyzną ściany, głębokim cieniem a kunsztownymi detalami tradycyjnego, czarnego balkonu z kutego żelaza urzekł mnie od pierwszego wejrzenia. Spływająca, soczysta zieleń roślin przełamuje surowość formy. To ujęcie to ponadczasowa, klasyczna elegancja architektury południa Europy.",
      placementTips: "Ten plakat nowoczesny idealnie pasuje do eleganckiego salonu, domowego biura, korytarza lub gabinetu. Wyrazista forma i wysoki kontrast świetnie wyglądają oprawione w czarne, wąskie lub minimalistyczne, aluminiowe ramy.",
      metaTitle: "Plakat nowoczesny Hiszpański Balkon | Plakaty do pobrania",
      metaDescription: "Stylowa architektura Hiszpanii na Twojej ścianie. Zamów plakat do druku z motywem andaluzyjskiego balkonu. Wysoka jakość do samodzielnego wydruku."
    }
  },
  {
    id: "IMG_4226",
    slug: "plakat-minimalistyczny-egzotyczne-cienie",
    title: "Plakat minimalistyczny – Egzotyczne Cienie",
    subtitle: "Artystyczne studium światła i struktury",
    artist: "Karol",
    basePrice: 4900,
    imageUrl: "/images/egzotyczne-cienie-palma.webp",
    mockupUrl: "/mockups/wloskie-kaktusy-terakota-mockup.webp",
    gallery: ["/images/egzotyczne-cienie-palma.webp"],
    aspectRatio: "portrait",
    description: "Gdy światło staje się artystą. Ostry, geometryczny cień rzucony na minimalistyczną, jasną płaszczyznę.",
    relatedSlugs: ["plakat-nowoczesny-hiszpanski-balkon", "plakat-botaniczny-palma-w-sloncu"],
    tags: ["plakaty do druku", "plakaty z pinteresta", "minimalizm", "modern", "plakaty do sypialni"],
    colors: ["#EAE6DF", "#1C1C1C", "#8C7B6B"],
    resolution: "3896x2922",
    productPage: {
      story: "Uwielbiam detale, w których mniej znaczy więcej, a to zdjęcie to mój absolutny faworyt pod kątem czystej formy. Ten plakat to minimalistyczne studium światła – ostry, bardzo wyraźny, geometryczny zarys liści palmy rzucony przez południowe słońce na jasną wall-fakturę o ciepłym odcieniu off-white. Kompozycja zamyka się nowoczesnym elementem architektury u dołu. To niezwykle artystyczny kadr, bardzo popularny w nowoczesnych trendach wnętrzarskich.",
      placementTips: "Typowy, poszukiwany plakat z Pinteresta – absolutny hit do sypialni lub salonu w stylu Japandi, loftowym lub modern organic. Najlepiej prezentuje się w surowej, jasnej drewnianej ramie (np. dąb) z dużym, eleganckim passe-partout.",
      metaTitle: "Plakat minimalistyczny Egzotyczne Cienie | Plakaty na ścianę",
      metaDescription: "Postaw na nowoczesny minimalizm. Plakat cyfrowy do samodzielnego druku z unikalną grą świateł i cieni palmy. Idealny do sypialni i salonu w stylu Japandi."
    }
  },
  {
    id: "IMG_4299",
    slug: "plakat-botaniczny-palma-w-sloncu",
    title: "Plakat botaniczny – Palma w Słońcu",
    subtitle: "Letnia sjesta i wakacyjny luz w jednym kadrze",
    artist: "Karol",
    basePrice: 4900,
    imageUrl: "/images/palma-w-sloncu-liscie.webp",
    mockupUrl: "/mockups/greckie-okno-santorini-mockup.webp",
    gallery: ["/images/palma-w-sloncu-liscie.webp"],
    aspectRatio: "portrait",
    description: "Rozłożyste, dojrzałe liście palmy w ciepłym, oliwkowo-zielonym odcieniu, fotografowane od dołu na tle bezchmurnego, pastelowego nieba.",
    relatedSlugs: ["plakat-nowoczesny-hiszpanski-balkon", "plakat-minimalistyczny-egzotyczne-cienie"],
    tags: ["plakaty do druku", "plakaty do salonu", "botanika", "lato", "ciepłe beże"],
    colors: ["#EADCC9", "#5F6A4D", "#D4A373"],
    resolution: "3947x2960",
    productPage: {
      story: "To zdjęcie powstało, gdy po prostu położyłem się w cieniu wielkiej palmy podczas największego popołudniowego upału w nadmorskim miasteczku. Ciepły wiatr delikatnie poruszał potężnymi, dojrzałymi liśćmi, a słońce przedzierało się przez nie, nadając im naturalny, głęboki, oliwkowo-zielony odcień. Jasne, bezchmurne i niemal pastelowe niebo w tle potęguje wrażenie przestrzeni. Ten plakat botaniczny to czysta definicja letniej sjesty – natychmiast obniża tętno i przynoszą spokój.",
      placementTips: "Świetny jako plakat botaniczny do salonu, sypialni czy domowego biura. Łagodne, oliwkowo-beżowe tony działają kojąco i relaksująco. Rewelacyjnie komponuje się w zestawie z innymi plakatami tworząc wakacyjną galerię ścienną.",
      metaTitle: "Plakat botaniczny Palma w Słońcu | Plakaty xxl do druku",
      metaDescription: "Poczuj wieczne lato. Autorski plakat botaniczny do druku przedstawiający liście palmy w ciepłym słońcu. Pobierz plik w wysokiej rozdzielczości i odmień pokój."
    }
  }
];

export const formatPrice = (priceInGrosze: number): string => {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2
  }).format(priceInGrosze / 100);
};

export const getPosterBySlug = (slug: string): Poster | undefined => {
  return posters.find(poster => poster.slug === slug);
};

