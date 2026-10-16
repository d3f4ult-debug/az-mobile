'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { EmptyState } from '@/components/ui/EmptyState';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, itemCount, subtotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden transition-all duration-300">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        className="fixed inset-y-0 right-0 max-w-full flex w-full sm:max-w-md bg-white shadow-2xl flex-col z-10 animate-in slide-in-from-right duration-300"
        aria-label="Xarid savatchasi"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-neutral-900" />
            <h2 className="text-lg font-semibold tracking-tight text-neutral-900">
              Xarid savatchasi
            </h2>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
              {itemCount} ta
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Savatchani yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <EmptyState
                type="cart"
                title="Savatchangiz bo'sh"
                description="Do'konimizdagi flagman smartfonlar, planshetlar va original aksessuarlarni kashf eting."
                actionText="Xaridni boshlash"
                onAction={closeCart}
                className="border-none bg-transparent p-0"
              />
            </div>
          ) : (
            <div className="divide-y divide-neutral-100 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  <div className="w-20 h-20 bg-neutral-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center text-xs text-neutral-400 border border-neutral-200/60">
                    {item.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-contain p-2" />
                    ) : (
                      <span>Rasm yo&apos;q</span>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-semibold text-neutral-900 leading-snug">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                          aria-label={`${item.title} mahsulotini o'chirish`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {[item.color, item.storage].filter(Boolean).join(' • ')}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-neutral-200 text-neutral-600 transition-colors"
                          aria-label="Kamaytirish"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-neutral-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-neutral-200 text-neutral-600 transition-colors"
                          aria-label="Ko'paytirish"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-neutral-900">
                        {(item.price * item.quantity).toLocaleString()} so&apos;m
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-100 px-6 py-5 bg-neutral-50/70 space-y-4">
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-neutral-600">
              <span>Oraliq jami</span>
              <span className="font-semibold text-neutral-900">{subtotal.toLocaleString()} so&apos;m</span>
            </div>
            <div className="flex justify-between text-xs text-neutral-400">
              <span>Yetkazib berish</span>
              <span>Kuryer orqali bepul</span>
            </div>
          </div>

          <button
            disabled={items.length === 0}
            className={`w-full py-3.5 px-6 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-xs ${
              items.length === 0
                ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                : 'bg-neutral-900 hover:bg-neutral-800 text-white active:scale-[0.99] cursor-pointer'
            }`}
          >
            <span>Buyurtmani rasmiylashtirish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </div>
  );
}
