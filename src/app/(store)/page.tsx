import React from 'react';
import { HeroBanner } from '@/components/storefront/HeroBanner';
import { CategoryGrid } from '@/components/storefront/CategoryGrid';
import { ProductCarousel } from '@/components/storefront/ProductCarousel';
import { fetchFeaturedProducts } from '@/lib/api/products';

export default async function HomePage() {
  // Headless zero-mock contract: fetchFeaturedProducts returns []
  // Data is passed strictly via component props
  const featuredProducts = await fetchFeaturedProducts();

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Hero banner placeholder */}
      <HeroBanner />

      {/* 2. Category grid (Phones, Tablets, Accessories) */}
      <CategoryGrid />

      {/* 3. Empty Product Carousel component ready to receive a list of products via props */}
      <ProductCarousel
        products={featuredProducts}
        title="Featured Mobile Devices"
        subtitle="Experience flagship performance with true headless architecture"
      />
    </div>
  );
}
