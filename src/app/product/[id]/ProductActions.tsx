'use client';

import { useState } from 'react';
import { useCart } from '@/store/useCart';

export default function ProductActions({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const addItem = useCart((state) => state.addItem);

  const sizes = ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size first.');
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: selectedSize,
    });
  };

  return (
    <div className="space-y-6 pt-4 border-t border-white/10">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-3">Select Size</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                selectedSize === size
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-text-secondary hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full py-4 bg-accent text-white font-bold uppercase tracking-widest rounded-xl hover:bg-accent/90 transition-all duration-300 transform active:scale-[0.98] shadow-[0_0_40px_-10px_rgba(124,58,237,0.5)]"
      >
        Add To Cart
      </button>
    </div>
  );
}
