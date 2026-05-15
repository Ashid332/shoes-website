'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '@/store/useCart';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    rating: number;
    reviews: number;
  };
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product page
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-surface border border-white/5 rounded-2xl overflow-hidden hover:border-accent/50 transition-colors duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square p-6 bg-gradient-to-b from-white/5 to-transparent overflow-hidden">
        {/* Actions */}
        <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <button className="p-2 bg-white/10 hover:bg-accent backdrop-blur-md rounded-full text-white transition-colors">
            <Heart size={18} />
          </button>
        </div>

        {/* Product Image */}
        <Link href={`/product/${product.id}`}>
          <motion.div
            whileHover={{ scale: 1.05, rotate: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-full h-full relative"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain drop-shadow-xl"
            />
          </motion.div>
        </Link>
      </div>

      {/* Details */}
      <div className="p-6">
        <div className="text-xs text-accent font-semibold tracking-wider uppercase mb-2">
          {product.category}
        </div>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-current" : "text-white/20"} />
            ))}
          </div>
          <span className="text-xs text-text-secondary">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-black text-white">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-accent hover:text-white transition-colors duration-300 relative overflow-hidden group/btn"
          >
            <ShoppingCart size={18} className="relative z-10" />
            <div className="absolute inset-0 bg-accent scale-0 rounded-full group-hover/btn:scale-100 transition-transform duration-300 origin-center" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
