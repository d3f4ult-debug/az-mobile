import React from 'react';
import Link from 'next/link';
import { fetchProducts } from '@/lib/api/products';
import { ProductTable } from '@/components/admin/ProductTable';
import { Plus, Search } from 'lucide-react';
import { SeedButton } from '@/components/admin/SeedButton';

export default async function AdminProductsPage() {
  const result = await fetchProducts();

  return (
    <div className="space-y-6">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            Katalog ma&apos;lumotlar bazasi
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Mahsulotlarni boshqarish
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
            Neon PostgreSQL bazasidagi barcha smartfonlar, planshetlar va aksessuarlar.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <SeedButton />
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-white text-black hover:bg-neutral-200 active:scale-95 transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Yangi mahsulot</span>
          </Link>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Nomi, SKU yoki brend bo'yicha qidirish..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-800 focus:border-neutral-600 focus:outline-none text-white placeholder:text-neutral-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs text-neutral-400">
            Jami qurilmalar: <strong className="text-white font-mono">{result.total} ta</strong>
          </span>
        </div>
      </div>

      {/* Product Management Table */}
      <ProductTable products={result.data} />
    </div>
  );
}
