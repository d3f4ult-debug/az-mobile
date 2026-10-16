import React, { Suspense } from 'react';
import { fetchProducts } from '@/lib/api/products';
import { PLPClientWrapper } from '@/components/storefront/PLPClientWrapper';
import { ProductFilters } from '@/types/ecommerce';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function PLPContent({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;

  const brands = typeof resolvedParams.brands === 'string'
    ? resolvedParams.brands.split(',').filter(Boolean)
    : undefined;

  const rams = typeof resolvedParams.rams === 'string'
    ? resolvedParams.rams.split(',').filter(Boolean)
    : undefined;

  const storages = typeof resolvedParams.storages === 'string'
    ? resolvedParams.storages.split(',').filter(Boolean)
    : undefined;

  const maxPrice = typeof resolvedParams.maxPrice === 'string'
    ? Number(resolvedParams.maxPrice)
    : undefined;

  const category = typeof resolvedParams.category === 'string'
    ? resolvedParams.category
    : undefined;

  const query = typeof resolvedParams.query === 'string'
    ? resolvedParams.query
    : undefined;

  const filters: ProductFilters = {
    brands,
    rams,
    storages,
    maxPrice,
    category,
    query,
  };

  // Zero-mock headless fetch: returns { data: [], total: 0 }
  const result = await fetchProducts(filters);

  return (
    <PLPClientWrapper
      products={result.data}
      total={result.total}
      category={category}
      query={query}
    />
  );
}

export default function ProductsPage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="py-16 text-center">
          <div className="w-10 h-10 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-neutral-500 font-medium">Loading catalog...</p>
        </div>
      }
    >
      <PLPContent searchParams={props.searchParams} />
    </Suspense>
  );
}
