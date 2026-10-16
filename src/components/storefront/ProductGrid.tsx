'use client';

import React from 'react';
import { Product } from '@/types/ecommerce';
import { ProductCard } from '@/components/storefront/ProductCard';
import { EmptyState } from '@/components/ui/EmptyState';

interface ProductGridProps {
  products: Product[];
  total?: number;
  onClearFilters?: () => void;
}

export function ProductGrid({
  products,
  total = 0,
  onClearFilters,
}: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <EmptyState
        type="products"
        title="Qurilmalar topilmadi"
        description="Tanlangan filtrlar bo'yicha hech qanday mahsulot topilmadi. Narx chegaralarini kengaytiring yoki filtrlarni tozalang."
        actionText="Barcha filtrlarni tozalash"
        actionHref="/products"
        onAction={onClearFilters}
        className="my-4 min-h-[380px]"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-xs text-neutral-500 font-medium">
        <span>Jami {total || products.length} ta mahsulotdan {products.length} tasi ko&apos;rsatilmoqda</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
