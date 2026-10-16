'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/ecommerce';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();
  const primaryVariant = product.variants?.[0];
  const price = primaryVariant?.price || product.basePrice;
  const formatted = formatPrice(price, { showDual: true });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      variantId: primaryVariant?.id,
      title: product.title,
      sku: primaryVariant?.sku || 'SKU-PENDING',
      color: primaryVariant?.color,
      storage: primaryVariant?.storage,
      price,
      quantity: 1,
      imageUrl: product.images?.[0],
    });
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-neutral-200/80 p-4 transition-all duration-300 hover:shadow-xl hover:border-neutral-300">
      {/* Badge / Brand */}
      <div className="flex items-center justify-between text-xs mb-3">
        <span className="font-semibold text-neutral-500 uppercase tracking-wider text-[10px]">
          {product.brand}
        </span>
        {product.stockTotal > 0 ? (
          <span className="inline-flex items-center text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            Mavjud
          </span>
        ) : (
          <span className="inline-flex items-center text-[10px] font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
            Buyurtma asosida
          </span>
        )}
      </div>

      {/* Image Container */}
      <Link
        href={`/products/${product.slug || product.id}`}
        className="relative aspect-square w-full rounded-xl bg-neutral-50 flex items-center justify-center overflow-hidden mb-4 group-hover:bg-neutral-100/70 transition-colors p-3"
      >
        {product.images && product.images.length > 0 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
          />
        ) : (
          <div className="text-center p-4">
            <span className="text-xs text-neutral-400 font-mono">AZ Mobile Display</span>
          </div>
        )}

        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <span className="p-2 rounded-full bg-white shadow-md text-neutral-800">
            <Eye className="w-4 h-4" />
          </span>
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/products/${product.slug || product.id}`}>
            <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-black line-clamp-2 leading-snug">
              {product.title}
            </h3>
          </Link>

          {/* Quick Specs chips if available */}
          {product.specs && (
            <div className="flex flex-wrap gap-1 mt-2">
              {product.specs.ram && (
                <span className="text-[10px] text-neutral-600 bg-neutral-100 px-1.5 py-0.5 rounded">
                  {product.specs.ram} RAM
                </span>
              )}
              {product.specs.storage && (
                <span className="text-[10px] text-neutral-600 bg-neutral-100 px-1.5 py-0.5 rounded">
                  {product.specs.storage}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Pricing & Add to Cart button */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-neutral-400 block text-[10px] uppercase tracking-wider">Narxi</span>
            <span className="text-base font-bold text-neutral-950 font-mono">
              {formatted.primary}
            </span>
            {formatted.secondary && (
              <span className="text-[11px] text-neutral-500 block font-mono">
                {formatted.secondary}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="p-2.5 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95 transition-all shadow-xs cursor-pointer"
            aria-label={`${product.title} mahsulotini savatchaga qo'shish`}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
