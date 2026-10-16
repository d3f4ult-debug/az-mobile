import { neon, NeonQueryFunction } from '@neondatabase/serverless';
import { Product, ProductVariant, Order, Customer, ProductFilters, ProductStatus } from '@/types/ecommerce';

/**
 * Neon Serverless PostgreSQL Database Client & Repository
 * Automatically connects to Neon if DATABASE_URL or POSTGRES_URL is configured.
 * Gracefully provides local runtime persistence when standby mode is active.
 */

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.NEXT_PUBLIC_DATABASE_URL ||
  '';

let sql: NeonQueryFunction<false, false> | null = null;

if (connectionString && connectionString.startsWith('postgres')) {
  try {
    sql = neon(connectionString);
  } catch (err) {
    console.error('[AZ Mobile Neon] Database initialization error:', err);
  }
}

import { INITIAL_PRODUCTS } from '@/lib/data/initialProducts';

// In-memory runtime persistence store initialized with real priced catalog
const localProducts: Product[] = [...INITIAL_PRODUCTS];
const localOrders: Order[] = [];
const localCustomers: Customer[] = [];

interface DbProductRow {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  brand: string;
  category: string;
  base_price: string | number;
  currency: string;
  images: string[] | null;
  variants: ProductVariant[] | null;
  specs: Record<string, string> | null;
  stock_total: number;
  status: ProductStatus;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

interface DbOrderRow {
  id: string;
  order_number: string;
  customer_id: string | null;
  items: Order['items'];
  status: Order['status'];
  payment_status: Order['paymentStatus'];
  total_amount: string | number;
  currency: string;
  shipping_address: Order['shippingAddress'];
  created_at: string;
}

interface DbCustomerRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  orders_count: number;
  total_spent: string | number;
  created_at: string;
}

// Initialize Neon Tables
export async function initializeNeonSchema(): Promise<boolean> {
  if (!sql) return false;

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(64) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        brand VARCHAR(100) NOT NULL,
        category VARCHAR(100) NOT NULL,
        base_price NUMERIC(12, 2) NOT NULL,
        currency VARCHAR(10) DEFAULT 'UZS',
        images JSONB DEFAULT '[]'::jsonb,
        specs JSONB DEFAULT '{}'::jsonb,
        stock_total INT DEFAULT 0,
        status VARCHAR(20) DEFAULT 'active',
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS product_variants (
        id VARCHAR(64) PRIMARY KEY,
        product_id VARCHAR(64) REFERENCES products(id) ON DELETE CASCADE,
        sku VARCHAR(100) NOT NULL,
        color VARCHAR(100),
        color_hex VARCHAR(20),
        storage VARCHAR(50),
        ram VARCHAR(50),
        price NUMERIC(12, 2) NOT NULL,
        stock INT DEFAULT 0,
        image TEXT
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(64) PRIMARY KEY,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        customer_id VARCHAR(64),
        items JSONB NOT NULL,
        status VARCHAR(50) DEFAULT 'kutilmoqda',
        payment_status VARCHAR(50) DEFAULT 'to''lanmagan',
        total_amount NUMERIC(12, 2) NOT NULL,
        currency VARCHAR(10) DEFAULT 'UZS',
        shipping_address JSONB NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS customers (
        id VARCHAR(64) PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(150),
        phone VARCHAR(50) NOT NULL,
        orders_count INT DEFAULT 0,
        total_spent NUMERIC(12, 2) DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // Auto-seed if Neon products table is empty
    const countResult = (await sql`SELECT COUNT(*)::int as count FROM products;`) as unknown as Array<{ count: number }>;
    if (countResult[0]?.count === 0) {
      for (const prod of INITIAL_PRODUCTS) {
        await sql`
          INSERT INTO products (id, title, slug, description, brand, category, base_price, currency, images, specs, stock_total, status, is_featured)
          VALUES (${prod.id}, ${prod.title}, ${prod.slug}, ${prod.description}, ${prod.brand}, ${prod.category}, ${prod.basePrice}, 'UZS', ${JSON.stringify(prod.images || [])}::jsonb, ${JSON.stringify(prod.specs || {})}::jsonb, ${prod.stockTotal}, ${prod.status}, ${Boolean(prod.isFeatured)})
          ON CONFLICT (id) DO NOTHING;
        `;
        for (const v of prod.variants) {
          await sql`
            INSERT INTO product_variants (id, product_id, sku, color, color_hex, storage, ram, price, stock)
            VALUES (${v.id}, ${prod.id}, ${v.sku}, ${v.color}, ${v.colorHex}, ${v.storage}, ${v.ram || ''}, ${v.price}, ${v.stock})
            ON CONFLICT (id) DO NOTHING;
          `;
        }
      }
    }

    return true;
  } catch (error) {
    console.error('[AZ Mobile Neon Schema Error]:', error);
    return false;
  }
}

// Check database connection status
export async function getDatabaseStatus(): Promise<{
  connected: boolean;
  type: 'Neon Serverless Postgres' | 'Mahalliy xotira (Standby)';
  urlConfigured: boolean;
}> {
  if (sql) {
    try {
      await sql`SELECT 1;`;
      return {
        connected: true,
        type: 'Neon Serverless Postgres',
        urlConfigured: true,
      };
    } catch {
      // Fallback
    }
  }

  return {
    connected: false,
    type: 'Mahalliy xotira (Standby)',
    urlConfigured: Boolean(connectionString),
  };
}

// ------------------- PRODUCT REPOSITORY -------------------

export async function dbGetProducts(filters?: ProductFilters): Promise<{ products: Product[]; total: number }> {
  if (sql) {
    try {
      await initializeNeonSchema();
      const rows = (await sql`
        SELECT 
          p.*, 
          COALESCE(
            json_agg(
              json_build_object(
                'id', v.id,
                'productId', v.product_id,
                'sku', v.sku,
                'color', v.color,
                'colorHex', v.color_hex,
                'storage', v.storage,
                'ram', v.ram,
                'price', v.price,
                'stock', v.stock,
                'image', v.image
              )
            ) FILTER (WHERE v.id IS NOT NULL), '[]'
          ) as variants
        FROM products p
        LEFT JOIN product_variants v ON p.id = v.product_id
        GROUP BY p.id
        ORDER BY p.created_at DESC;
      `) as unknown as DbProductRow[];

      const products: Product[] = rows.map((r) => ({
        id: r.id,
        title: r.title,
        slug: r.slug,
        description: r.description || '',
        brand: r.brand,
        category: r.category,
        basePrice: Number(r.base_price),
        currency: r.currency || 'UZS',
        images: Array.isArray(r.images) ? r.images : [],
        variants: Array.isArray(r.variants) ? r.variants : [],
        specs: r.specs || {},
        stockTotal: Number(r.stock_total || 0),
        status: r.status,
        isFeatured: Boolean(r.is_featured),
        createdAt: r.created_at,
        updatedAt: r.updated_at,
      }));

      // In-memory filter layer
      let filtered = products;
      if (filters?.category) {
        filtered = filtered.filter((p) => p.category.toLowerCase() === filters.category?.toLowerCase());
      }
      if (filters?.brands?.length) {
        filtered = filtered.filter((p) => filters.brands?.includes(p.brand));
      }
      if (filters?.maxPrice) {
        filtered = filtered.filter((p) => p.basePrice <= (filters.maxPrice || 0));
      }
      if (filters?.query) {
        const q = filters.query.toLowerCase();
        filtered = filtered.filter((p) => p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
      }

      return { products: filtered, total: filtered.length };
    } catch (err) {
      console.warn('[Neon Postgres fetch error]:', err);
    }
  }

  // Local fallback
  let list = [...localProducts];
  if (filters?.category) {
    list = list.filter((p) => p.category.toLowerCase() === filters.category?.toLowerCase());
  }
  if (filters?.brands?.length) {
    list = list.filter((p) => filters.brands?.includes(p.brand));
  }
  if (filters?.maxPrice) {
    list = list.filter((p) => p.basePrice <= (filters.maxPrice || 0));
  }
  if (filters?.query) {
    const q = filters.query.toLowerCase();
    list = list.filter((p) => p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
  }

  return { products: list, total: list.length };
}

export async function dbGetProductBySlug(slug: string): Promise<Product | null> {
  if (sql) {
    try {
      await initializeNeonSchema();
      const rows = (await sql`
        SELECT 
          p.*, 
          COALESCE(
            json_agg(
              json_build_object(
                'id', v.id,
                'productId', v.product_id,
                'sku', v.sku,
                'color', v.color,
                'colorHex', v.color_hex,
                'storage', v.storage,
                'ram', v.ram,
                'price', v.price,
                'stock', v.stock,
                'image', v.image
              )
            ) FILTER (WHERE v.id IS NOT NULL), '[]'
          ) as variants
        FROM products p
        LEFT JOIN product_variants v ON p.id = v.product_id
        WHERE p.slug = ${slug}
        GROUP BY p.id
        LIMIT 1;
      `) as unknown as DbProductRow[];

      if (rows.length > 0) {
        const r = rows[0];
        return {
          id: r.id,
          title: r.title,
          slug: r.slug,
          description: r.description || '',
          brand: r.brand,
          category: r.category,
          basePrice: Number(r.base_price),
          currency: r.currency || 'UZS',
          images: Array.isArray(r.images) ? r.images : [],
          variants: Array.isArray(r.variants) ? r.variants : [],
          specs: r.specs || {},
          stockTotal: Number(r.stock_total || 0),
          status: r.status,
          isFeatured: Boolean(r.is_featured),
          createdAt: r.created_at,
          updatedAt: r.updated_at,
        };
      }
    } catch (err) {
      console.warn('[Neon fetch by slug error]:', err);
    }
  }

  return localProducts.find((p) => p.slug === slug) || null;
}

export async function dbCreateProduct(newProduct: {
  title: string;
  description: string;
  brand: string;
  category: string;
  basePrice: number;
  status: ProductStatus;
  images?: string[];
  variants: Array<{
    color: string;
    colorHex: string;
    storage: string;
    ram: string;
    price: number;
    sku: string;
    stock: number;
  }>;
}): Promise<Product> {
  const id = `prod-${Date.now()}`;
  const slug = newProduct.title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '') || `product-${Date.now()}`;

  const stockTotal = newProduct.variants.reduce((sum, v) => sum + (v.stock || 0), 0);

  const productVariants: ProductVariant[] = newProduct.variants.map((v, idx) => ({
    id: `var-${Date.now()}-${idx + 1}`,
    productId: id,
    sku: v.sku || `AZ-SKU-${Date.now()}-${idx + 1}`,
    color: v.color,
    colorHex: v.colorHex,
    storage: v.storage,
    ram: v.ram,
    price: v.price || newProduct.basePrice,
    stock: v.stock,
    inStock: v.stock > 0,
  }));

  const productRecord: Product = {
    id,
    title: newProduct.title,
    slug,
    description: newProduct.description,
    brand: newProduct.brand,
    category: newProduct.category,
    basePrice: newProduct.basePrice,
    currency: 'UZS',
    images: newProduct.images || [],
    variants: productVariants,
    stockTotal,
    status: newProduct.status,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (sql) {
    try {
      await initializeNeonSchema();
      await sql`
        INSERT INTO products (id, title, slug, description, brand, category, base_price, currency, images, specs, stock_total, status, is_featured)
        VALUES (${id}, ${newProduct.title}, ${slug}, ${newProduct.description}, ${newProduct.brand}, ${newProduct.category}, ${newProduct.basePrice}, 'UZS', ${JSON.stringify(productRecord.images)}::jsonb, '{}'::jsonb, ${stockTotal}, ${newProduct.status}, true);
      `;

      for (const v of productVariants) {
        await sql`
          INSERT INTO product_variants (id, product_id, sku, color, color_hex, storage, ram, price, stock)
          VALUES (${v.id}, ${id}, ${v.sku}, ${v.color}, ${v.colorHex}, ${v.storage}, ${v.ram || ''}, ${v.price}, ${v.stock});
        `;
      }
    } catch (err) {
      console.error('[Neon Insert Product Error]:', err);
    }
  }

  // Also preserve in local runtime
  localProducts.unshift(productRecord);
  return productRecord;
}

// ------------------- ORDERS REPOSITORY -------------------

export async function dbGetOrders(): Promise<Order[]> {
  if (sql) {
    try {
      await initializeNeonSchema();
      const rows = (await sql`SELECT * FROM orders ORDER BY created_at DESC;`) as unknown as DbOrderRow[];
      return rows.map((r) => ({
        id: r.id,
        orderNumber: r.order_number,
        customerId: r.customer_id || '',
        items: r.items,
        status: r.status,
        paymentStatus: r.payment_status,
        totalAmount: Number(r.total_amount),
        currency: r.currency || 'UZS',
        shippingAddress: r.shipping_address,
        createdAt: r.created_at,
        updatedAt: r.created_at,
      }));
    } catch (err) {
      console.warn('[Neon Orders error]:', err);
    }
  }

  return localOrders;
}

// ------------------- CUSTOMERS REPOSITORY -------------------

export async function dbGetCustomers(): Promise<Customer[]> {
  if (sql) {
    try {
      await initializeNeonSchema();
      const rows = (await sql`SELECT * FROM customers ORDER BY created_at DESC;`) as unknown as DbCustomerRow[];
      return rows.map((r) => ({
        id: r.id,
        firstName: r.first_name,
        lastName: r.last_name,
        email: r.email,
        phone: r.phone,
        addresses: [],
        ordersCount: r.orders_count || 0,
        totalSpent: Number(r.total_spent || 0),
        currency: 'UZS',
        createdAt: r.created_at,
      }));
    } catch (err) {
      console.warn('[Neon Customers error]:', err);
    }
  }

  return localCustomers;
}
