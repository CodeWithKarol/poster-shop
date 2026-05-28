import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Product, WithContext, FAQPage } from 'schema-dts';
import { getPosterBySlug } from '@/lib/posters';
import { productFaqItems } from '@/lib/faq';
import { ProductGallery } from '@/components/shop/ProductGallery';
import { PurchaseCard } from '@/components/shop/PurchaseCard';
import { ProductStory } from '@/components/shop/ProductStory';
import { TechnicalInfo } from '@/components/shop/TechnicalInfo';
import { FAQSection } from '@/components/shop/FAQSection';
import { RelatedProducts } from '@/components/shop/RelatedProducts';

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const poster = getPosterBySlug(slug);

  if (!poster) {
    return {
      title: 'Produkt nie znaleziony',
    };
  }

  return {
    title: poster.productPage.metaTitle,
    description: poster.productPage.metaDescription,
    alternates: {
      canonical: `https://pliknaplakat.pl/plakat/${slug}`,
    },
    openGraph: {
      title: poster.title,
      description: poster.subtitle,
      images: [poster.imageUrl],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const poster = getPosterBySlug(slug);

  if (!poster) {
    notFound();
  }

  // Get title without prefix for breadcrumb
  const breadcrumbTitle = poster.title.split('–').pop()?.trim() || poster.title;

  const jsonLd: (WithContext<Product> | WithContext<FAQPage>)[] = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: poster.title,
      image: `https://www.pliknaplakat.pl${poster.imageUrl}`,
      description: poster.productPage.metaDescription,
      sku: poster.id,
      brand: {
        "@type": "Brand",
        name: "Plik Na Plakat"
      },
      offers: {
        "@type": "Offer",
        url: `https://www.pliknaplakat.pl/plakat/${slug}`,
        priceCurrency: "PLN",
        price: (poster.basePrice / 100).toFixed(2),
        itemCondition: "https://schema.org/NewCondition",
        availability: "https://schema.org/InStock"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: productFaqItems.map(item => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    }
  ];

  return (
    <main className="bg-background min-h-screen text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumbs & Header */}
      <div className="container mx-auto px-6 lg:px-8 max-w-[1400px] py-8 md:py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Sklep
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">{breadcrumbTitle}</span>
        </nav>

        {/* Two-Column Layout: Gallery + Purchase Card */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
           {/* Left Column: Gallery (takes 2/3 on desktop) */}
           <div className="lg:col-span-2">
             <ProductGallery images={[poster.mockupUrl, ...poster.gallery]} title={poster.title} />
           </div>

          {/* Right Column: Purchase Card (takes 1/3 on desktop) */}
          <div className="lg:col-span-1">
            <PurchaseCard poster={poster} />
          </div>
        </div>
      </div>

      {/* Storytelling Section */}
      <div className="container mx-auto px-6 lg:px-8 max-w-[1400px] py-16 md:py-24">
        <ProductStory poster={poster} />
      </div>

      {/* Technical Info Section */}
      <div className="container mx-auto px-6 lg:px-8 max-w-[1400px] py-16 md:py-24 border-t border-border">
        <TechnicalInfo resolution={poster.resolution} />
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-6 lg:px-8 max-w-[1400px] py-16 md:py-24 border-t border-border">
        <FAQSection items={productFaqItems} />
      </div>

      {/* Related Products Section */}
      <div className="container mx-auto px-6 lg:px-8 max-w-[1400px] py-16 md:py-24 border-t border-border">
        <RelatedProducts
          relatedSlugs={poster.relatedSlugs}
          currentSlug={poster.slug}
        />
      </div>

      {/* Footer spacing */}
      <div className="h-12 md:h-24" />
    </main>
  );
}
