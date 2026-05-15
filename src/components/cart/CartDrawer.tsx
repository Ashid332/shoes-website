'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/store/useCart';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartDrawer() {
  const { isOpen, toggleCart, items, updateQuantity, removeItem, getCartTotal } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-surface border-l border-white/10 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-bold uppercase tracking-wider flex items-center gap-2">
                <ShoppingBag size={20} className="text-accent" />
                Your Cart
              </h2>
              <button
                onClick={toggleCart}
                className="p-2 text-text-secondary hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag size={32} className="text-text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Your cart is empty</h3>
                  <p className="text-text-secondary">Looks like you haven't added anything yet.</p>
                  <button
                    onClick={toggleCart}
                    className="mt-8 px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.size}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex gap-4 bg-white/5 p-4 rounded-2xl border border-white/5"
                  >
                    <div className="relative w-24 h-24 bg-white/5 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2 drop-shadow-lg"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-white line-clamp-1">{item.name}</h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-text-secondary hover:text-red-500 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-text-secondary mt-1 uppercase tracking-wider">
                          Size: {item.size}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center bg-background rounded-lg border border-white/10">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-2 text-text-secondary hover:text-white transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-text-secondary hover:text-white transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-bold text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/10 p-6 bg-surface/50 backdrop-blur-md">
                <div className="flex justify-between items-center mb-6 text-lg">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="font-bold text-2xl text-white">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
                <Link href="/checkout" onClick={toggleCart} className="block">
                  <button className="w-full py-4 bg-accent text-white font-bold uppercase tracking-widest rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-[0_0_30px_-10px_rgba(124,58,237,0.5)]">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
