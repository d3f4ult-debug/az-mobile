import { Product, ProductFilters, PaginatedResult } from '@/types/ecommerce';
import { dbGetProducts, dbGetProductBySlug } from '@/lib/db/neon';

/**
 * Headless API Client & Database Service (Neon Postgres Connected)
 * Supports live Neon serverless Postgres queries and headless HTTP endpoints.
 */

export async function fetchProducts(
  filters?: ProductFilters,
  page: number = 1,
  pageSize: number = 12
): Promise<PaginatedResult<Product>> {
  try {
    const { products, total } = await dbGetProducts(filters);
    return {
      data: products,
      total,
      page,
      pageSize,
      hasMore: total > page * pageSize,
    };
  } catch (err) {
    console.error('[AZ Mobile API fetchProducts error]:', err);
    return {
      data: [],
      total: 0,
      page,
      pageSize,
      hasMore: false,
    };
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    return await dbGetProductBySlug(slug);
  } catch (err) {
    console.error(`[AZ Mobile API fetchProductBySlug error for ${slug}]:`, err);
    return null;
  }
}

export async function fetchFeaturedProducts(limit: number = 8): Promise<Product[]> {
  try {
    const { products } = await dbGetProducts({ sort: 'popular' });
    return products.slice(0, limit);
  } catch (err) {
    console.error('[AZ Mobile API fetchFeaturedProducts error]:', err);
    return [];
  }
}
