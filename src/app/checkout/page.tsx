'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/store/useCart';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-black uppercase mb-4">Your Cart is Empty</h1>
        <p className="text-text-secondary mb-8">Add some premium kicks to your cart to checkout.</p>
        <button
          onClick={() => router.push('/collection/all')}
          className="px-8 py-3 bg-white text-black font-bold rounded-full uppercase tracking-widest"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      clearCart();
      alert('Order Placed Successfully! (This is a demo)');
      router.push('/');
    }, 2000);
  };

  const total = getCartTotal();
  const shipping = total > 150 ? 0 : 15;
  const grandTotal = total + shipping;

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-surface border border-white/5 rounded-3xl p-8">
              <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Shipping Information</h2>
              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">First Name</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">Last Name</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-2">Address</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">City</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">Postal Code</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none" />
                  </div>
                </div>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-surface border border-white/5 rounded-3xl p-8">
              <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Payment Method</h2>
              <div className="space-y-4">
                <div className="p-4 border border-accent rounded-xl bg-accent/5 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-4 border-accent bg-background"></div>
                    <span className="font-semibold text-white">Credit Card</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 pt-4">
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">Card Number</label>
                    <input required form="checkout-form" type="text" placeholder="0000 0000 0000 0000" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-text-secondary mb-2">Expiry Date</label>
                      <input required form="checkout-form" type="text" placeholder="MM/YY" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm text-text-secondary mb-2">CVC</label>
                      <input required form="checkout-form" type="text" placeholder="123" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-surface border border-white/5 rounded-3xl p-8 sticky top-32">
              <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-text-secondary">{item.quantity}x</span>
                      <span className="text-white line-clamp-1 w-32">{item.name}</span>
                    </div>
                    <span className="text-white font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3 mb-8">
                <div className="flex justify-between text-text-secondary">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-white pt-4 border-t border-white/10">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={loading}
                className="w-full py-4 bg-accent text-white font-bold uppercase tracking-widest rounded-xl hover:bg-accent/90 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
