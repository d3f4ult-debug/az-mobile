'use client';

import React, { useRef } from 'react';
import { Product } from '@/types/ecommerce';
import { ProductCard } from '@/components/storefront/ProductCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface ProductCarouselProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export function ProductCarousel({
  products,
  title = 'Tavsiya etilgan flagmanlar',
  subtitle = 'Rasmiy ishlab chiqaruvchi kafolati bilan sertifikatlangan qurilmalar',
}: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12">
      {/* Carousel Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-neutral-500 uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Tanlangan to&apos;plam</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-neutral-500 mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {/* Carousel Navigation Arrows */}
        {products && products.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-700 transition-colors shadow-xs"
              aria-label="Chapga surish"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-700 transition-colors shadow-xs"
              aria-label="O'ngga surish"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Carousel Content */}
      {products && products.length > 0 ? (
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[280px] max-w-[300px] sm:min-w-[320px] snap-start shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          type="products"
          title="Tavsiya etilgan qurilmalar kutilmoqda"
          description="Neon PostgreSQL bazasi ulanmoqda yoki mahsulotlar kiritilmoqda. Admin paneldan yangi mahsulot qo'shing yoki namunaviy to'plamni yuklang."
          actionText="Barcha mahsulotlar katalogi"
          actionHref="/products"
        />
      )}
    </section>
  );
}
