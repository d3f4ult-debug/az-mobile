'use client';

import React, { useState } from 'react';
import { DollarSign, RefreshCw, Check, Sparkles } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

export function CurrencySettingsCard() {
  const { exchangeRate, setExchangeRate, currency, setCurrency } = useCurrency();
  const [rateInput, setRateInput] = useState(exchangeRate.toString());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(rateInput.replace(/\s+/g, ''));
    if (!isNaN(num) && num > 1000) {
      setExchangeRate(num);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  const handleReset = () => {
    setExchangeRate(12850);
    setRateInput('12850');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-5">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80">
        <div className="flex items-center gap-2.5">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <h2 className="text-base font-semibold text-white">
            Valyuta va Dollar Kursi Sozlamalari
          </h2>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real vaqt hisoblash</span>
        </span>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300 block">
              1 AQSH Dollari ($ USD) kursi (so&apos;mda)
            </label>
            <div className="relative">
              <input
                type="number"
                min="5000"
                max="50000"
                step="50"
                value={rateInput}
                onChange={(e) => setRateInput(e.target.value)}
                placeholder="12850"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono text-sm focus:border-white focus:outline-none transition-colors"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-mono">
                UZS / 1 USD
              </span>
            </div>
            <p className="text-[11px] text-neutral-500">
              Ushbu kurs barcha mahsulotlar uchun dollardagi narxlarni hisoblashda qo&apos;llaniladi.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300 block">
              Asosiy ko&apos;rsatish valyutasi
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCurrency('UZS')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  currency === 'UZS'
                    ? 'bg-white text-black border-white shadow-sm'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                SO&apos;M (UZS)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  currency === 'USD'
                    ? 'bg-white text-black border-white shadow-sm'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                AQSH DOLLARI ($)
              </button>
            </div>
            <p className="text-[11px] text-neutral-500">
              Foydalanuvchilar yuqori paneldan valyutani istalgan vaqt o&apos;zgartirishi mumkin.
            </p>
          </div>
        </div>

        {/* Live Calculation Preview */}
        <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="text-neutral-400 text-[11px]">Misol namuna (S26 Ultra - 13 349 000 so&apos;m):</span>
            <div className="text-sm font-semibold text-white">
              {Number(rateInput) > 0 ? (
                <>
                  13 349 000 so&apos;m <span className="text-neutral-400 font-normal">≈</span> ${Math.round(13349000 / Number(rateInput)).toLocaleString()}
                </>
              ) : (
                'Kurs kiritilmadi'
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2 rounded-xl border border-neutral-800 hover:bg-neutral-800 text-neutral-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Standart (12 850)</span>
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Saqlandi!</span>
                </>
              ) : (
                <span>Kursni Saqlash</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
