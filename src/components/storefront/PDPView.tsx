'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product, ProductVariant } from '@/types/ecommerce';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ChevronRight,
  Sparkles,
  Info,
  ArrowLeft,
  Plus,
  Minus,
} from 'lucide-react';

interface PDPViewProps {
  product: Product | null;
  slug?: string;
}

export function PDPView({ product, slug }: PDPViewProps) {
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();

  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(
    product?.variants?.[0]?.id
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Variant resolution
  const selectedVariant: ProductVariant | undefined =
    product?.variants?.find((v) => v.id === selectedVariantId) ||
    product?.variants?.[0];

  const currentPrice = selectedVariant?.price ?? product?.basePrice ?? 0;
  const currentImages = product?.images && product.images.length > 0 ? product.images : [];

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      productId: product.id,
      variantId: selectedVariant?.id,
      title: product.title,
      sku: selectedVariant?.sku || 'SKU-HEADLESS',
      color: selectedVariant?.color,
      storage: selectedVariant?.storage,
      price: currentPrice,
      quantity,
      imageUrl: currentImages[selectedImageIndex] || currentImages[0],
    });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  // SKELETON / STANDBY STATE
  if (!product) {
    return (
      <div className="py-8 space-y-8 max-w-7xl mx-auto">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <Link href="/products" className="hover:text-black flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Mahsulotlarga qaytish</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-neutral-300" />
          <span className="font-mono text-neutral-500">{slug || 'Qurilma'}</span>
        </div>

        {/* Headless Notice Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-neutral-800 text-blue-400 shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                Neon PostgreSQL / Headless Baza tayyor
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5 max-w-2xl">
                Ushbu sahifa real vaqtda bazadan <code className="text-neutral-300 font-mono">dbGetProductBySlug(&apos;{slug}&apos;)</code> orqali ma&apos;lumot oladi. Admin paneldan yangi mahsulot kiritishingiz yoki namunaviy to&apos;plamni yuklashingiz mumkin.
              </p>
            </div>
          </div>
          <Link
            href="/products"
            className="px-4 py-2 text-xs font-semibold rounded-full bg-white text-black hover:bg-neutral-200 transition-colors shrink-0"
          >
            Katalogni ko&apos;rish
          </Link>
        </div>

        {/* Architectural Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            <div className="aspect-square w-full rounded-3xl bg-neutral-100 border border-neutral-200 flex flex-col items-center justify-center p-8 text-center animate-pulse">
              <div className="w-24 h-24 rounded-2xl bg-neutral-200/80 mb-4 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-neutral-400" />
              </div>
              <span className="text-sm font-medium text-neutral-500">
                Rasmlar galereyasi
              </span>
              <span className="text-xs text-neutral-400 mt-1">
                Bazada fotosuratlar kutilmoqda
              </span>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-neutral-200 rounded-full animate-pulse" />
              <div className="h-8 w-3/4 bg-neutral-200 rounded-lg animate-pulse" />
              <div className="h-4 w-1/2 bg-neutral-150 rounded animate-pulse" />
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
              <div className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                Rasmiy chakana narxi
              </div>
              <div className="h-8 w-32 bg-neutral-300 rounded-lg animate-pulse" />
              <p className="text-xs text-neutral-500">QQS va 1 yillik rasmiy kafolat kiritilgan</p>
            </div>

            <div className="pt-2">
              <button
                disabled
                className="w-full py-4 px-6 rounded-2xl bg-neutral-200 text-neutral-400 font-semibold text-sm flex items-center justify-center gap-2 cursor-not-allowed"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Savatchaga qo&apos;shish</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LIVE POPULATED PDP VIEW
  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500">
        <Link href="/" className="hover:text-black">Bosh sahifa</Link>
        <ChevronRight className="w-3 h-3 text-neutral-300" />
        <Link href={`/products?category=${product.category}`} className="hover:text-black">
          {product.category === 'Phones' ? 'Smartfonlar' : product.category === 'Tablets' ? 'Planshetlar' : 'Aksessuarlar'}
        </Link>
        <ChevronRight className="w-3 h-3 text-neutral-300" />
        <span className="text-neutral-900 font-medium truncate max-w-xs">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-3xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-center p-8 overflow-hidden">
            {/* Promo Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
              <span className="px-3 py-1 rounded-full bg-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5">
                <span>🔥</span> AKSIYA / SALE
              </span>
              {product.category === 'Phones' && (
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-semibold text-xs shadow-md flex items-center gap-1.5">
                  <span>🎁</span> + Bepul Simsiz Naushnik Sovg&apos;aga!
                </span>
              )}
            </div>

            {currentImages.length > 0 ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentImages[selectedImageIndex] || currentImages[0]}
                alt={product.title}
                className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <div className="text-center p-8 text-neutral-400 text-sm">
                Ushbu variatsiya uchun rasm mavjud emas
              </div>
            )}
          </div>

          {currentImages.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {currentImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`aspect-square rounded-xl p-2 border transition-all overflow-hidden bg-neutral-50 ${
                    selectedImageIndex === idx
                      ? 'border-neutral-900 ring-2 ring-neutral-900/10'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`${product.title} ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Configurations */}
        <div className="space-y-8">
          <div>
            <span className="text-xs font-bold tracking-wider text-neutral-500 uppercase">
              {product.brand}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 mt-1">
              {product.title}
            </h1>
            <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Price Box */}
          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between">
            <div>
              <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold block">
                Rasmiy chakana narx
              </span>
              <div className="flex flex-col gap-1 mt-0.5">
                <span className="text-3xl font-extrabold text-neutral-950 font-mono">
                  {formatPrice(currentPrice, { showDual: true }).primary}
                </span>
                {formatPrice(currentPrice, { showDual: true }).secondary && (
                  <span className="text-sm font-semibold text-neutral-500 font-mono">
                    {formatPrice(currentPrice, { showDual: true }).secondary}
                  </span>
                )}
              </div>
            </div>

            <div>
              {product.stockTotal > 0 ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Omborda mavjud
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-200 text-neutral-700">
                  Buyurtma asosida
                </span>
              )}
            </div>
          </div>

          {/* Promotional Gift Earphones Banner */}
          {product.category === 'Phones' && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 via-amber-50 to-emerald-50 border border-amber-200/80 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white font-bold text-[10px] uppercase tracking-wider">
                  🔥 KATTA AKSIYA / SALE
                </span>
                <span className="text-xs font-bold text-neutral-900">
                  Har bir telefonga maxsus sovg&apos;a!
                </span>
              </div>
              <p className="text-xs text-neutral-700 leading-relaxed">
                🎁 <strong>Bonus reklama:</strong> Ushbu telefonni bugun xarid qilsangiz, qo&apos;shimcha <strong>Simsiz Bluetooth Naushnik (AirPods analog)</strong> mutlaqo <strong>BEPUL</strong> sovg&apos;a qilinadi!
              </p>
            </div>
          )}

          {/* Delivery Terms Alert */}
          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 leading-relaxed flex items-start gap-2.5">
            <span className="text-base shrink-0">🚚</span>
            <div>
              <span className="font-semibold text-neutral-950">Yetkazib berish xizmati:</span>
              <p className="text-[11px] text-neutral-600 mt-0.5">
                Tezkor kuryerlik faqat <strong>O&apos;zbekiston bo&apos;yicha</strong> mavjud. Chet el fuqarolariga — faqat do&apos;kondan o&apos;zi olib ketish (<strong>Samovivoz</strong>).
              </p>
            </div>
          </div>

          {/* Variant Selectors: Color */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block">
                Rangini tanlang: <span className="text-neutral-900 font-bold">{selectedVariant?.color}</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantId(v.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                      selectedVariantId === v.id
                        ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                        : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-neutral-300"
                      style={{ backgroundColor: v.colorHex || '#999' }}
                    />
                    <span>{v.color}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Variant Selectors: Storage */}
          {selectedVariant?.storage && selectedVariant.storage !== 'N/A' && (
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block">
                Ichki xotira hajmi
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {Array.from(new Set(product.variants.map((v) => v.storage))).map((storageOption) => {
                  const isCurrent = selectedVariant?.storage === storageOption;
                  return (
                    <button
                      key={storageOption}
                      type="button"
                      onClick={() => {
                        const matching = product.variants.find((v) => v.storage === storageOption);
                        if (matching) setSelectedVariantId(matching.id);
                      }}
                      className={`py-3 px-2 rounded-xl border text-center text-xs font-semibold transition-all ${
                        isCurrent
                          ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                          : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-300'
                      }`}
                    >
                      {storageOption}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add to Cart Actions */}
          <div className="pt-4 flex items-center gap-3">
            <div className="flex items-center border border-neutral-300 rounded-2xl p-1 bg-neutral-50 shrink-0">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-xl hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors cursor-pointer"
                aria-label="Kamaytirish"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center text-sm font-bold text-neutral-900 font-mono">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 rounded-xl hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors cursor-pointer"
                aria-label="Ko'paytirish"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`flex-1 py-4 px-6 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer ${
                addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-neutral-950 hover:bg-neutral-800 text-white'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Savatchaga qo&apos;shildi!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Savatchaga qo&apos;shish</span>
                </>
              )}
            </button>
          </div>

          {/* Retail Trust Highlights */}
          <div className="pt-6 border-t border-neutral-200 grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <ShieldCheck className="w-5 h-5 mx-auto text-neutral-700" />
              <p className="text-[11px] font-semibold text-neutral-900">Rasmiy kafolat</p>
              <p className="text-[10px] text-neutral-500">12 oy kafolat</p>
            </div>
            <div className="space-y-1">
              <Truck className="w-5 h-5 mx-auto text-neutral-700" />
              <p className="text-[11px] font-semibold text-neutral-900">Tezkor yetkazib berish</p>
              <p className="text-[10px] text-neutral-500">Faqat O&apos;zb (chet elga: samovivoz)</p>
            </div>
            <div className="space-y-1">
              <RotateCcw className="w-5 h-5 mx-auto text-neutral-700" />
              <p className="text-[11px] font-semibold text-neutral-900">Almashtirish</p>
              <p className="text-[10px] text-neutral-500">14 kun tekshiruv</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
