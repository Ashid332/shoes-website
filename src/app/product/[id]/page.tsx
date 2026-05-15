import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import ProductActions from './ProductActions'; // Client component for actions

export const revalidate = 60;

export default async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    notFound();
  }

  // Get related products
  const relatedProducts = await prisma.product.findMany({
    where: { 
      category: product.category,
      id: { not: product.id }
    },
    take: 4,
  });

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Gallery (Simplified for now) */}
          <div className="relative aspect-square bg-surface rounded-3xl p-12 overflow-hidden flex items-center justify-center group border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-full h-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <div className="text-accent font-semibold tracking-widest uppercase text-sm mb-4">
                {product.category}
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                <span className="px-3 py-1 bg-white/10 text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                  In Stock
                </span>
              </div>
              <p className="text-text-secondary leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Client component for size selection and add to cart */}
            <ProductActions product={product} />

            <div className="border-t border-white/10 pt-8 space-y-4 text-sm text-text-secondary">
              <p><strong className="text-white">Shipping:</strong> Free standard shipping on all orders.</p>
              <p><strong className="text-white">Returns:</strong> Free 30-day returns.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
