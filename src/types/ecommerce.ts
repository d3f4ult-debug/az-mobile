/**
 * AZ Mobile Headless E-Commerce Domain Types & Interfaces
 * Designed for headless e-commerce backend integration (Shopify, Medusa, Saleor, custom API).
 */

export type ProductStatus = 'draft' | 'active' | 'archived';

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  title?: string;
  color: string;
  colorHex: string;
  storage: string; // e.g. "128GB", "256GB", "512GB", "1TB"
  ram?: string;    // e.g. "8GB", "12GB", "16GB"
  price: number;
  compareAtPrice?: number;
  stock: number;
  inStock: boolean;
  image?: string;
}

export interface ProductSpecifications {
  screen?: string;
  processor?: string;
  ram?: string;
  storage?: string;
  battery?: string;
  camera?: string;
  os?: string;
  network?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  brand: string;
  category: 'Phones' | 'Tablets' | 'Accessories' | string;
  basePrice: number;
  currency: string;
  images: string[];
  variants: ProductVariant[];
  specs?: ProductSpecifications;
  stockTotal: number;
  status: ProductStatus;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  title: string;
  sku: string;
  color?: string;
  storage?: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded' | 'failed';

export interface ShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  region: string;
  country: string;
  postalCode?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customer?: Customer;
  items: OrderItem[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  currency: string;
  shippingAddress: ShippingAddress;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addresses: ShippingAddress[];
  ordersCount: number;
  totalSpent: number;
  currency: string;
  createdAt: string;
}

export interface ProductFilters {
  brands?: string[];
  rams?: string[];
  storages?: string[];
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  query?: string;
  sort?: 'price_asc' | 'price_desc' | 'latest' | 'popular';
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
