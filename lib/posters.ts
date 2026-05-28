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
    title: "Plakat do salonu do druku – Greckie Okno (Minimalistyczny)",
    subtitle: "Minimalistyczny detal z Cyklad",
    artist: "Karol",
    basePrice: 4900,
    imageUrl: "/images/plakat-do-druku-salon-greckie-okno.webp",
    mockupUrl: "/mockups/wloskie-swiatlocienie-fasada-mockup.webp",
    gallery: ["/images/plakat-do-druku-salon-greckie-okno.webp"],
    aspectRatio: "portrait",
    description: "Klasyczny kontrast głębokiego, greckiego błękitu indygo i nieskazitelnej, bielonej ściany. Kwintesencja wyspiarskiego minimalizmu uzupełniona o akcent kwitnącej bougainvillei.",
    relatedSlugs: ["plakat-na-sciane-wloska-uliczka", "plakat-do-kuchni-wloskie-klimaty"],
    tags: ["plakaty do druku", "plakaty do salonu", "plakaty z pinteresta", "minimalizm", "błękit"],
    colors: ["#FFFFFF", "#0A4D92", "#D2B48C"],
    resolution: "3024x4032",
    productPage: {
      story: "Ten kadr złapałem w bocznej, cichej uliczce na Santorini, z dala od tłumu turystów. Intensywne, południowe słońce idealnie odcinało geometrię klasycznego, greckiego okna od chropowatej, wielokrotnie bielonej ściany. Głęboki odcień okiennic o barwie indygo perfekcyjnie kontrastuje z czystą bielą, a spływające z boku różowe kwiaty bougainvillei dopełniają ten widok. Ten plakat to czysty spokój, powiew morskiej bryzy i esencja greckiego klimatu 'siga-siga' – powoli, bez pośpiechu.",
      placementTips: "Ten kadr to idealny plakat do salonu do druku, wpasowujący się w estetykę 'clean girl' i minimalizm. Ze względu na świeżą, morską kolorystykę, chętnie wybierany jest także jako plakat do łazienki do druku lub nowoczesnego wc, dodając wnętrzu wakacyjnego klimatu. Sprawdzi się także jako minimalistyczny plakat do sypialni.",
      metaTitle: "Plakat do salonu do druku Greckie Okno – pliknaplakat.pl",
      metaDescription: "Pobierz minimalistyczny plakat do salonu do druku „Greckie Okno”. Cyfrowa fotografia w wysokiej rozdzielczości (A4, A3, 50x70). Idealny do jasnych wnętrz i łazienek!"
    }
  },
  {
    id: "IMG_3200",
    slug: "plakat-na-sciane-wloskie-swiatlocienie",
    title: "Plakat na ścianę Włoskie Światłocienie do druku",
    subtitle: "Gra cieni na rozgrzanej fasadzie",
    artist: "Karol",
    basePrice: 4900,
    imageUrl: "/images/plakat-do-druku-sciana-wloskie-swiatlocienie.webp",
    mockupUrl: "/mockups/egzotyczne-cienie-palma-mockup.webp",
    gallery: ["/images/plakat-do-druku-sciana-wloskie-swiatlocienie.webp"],
    aspectRatio: "portrait",
    description: "Spektakularna gra cieni i ciepłych odcieni piaskowca na włoskiej kamienicy z klasycznymi okiennicami. Poczuj leniwy klimat południowego popołudnia.",
    relatedSlugs: ["plakat-do-salonu-greckie-okno", "plakat-do-kuchni-wloskie-klimaty"],
    tags: ["plakaty do druku", "plakaty na ścianę", "plakaty do salonu", "włochy", "ciepłe barwy"],
    colors: ["#E8DCC4", "#8B5A2B", "#556B2F"],
    resolution: "3024x4032",
    productPage: {
      story: "To ujęcie powstało wczesnym popołudniem we Włoszech, gdy słońce zaczyna wędrować niżej i tworzy na budynkach niezwykłe, geometryczne płaszczyzny. Zachwyciła mnie ta idealna, długa linia cienia odcinająca się pod skosem od rozgrzanej, piaskowo-beżowej fasady kamienicy z tradycyjnymi, drewnianymi okiennicami. Soczysta zielona roślinność w donicach u dołu kadru dodaje całości naturalnego balansu i życia. To kwintesencja włoskiego 'dolce far niente' – sztuki słodkiego nicnierobienia.",
      placementTips: "Ten kadr to idealny plakat do salonu do druku, wprowadzający przytulny klimat boho. Doskonale sprawdzi się jako plakat do sypialni czy biura, gdzie dominują naturalne kolory ziemi, beże i tekstylia z lnu. Wprowadza niesamowity, ciepły śródziemnomorski klimat.",
      metaTitle: "Plakat na ścianę do samodzielnego druku – Włoskie Światłocienie",
      metaDescription: "Autorski plakat do druku Włoskie Światłocienie. Ciepłe barwy, styl vintage i boho – idealny plakat do salonu do druku. Pobierz w 2 minuty i wydrukuj w formacie 50x70, A3 lub A4."
    }
  },
  {
    id: "IMG_3217",
    slug: "plakat-do-kuchni-wloskie-klimaty",
    title: "Plakat do kuchni do druku – Włoskie Klimaty (Styl Vintage)",
    subtitle: "Kaktusy i surowa faktura rustykalnego muru",
    artist: "Karol",
    basePrice: 4900,
    imageUrl: "/images/plakat-do-druku-kuchnia-wloskie-klimaty.webp",
    mockupUrl: "/mockups/palma-w-sloncu-liscie-mockup.webp",
    gallery: ["/images/plakat-do-druku-kuchnia-wloskie-klimaty.webp"],
    aspectRatio: "square",
    description: "Rustykalny urok prowincji. Egzotyczna opuncja i sukulenty w terakotowych donicach na tle wiekowego muru i drewnianych wrót.",
    relatedSlugs: ["plakat-do-salonu-greckie-okno", "plakat-na-sciane-wloska-swiatlocienie"],
    tags: ["plakaty do druku", "plakaty do kuchni", "plakaty z pinteresta", "terakota", "boho"],
    colors: ["#DF9B74", "#6B8E23", "#F5F5DC"],
    resolution: "3963x2972",
    productPage: {
      story: "To ujęcie to czysta definicja rustykalnego południa. Zatrzymałem się przy wejściu do starego domu, gdzie surowość i faktura wiekowych, drewnianych wrót oraz chropowatego muru w odcieniach beżu i ochry spotkała się z organicznymi kształtami kaktusów (w tym charakterystycznej opuncji) stojących w tradycyjnych, glinianych donicach. Kolorystyka tej kompozycji idealnie oddaje barwę rozgrzanej słońcem ziemi. To detal z podróży, który ma w sobie mnóstwo naturalnej, spokojnej energii.",
      placementTips: "Stylowe plakaty do kuchni do druku to najprostszy sposób na szybką metamorfozę serca Twojego domu. 'Włoskie Klimaty' wprowadzą do jadalni ciepło toskańskiego słońca i energię południowego poranka. Świetnie uzupełniają wnętrza w stylu retro, vintage i boho, szczególnie w połączeniu z innymi plakatami dekoracyjnymi.",
      metaTitle: "Plakat do kuchni do druku Włoskie Klimaty – pliknaplakat.pl",
      metaDescription: "Odkryj plakat do kuchni do druku „Włoskie Klimaty”. Autorskie zdjęcie w klimacie vintage i boho, idealne do jadalni lub kącika kawowego. Formaty A4, A3, 50x70. Pobierz teraz!"
    }
  },
  {
    id: "IMG_4134",
    slug: "plakat-nowoczesny-hiszpanski-balkon",
    title: "Nowoczesny plakat do salonu do druku – Hiszpański Balkon",
    subtitle: "Klasyczna architektura w mocnym słońcu",
    artist: "Karol",
    basePrice: 4900,
    imageUrl: "/images/plakat-do-druku-nowoczesny-hiszpanski-balkon.webp",
    mockupUrl: "/mockups/hiszpanski-balkon-architektura-mockup.webp",
    gallery: ["/images/plakat-do-druku-nowoczesny-hiszpanski-balkon.webp"],
    aspectRatio: "landscape",
    description: "Symetria, kunsztowne detale z kutejo żelaza i ciepłe andaluzyjskie światło na jasnej fasadzie.",
    relatedSlugs: ["plakat-minimalistyczny-egzotyczne-cienie", "plakat-botaniczny-palma-w-sloncu"],
    tags: ["plakaty do druku", "plakaty do salonu", "architektura", "elegancki", "hiszpania"],
    colors: ["#F4EFEB", "#A0522D", "#333333"],
    resolution: "2944x3926",
    productPage: {
      story: "Kadr uchwycony w południowej Hiszpanii podczas popołudniowej sjesty, gdy ulice zamierają, a główną rolę zaczyna grać ostre światło. Kontrast między idealnie jasną, geometryczną płaszczyzną ściany, głębokim cieniem a kunsztownymi detalami tradycyjnego, czarnego balkonu z kutego żelaza urzekł mnie od pierwszego wejrzenia. Spływająca, soczysta zieleń roślin przełamuje surowość formy. To ujęcie to ponadczasowa, klasyczna elegancja architektury południa Europy.",
      placementTips: "Ten nowoczesny plakat to idealny wybór do salonu, biura czy gabinetu. Autorskie plakaty do biura do druku z motywem europejskiej architektury dodają wnętrzu elegancji. Dzięki miejskiemu stylowi, te dekoracyjne plakaty świetnie komponują się z nowoczesnymi meblami, tworząc spójną całość.",
      metaTitle: "Plakat do salonu i biura do druku Hiszpański Balkon – pliknaplakat.pl",
      metaDescription: "Pobierz nowoczesny plakat do salonu i biura do druku „Hiszpański Balkon”. Autorskie zdjęcie w wysokiej rozdzielczości (A4, A3, 50x70). Nadaj wnętrzu wakacyjny, elegancki klimat!"
    }
  },
  {
    id: "IMG_4226",
    slug: "plakat-minimalistyczny-egzotyczne-cienie",
    title: "Plakat minimalistyczny do druku – Egzotyczne Cienie",
    subtitle: "Artystyczne studium światła i struktury",
    artist: "Karol",
    basePrice: 4900,
    imageUrl: "/images/plakat-do-druku-minimalistyczny-egzotyczne-cienie.webp",
    mockupUrl: "/mockups/wloskie-kaktusy-terakota-mockup.webp",
    gallery: ["/images/plakat-do-druku-minimalistyczny-egzotyczne-cienie.webp"],
    aspectRatio: "portrait",
    description: "Gdy światło staje się artystą. Ostry, geometryczny cień rzucony na minimalistyczną, jasną płaszczyznę.",
    relatedSlugs: ["plakat-nowoczesny-hiszpanski-balkon", "plakat-botaniczny-palma-w-sloncu"],
    tags: ["plakaty do druku", "plakaty z pinteresta", "minimalizm", "modern", "plakaty do sypialni"],
    colors: ["#EAE6DF", "#1C1C1C", "#8C7B6B"],
    resolution: "3896x2922",
    productPage: {
      story: "Uwielbiam detale, w których mniej znaczy więcej, a to zdjęcie to mój absolutny faworyt pod kątem czystej formy. Ten plakat to minimalistyczne studium światła – ostry, bardzo wyraźny, geometryczny zarys liści palmy rzucony przez południowe słońce na jasną wall-fakturę o ciepłym odcieniu off-white. Kompozycja zamyka się nowoczesnym elementem architektury u dołu. To niezwykle artystyczny kadr, bardzo popularny w nowoczesnych trendach wnętrzarskich.",
      placementTips: "Jeśli cenisz harmonię i szukasz subtelnych dekoracji, minimalistyczne plakaty do druku to najlepszy sposób na domowe wyciszenie. 'Egzotyczne Cienie' idealnie dopełnią surowe, nowoczesne przestrzenie w stylu Japandi czy warm minimalism. Ze względu na swoją kojącą formę, to najchętniej wybierany plakat do sypialni do druku. Równie genialnie sprawdzi się jako nowoczesny plakat do łazienki, tworząc atmosferę luksusowego SPA.",
      metaTitle: "Plakat minimalistyczny do druku Egzotyczne Cienie – pliknaplakat.pl",
      metaDescription: "Pobierz minimalistyczny plakat do sypialni i salonu do druku „Egzotyczne Cienie”. Autorska, botaniczna grafika w wysokiej rozdzielczości (A4, A3, 50x70). Stwórz oazę spokoju!"
    }
  },
  {
    id: "IMG_4299",
    slug: "plakat-botaniczny-palma-w-sloncu",
    title: "Plakat botaniczny do druku – Palma w Słońcu",
    subtitle: "Letnia sjesta i wakacyjny luz w jednym kadrze",
    artist: "Karol",
    basePrice: 4900,
    imageUrl: "/images/plakat-do-druku-botaniczny-palma-w-sloncu.webp",
    mockupUrl: "/mockups/greckie-okno-santorini-mockup.webp",
    gallery: ["/images/plakat-do-druku-botaniczny-palma-w-sloncu.webp"],
    aspectRatio: "portrait",
    description: "Rozłożyste, dojrzałe liście palmy w ciepłym, oliwkowo-zielonym odcieniu, fotografowane od dołu na tle bezchmurlnego, pastelowego nieba.",
    relatedSlugs: ["plakat-nowoczesny-hiszpanski-balkon", "plakat-minimalistyczny-egzotyczne-cienie"],
    tags: ["plakaty do druku", "plakaty do salonu", "botanika", "lato", "ciepłe beże"],
    colors: ["#EADCC9", "#5F6A4D", "#D4A373"],
    resolution: "3947x2960",
    productPage: {
      story: "To zdjęcie powstało, gdy po prostu położyłem się w cieniu wielkiej palmy podczas największego popołudniowego upału w nadmorskim miasteczku. Ciepły wiatr delikatnie poruszał potężnymi, dojrzałymi liśćmi, a słońce przedzierało się przez nie, nadając im naturalny, głęboki, oliwkowo-zielony odcień. Jasne, bezchmurne i niemal pastelowe niebo w tle potęguje wrażenie przestrzeni. Ten plakat botaniczny to czysta definicja letniej sjesty – natychmiast obniża tętno i przynosi spokój.",
      placementTips: "Roślinne motywy nigdy nie wychodzą z mody. Wybierając te plakaty botaniczne do druku, zyskujesz ponadczasową dekorację, która ożywi każdą przestrzeń. Palma w Słońcu to unikalny kadr stworzony z myślą o miłośnikach natury, idealny jako główny plakat do salonu do druku. Świetnie sprawdzi się również jako plakat do sypialni do druku, budując kojącą atmosferę 'urban jungle'.",
      metaTitle: "Plakat botaniczny do druku Palma w Słońcu – pliknaplakat.pl",
      metaDescription: "Pobierz plakat botaniczny do salonu i sypialni do druku „Palma w Słońcu”. Autorska fotografia natury w wysokiej rozdzielczości (A4, A3, 50x70). Stwórz swoją domową urban jungle!"
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

