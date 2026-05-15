'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center space-x-2 bg-surface/50 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-text-secondary uppercase">New Collection 2026</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
            STEP INTO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">
              GREATNESS.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-text-secondary max-w-md leading-relaxed font-light">
            Experience the next generation of footwear. Engineered for peak performance, designed for unparalleled style.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/collection/all" className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest overflow-hidden rounded-sm transition-all hover:scale-105 active:scale-95">
              <span className="relative z-10">Shop Now</span>
              <div className="absolute inset-0 h-full w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full z-0" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Shop Now</span>
            </Link>
            
            <Link href="#explore" className="text-sm font-semibold uppercase tracking-widest text-text-secondary hover:text-white transition-colors flex items-center space-x-2">
              <span>Explore</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 border-t border-white/10 flex items-center space-x-8">
            <div>
              <p className="text-3xl font-bold text-white">4.9/5</p>
              <p className="text-xs text-text-secondary uppercase tracking-wider">Customer Rating</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">10k+</p>
              <p className="text-xs text-text-secondary uppercase tracking-wider">Happy Customers</p>
            </div>
          </div>
        </motion.div>

        {/* 3D Shoe Visual */}
        <motion.div
          className="relative h-[50vh] lg:h-[80vh] flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1000 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            style={{ rotateX, rotateY, z: 100 }}
            className="relative w-full h-full flex items-center justify-center z-10"
          >
            {/* The Shoe Image */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative w-full max-w-lg aspect-square drop-shadow-2xl"
            >
              <Image
                src="/image/shoes.png"
                alt="Premium Nike Shoe"
                fill
                className="object-contain drop-shadow-[0_20px_50px_rgba(124,58,237,0.3)] filter"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Background Typography behind shoe */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
            <h2 className="text-[15rem] md:text-[20rem] font-black text-white/5 tracking-tighter select-none">
              NIKE
            </h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
