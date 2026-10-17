'use client';

import React, { useState, useTransition, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { SlidersHorizontal, RotateCcw, X, Check } from 'lucide-react';

const FILTER_OPTIONS = {
  brands: ['Apple', 'Samsung', 'Xiaomi', 'Honor', 'Bushnell', 'Apexel', 'Infinix', 'Google Pixel', 'OnePlus'],
  rams: ['6GB', '8GB', '12GB', '16GB'],
  storages: ['128GB', '256GB', '512GB', '1TB'],
};

interface ProductFilterSidebarProps {
  isMobileModal?: boolean;
  onCloseMobile?: () => void;
}

export function ProductFilterSidebar({
  isMobileModal = false,
  onCloseMobile,
}: ProductFilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Read current filters from URL search params
  const currentBrands = searchParams.get('brands')?.split(',').filter(Boolean) || [];
  const currentRams = searchParams.get('rams')?.split(',').filter(Boolean) || [];
  const currentStorages = searchParams.get('storages')?.split(',').filter(Boolean) || [];
  const currentMaxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 25000000;

  // Local price slider state for smooth UI interaction without triggering cascading renders
  const [userPrice, setUserPrice] = useState<number | null>(null);
  const activeSliderPrice = userPrice ?? currentMaxPrice;

  const updateParam = useCallback(
    (key: string, values: string[] | number | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (Array.isArray(values)) {
        if (values.length > 0) {
          params.set(key, values.join(','));
        } else {
          params.delete(key);
        }
      } else if (typeof values === 'number') {
        params.set(key, values.toString());
      } else if (values === null) {
        params.delete(key);
      }

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [pathname, router, searchParams]
  );

  const toggleArrayItem = (key: 'brands' | 'rams' | 'storages', item: string) => {
    const list =
      key === 'brands'
        ? [...currentBrands]
        : key === 'rams'
        ? [...currentRams]
        : [...currentStorages];

    const index = list.indexOf(item);
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(item);
    }
    updateParam(key, list);
  };

  const handlePriceCommit = () => {
    if (userPrice !== null) {
      updateParam('maxPrice', userPrice);
      setUserPrice(null);
    }
  };

  const handleResetFilters = () => {
    const params = new URLSearchParams();
    const category = searchParams.get('category');
    const query = searchParams.get('query');
    if (category) params.set('category', category);
    if (query) params.set('query', query);

    setUserPrice(null);
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const activeFiltersCount =
    currentBrands.length +
    currentRams.length +
    currentStorages.length +
    (currentMaxPrice < 25000000 ? 1 : 0);

  return (
    <div className={`space-y-6 ${isMobileModal ? 'p-6' : ''}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-neutral-900" />
          <h3 className="text-base font-semibold tracking-tight text-neutral-900">
            Filtrlar
          </h3>
          {activeFiltersCount > 0 && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-neutral-900 text-white">
              {activeFiltersCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-medium text-neutral-500 hover:text-black flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Tozalash</span>
            </button>
          )}

          {isMobileModal && onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-neutral-400 hover:text-black"
              aria-label="Filtrlarni yopish"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Price Slider */}
      <div className="space-y-3 pb-5 border-b border-neutral-100">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-neutral-900">Maksimal narx</span>
          <span className="font-semibold text-neutral-900 font-mono text-xs">
            {activeSliderPrice.toLocaleString()} so&apos;m
          </span>
        </div>
        <input
          type="range"
          min="1000000"
          max="25000000"
          step="500000"
          value={activeSliderPrice}
          onChange={(e) => setUserPrice(Number(e.target.value))}
          onMouseUp={handlePriceCommit}
          onTouchEnd={handlePriceCommit}
          className="w-full accent-neutral-900 cursor-pointer h-1.5 bg-neutral-200 rounded-lg"
          aria-label="Narx oralig'i filtri"
        />
        <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
          <span>1 mln so&apos;m</span>
          <span>25 mln+ so&apos;m</span>
        </div>
      </div>

      {/* Brand Checkboxes */}
      <div className="space-y-3 pb-5 border-b border-neutral-100">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">
          Brend
        </span>
        <div className="space-y-2">
          {FILTER_OPTIONS.brands.map((brand) => {
            const isChecked = currentBrands.includes(brand);
            return (
              <label
                key={brand}
                className="flex items-center gap-3 text-sm text-neutral-700 hover:text-black cursor-pointer group select-none"
              >
                <div
                  onClick={() => toggleArrayItem('brands', brand)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-neutral-900 border-neutral-900 text-white'
                      : 'border-neutral-300 group-hover:border-neutral-500 bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span
                  onClick={() => toggleArrayItem('brands', brand)}
                  className="flex-1 font-normal text-sm"
                >
                  {brand}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* RAM Checkboxes */}
      <div className="space-y-3 pb-5 border-b border-neutral-100">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">
          Tezkor xotira (RAM)
        </span>
        <div className="grid grid-cols-2 gap-2">
          {FILTER_OPTIONS.rams.map((ram) => {
            const isChecked = currentRams.includes(ram);
            return (
              <button
                key={ram}
                type="button"
                onClick={() => toggleArrayItem('rams', ram)}
                className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all text-center ${
                  isChecked
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                }`}
              >
                {ram}
              </button>
            );
          })}
        </div>
      </div>

      {/* Storage Checkboxes */}
      <div className="space-y-3 pb-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">
          Ichki doimiy xotira
        </span>
        <div className="grid grid-cols-2 gap-2">
          {FILTER_OPTIONS.storages.map((storage) => {
            const isChecked = currentStorages.includes(storage);
            return (
              <button
                key={storage}
                type="button"
                onClick={() => toggleArrayItem('storages', storage)}
                className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all text-center ${
                  isChecked
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                }`}
              >
                {storage}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pending transition indicator */}
      {isPending && (
        <div className="text-center">
          <span className="text-xs text-neutral-400 animate-pulse">
            Filtrlar qo&apos;llanilmoqda...
          </span>
        </div>
      )}
    </div>
  );
}
