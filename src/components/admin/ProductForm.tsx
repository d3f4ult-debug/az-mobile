'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  Sparkles,
  Layers,
  Check,
  Loader2,
  Image as ImageIcon,
} from 'lucide-react';

interface VariantFormItem {
  id: string;
  color: string;
  colorHex: string;
  storage: string;
  ram: string;
  price: string;
  sku: string;
  stock: string;
}

export function ProductForm() {
  const router = useRouter();

  // Primary product fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [brand, setBrand] = useState('Apple');
  const [category, setCategory] = useState<'Phones' | 'Tablets' | 'Accessories'>('Phones');
  const [status, setStatus] = useState<'active' | 'draft'>('active');
  const [imageUrl, setImageUrl] = useState('/images/products/apple-iphone-17-pro-back.svg');

  // Dynamic field array for variants (Color/Storage combinations)
  const [variants, setVariants] = useState<VariantFormItem[]>([
    {
      id: 'var-1',
      color: 'Titanium Black',
      colorHex: '#1f2022',
      storage: '256GB',
      ram: '12GB',
      price: '',
      sku: 'AZ-SKU-001',
      stock: '25',
    },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Add new variant to dynamic field array
  const handleAddVariant = () => {
    const nextIndex = variants.length + 1;
    const newVariant: VariantFormItem = {
      id: `var-${Date.now()}-${nextIndex}`,
      color: 'Silver Frost',
      colorHex: '#e5e7eb',
      storage: '512GB',
      ram: '12GB',
      price: basePrice || '14000000',
      sku: `AZ-SKU-${String(nextIndex).padStart(3, '0')}`,
      stock: '10',
    };
    setVariants([...variants, newVariant]);
  };

  // Remove variant from dynamic field array
  const handleRemoveVariant = (id: string) => {
    if (variants.length === 1) {
      alert('Kamida bitta variatsiya konfiguratsiyasi bo\'lishi shart.');
      return;
    }
    setVariants(variants.filter((v) => v.id !== id));
  };

  // Update specific variant field
  const handleUpdateVariant = (id: string, field: keyof VariantFormItem, value: string) => {
    setVariants(
      variants.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      title,
      description,
      basePrice: Number(basePrice),
      brand,
      category,
      status,
      images: imageUrl ? [imageUrl] : [],
      variants: variants.map((v) => ({
        color: v.color,
        colorHex: v.colorHex,
        storage: v.storage,
        ram: v.ram,
        price: Number(v.price || basePrice),
        sku: v.sku,
        stock: Number(v.stock || 0),
      })),
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Xatolik yuz berdi');

      setFeedback('Mahsulot muvaffaqiyatli Neon PostgreSQL bazasiga saqlandi!');
      setTimeout(() => {
        router.push('/admin/products');
        router.refresh();
      }, 1000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Saqlashda xatolik yuz berdi';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalCalculatedStock = variants.reduce(
    (sum, v) => sum + (Number(v.stock) || 0),
    0
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div className="space-y-1">
          <Link
            href="/admin/products"
            className="text-xs font-semibold text-neutral-400 hover:text-white inline-flex items-center gap-1.5 transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Mahsulotlar ro&apos;yxatiga qaytish</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Yangi mahsulot qo&apos;shish
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            Qurilma parametrlari, chakana narxi va rang/xotira variatsiyalarini kiritish.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
          >
            Bekor qilish
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 text-xs font-semibold rounded-xl bg-white text-black hover:bg-neutral-200 active:scale-95 transition-all inline-flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{isSubmitting ? 'Saqlanmoqda...' : 'Bazada saqlash'}</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-3">
          <Check className="w-4 h-4 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-center gap-3">
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Primary Details Card */}
      <div className="p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-neutral-800/80">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <h2 className="text-base font-semibold text-white">Asosiy ma&apos;lumotlar</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">
              Mahsulot to&apos;liq nomi <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Masalan: Samsung Galaxy S25 Ultra 5G yoki iPhone 16 Pro Max"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-neutral-600 focus:outline-none text-white text-sm placeholder:text-neutral-600"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">
              Batafsil tavsifi
            </label>
            <textarea
              rows={4}
              placeholder="Displey turi, protsessor, kameralar imkoniyati, akkumulyator va kafolat tafsilotlari..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-neutral-600 focus:outline-none text-white text-sm placeholder:text-neutral-600"
            />
          </div>

          {/* Base Price */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">
              Asosiy narx (so&apos;mda) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              required
              min="0"
              step="10000"
              placeholder="15000000"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-neutral-600 focus:outline-none text-white text-sm font-mono placeholder:text-neutral-600"
            />
          </div>

          {/* Brand */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">
              Ishlab chiqaruvchi brend
            </label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-neutral-600 focus:outline-none text-white text-sm cursor-pointer"
            >
              <option value="Apple">Apple</option>
              <option value="Samsung">Samsung</option>
              <option value="Xiaomi">Xiaomi</option>
              <option value="Google Pixel">Google Pixel</option>
              <option value="OnePlus">OnePlus</option>
            </select>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">
              Mahsulot bo&apos;limi
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as 'Phones' | 'Tablets' | 'Accessories')}
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-neutral-600 focus:outline-none text-white text-sm cursor-pointer"
            >
              <option value="Phones">Smartfonlar</option>
              <option value="Tablets">Planshetlar</option>
              <option value="Accessories">Aksessuarlar</option>
            </select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">
              Katalogdagi holati
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'active' | 'draft')}
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-neutral-600 focus:outline-none text-white text-sm cursor-pointer"
            >
              <option value="active">Faol (Do&apos;konda ko&apos;rinadi)</option>
              <option value="draft">Qoralama (Faqat admin ko&apos;radi)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Image & Back-side Visual Selection Card */}
      <div className="p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-emerald-400" />
            <h2 className="text-base font-semibold text-white">Mahsulot Rasmi (Faqat orqa tomon / Back side)</h2>
          </div>
          <span className="text-xs text-neutral-400 font-medium">
            Vector SVG & URL qo&apos;llab-quvvatlanadi
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">
                Rasm yo&apos;li yoki Web havola (URL)
              </label>
              <input
                type="text"
                placeholder="/images/products/apple-iphone-17-pro-back.svg yoki https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-neutral-600 focus:outline-none text-white text-xs font-mono placeholder:text-neutral-600"
              />
              <p className="text-[11px] text-neutral-500">
                O&apos;zingiz rasm qo&apos;shish uchun <code className="text-neutral-300">public/images/products/</code> jildiga rasm tashlab, uning yo&apos;lini yozing yoki to&apos;g&apos;ridan-to&apos;g&apos;ri internetdagi rasm havolasini kiriting.
              </p>
            </div>

            {/* Quick Presets for Back-side phone designs */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 block">
                Tayyor Orqa Tomon (Back-side) dizaynlar:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'iPhone 17 Pro', path: '/images/products/apple-iphone-17-pro-back.svg' },
                  { label: 'iPhone 17', path: '/images/products/apple-iphone-17-back.svg' },
                  { label: 'Galaxy S26 Ultra', path: '/images/products/samsung-galaxy-s26-ultra-back.svg' },
                  { label: 'Galaxy A-seriya', path: '/images/products/samsung-galaxy-a57-back.svg' },
                  { label: 'Xiaomi 17 Ultra', path: '/images/products/xiaomi-17-ultra-back.svg' },
                  { label: 'POCO X8 Pro', path: '/images/products/poco-x8-pro-back.svg' },
                  { label: 'Redmi Note 15', path: '/images/products/xiaomi-redmi-note-15-back.svg' },
                  { label: 'Honor X9d', path: '/images/products/honor-x9d-back.svg' },
                  { label: 'iPad Pro 13', path: '/images/products/apple-ipad-pro-13-back.svg' },
                  { label: 'Watch Ultra 3', path: '/images/products/apple-watch-ultra-3-back.svg' },
                ].map((preset) => (
                  <button
                    key={preset.path}
                    type="button"
                    onClick={() => setImageUrl(preset.path)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      imageUrl === preset.path
                        ? 'bg-white text-black border-white shadow-xs font-semibold'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 aspect-3/4">
            <span className="text-[11px] text-neutral-500 mb-2 font-mono uppercase tracking-wider">
              Jonli ko&apos;rinish
            </span>
            <div className="relative w-36 h-48 flex items-center justify-center">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt="Ko'rinish"
                  className="max-h-full max-w-full object-contain filter drop-shadow-md"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="text-center text-xs text-neutral-600">
                  Rasm tanlanmagan
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Field Array for Variations */}
      <div className="p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-800/80">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <div>
              <h2 className="text-base font-semibold text-white">
                Mahsulot variatsiyalari (Rang & Xotira matritsasi)
              </h2>
              <p className="text-xs text-neutral-400">
                {variants.length} ta variatsiya kiritildi • Jami qoldiq: {totalCalculatedStock} dona
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddVariant}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Variatsiya qo&apos;shish</span>
          </button>
        </div>

        {/* Dynamic Variant Rows */}
        <div className="space-y-4">
          {variants.map((v, index) => (
            <div
              key={v.id}
              className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800/80 space-y-4 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-neutral-400">
                  Variatsiya #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveVariant(v.id)}
                  className="text-neutral-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                  title="Variatsiyani o'chirish"
                  aria-label={`Variatsiya ${index + 1} ni o'chirish`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {/* Color Name */}
                <div className="space-y-1">
                  <label className="text-[11px] text-neutral-400 font-medium">Rang nomi</label>
                  <input
                    type="text"
                    value={v.color}
                    onChange={(e) => handleUpdateVariant(v.id, 'color', e.target.value)}
                    placeholder="Masalan: Space Black"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none"
                  />
                </div>

                {/* Color Hex */}
                <div className="space-y-1">
                  <label className="text-[11px] text-neutral-400 font-medium">Rang kodi (Hex)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={v.colorHex}
                      onChange={(e) => handleUpdateVariant(v.id, 'colorHex', e.target.value)}
                      className="w-8 h-7 rounded border border-neutral-700 bg-transparent cursor-pointer p-0"
                    />
                    <input
                      type="text"
                      value={v.colorHex}
                      onChange={(e) => handleUpdateVariant(v.id, 'colorHex', e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Storage */}
                <div className="space-y-1">
                  <label className="text-[11px] text-neutral-400 font-medium">Ichki xotira</label>
                  <select
                    value={v.storage}
                    onChange={(e) => handleUpdateVariant(v.id, 'storage', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs"
                  >
                    <option value="128GB">128GB</option>
                    <option value="256GB">256GB</option>
                    <option value="512GB">512GB</option>
                    <option value="1TB">1TB</option>
                    <option value="N/A">Aksessuar (Mavjud emas)</option>
                  </select>
                </div>

                {/* RAM */}
                <div className="space-y-1">
                  <label className="text-[11px] text-neutral-400 font-medium">RAM</label>
                  <select
                    value={v.ram}
                    onChange={(e) => handleUpdateVariant(v.id, 'ram', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs"
                  >
                    <option value="6GB">6GB</option>
                    <option value="8GB">8GB</option>
                    <option value="12GB">12GB</option>
                    <option value="16GB">16GB</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <label className="text-[11px] text-neutral-400 font-medium">Narxi (so&apos;mda)</label>
                  <input
                    type="number"
                    value={v.price || basePrice}
                    onChange={(e) => handleUpdateVariant(v.id, 'price', e.target.value)}
                    placeholder={basePrice || '15000000'}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs font-mono"
                  />
                </div>

                {/* Stock Level */}
                <div className="space-y-1">
                  <label className="text-[11px] text-neutral-400 font-medium">Qoldiq (dona)</label>
                  <input
                    type="number"
                    min="0"
                    value={v.stock}
                    onChange={(e) => handleUpdateVariant(v.id, 'stock', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
