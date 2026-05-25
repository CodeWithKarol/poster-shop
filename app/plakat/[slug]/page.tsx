import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPosterBySlug } from '@/lib/posters';
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

  return (
    <main className="bg-white min-h-screen">
      {/* Breadcrumbs & Header */}
      <div className="container mx-auto px-6 lg:px-8 max-w-[1400px] py-8 md:py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs md:text-sm text-zinc-600 mb-8">
          <a href="/" className="hover:text-black transition-colors">
            Sklep
          </a>
          <span>/</span>
          <span className="text-black font-semibold">{breadcrumbTitle}</span>
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
      <div className="container mx-auto px-6 lg:px-8 max-w-[1400px]">
        <ProductStory poster={poster} />
      </div>

      {/* Technical Info Section */}
      <div className="container mx-auto px-6 lg:px-8 max-w-[1400px]">
        <TechnicalInfo resolution={poster.resolution} />
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-6 lg:px-8 max-w-[1400px]">
        <FAQSection />
      </div>

      {/* Related Products Section */}
      <div className="container mx-auto px-6 lg:px-8 max-w-[1400px]">
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
