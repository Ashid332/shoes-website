import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/product/ProductCard';

export const revalidate = 60; // revalidate every minute

export default async function CollectionPage(props: { params: Promise<{ category: string }> }) {
  const params = await props.params;
  const { category } = params;
  
  const products = await prisma.product.findMany({
    where: category === 'all' ? {} : { category: { equals: category } },
    orderBy: { createdAt: 'desc' },
  });

  const displayCategory = category === 'all' ? 'All Collection' : category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">
            {displayCategory}
          </h1>
          <p className="text-text-secondary max-w-2xl">
            Explore our curated selection of premium footwear. Designed for those who demand excellence in both form and function.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">No products found</h3>
            <p className="text-text-secondary">Check back later for new arrivals.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
