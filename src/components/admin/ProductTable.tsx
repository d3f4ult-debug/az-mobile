import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/ecommerce';
import { PackageOpen, Plus, Eye, Edit3 } from 'lucide-react';

interface ProductTableProps {
  products: Product[];
  onRefresh?: () => void;
}

export function ProductTable({ products }: ProductTableProps) {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-neutral-800 bg-neutral-950/60 my-6">
        <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-4 text-neutral-400">
          <PackageOpen className="w-8 h-8 stroke-[1.25]" />
        </div>
        <h3 className="text-xl font-bold tracking-tight text-white mb-2">
          Mahsulotlar mavjud emas
        </h3>
        <p className="text-neutral-400 text-sm max-w-md mb-6 leading-relaxed">
          Katalogda hozircha birorta ham qurilma kiritilmagan. Birinchi smartfon yoki aksessuarni qo&apos;shing yoki bosh sahifadagi namunaviy to&apos;plamni yuklang.
        </p>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-white text-black hover:bg-neutral-200 transition-all shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi mahsulot qo&apos;shish</span>
        </Link>
      </div>
    );
  }

  const getCategoryTitle = (cat: string) => {
    if (cat === 'Phones') return 'Smartfon';
    if (cat === 'Tablets') return 'Planshet';
    if (cat === 'Accessories') return 'Aksessuar';
    return cat;
  };

  return (
    <div className="rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-950/60 shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-neutral-300">
          <thead className="bg-neutral-900/90 text-neutral-400 text-xs uppercase tracking-wider border-b border-neutral-800">
            <tr>
              <th scope="col" className="px-6 py-4">Rasm</th>
              <th scope="col" className="px-6 py-4">Nomi</th>
              <th scope="col" className="px-6 py-4">Artikul (SKU)</th>
              <th scope="col" className="px-6 py-4">Narxi</th>
              <th scope="col" className="px-6 py-4">Qoldiq</th>
              <th scope="col" className="px-6 py-4">Holati</th>
              <th scope="col" className="px-6 py-4 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/80">
            {products.map((product) => {
              const primaryVariant = product.variants?.[0];
              const sku = primaryVariant?.sku || 'SKU-NONE';
              const price = primaryVariant?.price ?? product.basePrice;

              return (
                <tr key={product.id} className="hover:bg-neutral-900/50 transition-colors">
                  {/* Image Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden flex items-center justify-center text-xs text-neutral-500">
                      {product.images && product.images[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <span>Rasm</span>
                      )}
                    </div>
                  </td>

                  {/* Name Column */}
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">{product.title}</div>
                    <div className="text-xs text-neutral-400 flex items-center gap-2 mt-0.5">
                      <span>{product.brand}</span>
                      <span>•</span>
                      <span>{getCategoryTitle(product.category)}</span>
                    </div>
                  </td>

                  {/* SKU Column */}
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-neutral-300">
                    {sku}
                  </td>

                  {/* Price Column */}
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-white font-mono">
                    {price.toLocaleString()} so&apos;m
                  </td>

                  {/* Stock Level Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          product.stockTotal > 10
                            ? 'bg-emerald-500'
                            : product.stockTotal > 0
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                      />
                      <span className="text-xs font-medium">
                        {product.stockTotal} dona
                      </span>
                    </div>
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                        product.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : product.status === 'draft'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                      }`}
                    >
                      {product.status === 'active' ? 'Faol' : product.status === 'draft' ? 'Qoralama' : 'Arxivlangan'}
                    </span>
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        href={`/products/${product.slug || product.id}`}
                        target="_blank"
                        className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                        title="Do'konda ko'rish"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                        title="Tahrirlash"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
