'use client';

import React, { useState, Suspense } from 'react';
import { Product } from '@/types/ecommerce';
import { ProductFilterSidebar } from '@/components/storefront/ProductFilterSidebar';
import { ProductGrid } from '@/components/storefront/ProductGrid';
import { SlidersHorizontal } from 'lucide-react';

interface PLPClientWrapperProps {
  products: Product[];
  total: number;
  category?: string;
  query?: string;
}

export function PLPClientWrapper({
  products,
  total,
  category,
  query,
}: PLPClientWrapperProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const getCategoryTitle = (cat?: string) => {
    if (cat === 'Phones') return 'Smartfonlar';
    if (cat === 'Tablets') return 'Planshetlar';
    if (cat === 'Accessories') return 'Aksessuarlar';
    return cat;
  };

  return (
    <div className="py-8 space-y-6">
      {/* Title & Mobile Filter Trigger Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
            Mahsulotlar katalogi
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mt-0.5">
            {category ? `${getCategoryTitle(category)} to'plami` : query ? `Qidiruv: "${query}"` : 'Barcha mobil texnikalar'}
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Rasmiy kafolatga ega original qurilmalar va aksessuarlar.
          </p>
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Katalogni filtrlash</span>
          </button>
        </div>
      </div>

      {/* Main Grid & Desktop Filter Sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 items-start">
        {/* Desktop Sidebar (Left Column) */}
        <aside className="hidden md:block md:col-span-1 lg:col-span-1 sticky top-24 rounded-2xl bg-neutral-50/70 border border-neutral-200/80 p-5">
          <Suspense fallback={<div className="animate-pulse h-64 bg-neutral-100 rounded-xl" />}>
            <ProductFilterSidebar />
          </Suspense>
        </aside>

        {/* Product Grid Area (Right Columns) */}
        <div className="md:col-span-3 lg:col-span-4">
          <ProductGrid products={products} total={total} />
        </div>
      </div>

      {/* Mobile Filter Slide-out Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex w-full sm:max-w-md bg-white shadow-2xl flex-col z-10 overflow-y-auto">
            <Suspense fallback={<div className="p-6 animate-pulse h-64 bg-neutral-100" />}>
              <ProductFilterSidebar
                isMobileModal={true}
                onCloseMobile={() => setIsMobileFilterOpen(false)}
              />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}
