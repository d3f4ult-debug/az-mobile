import React from 'react';
import { Building2, Server, CheckCircle2, AlertTriangle } from 'lucide-react';
import { fetchDatabaseHealth } from '@/lib/api/admin';
import { CurrencySettingsCard } from '@/components/admin/CurrencySettingsCard';

export default async function AdminSettingsPage() {
  const dbHealth = await fetchDatabaseHealth();

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="pb-6 border-b border-neutral-800">
        <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
          Tizim konfiguratsiyasi
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
          Sozlamalar va Yuridik Ma&apos;lumotlar
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
          Valyuta kursi, yuridik shaxs rekvizitlari va Neon PostgreSQL bazasi holati.
        </p>
      </div>

      {/* Currency & Exchange Rate Setting Block */}
      <CurrencySettingsCard />

      {/* Database Connection Status Block */}
      <div className="p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80">
          <div className="flex items-center gap-2.5">
            <Server className="w-4 h-4 text-blue-400" />
            <h2 className="text-base font-semibold text-white">
              Neon PostgreSQL Ma&apos;lumotlar Bazasi
            </h2>
          </div>

          {dbHealth.connected ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Neon Baza Ulangan</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Mahalliy xotira (Standby)</span>
            </span>
          )}
        </div>

        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
              <span className="text-neutral-400 font-medium">Baza turi:</span>
              <p className="text-white font-mono text-sm">{dbHealth.type}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
              <span className="text-neutral-400 font-medium">Ulanish holati:</span>
              <p className="text-emerald-400 font-medium text-sm">
                {dbHealth.connected ? 'Faol va so\'rovlarni qabul qilmoqda' : 'DATABASE_URL kutilmoqda (ichki xotirada ishlayapti)'}
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-neutral-400 font-medium block">
              DATABASE_URL (Neon PostgreSQL Ulanish Linki)
            </label>
            <input
              type="text"
              readOnly
              value={process.env.DATABASE_URL ? 'postgresql://neondb_owner:***@ep-***.neon.tech/neondb' : 'Ko\'rsatilmagan'}
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-xs focus:outline-none"
            />
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Neon PostgreSQL bazangizni ulash uchun loyiha ildizidagi <code className="text-neutral-300 font-mono">.env.local</code> fayliga <code className="text-neutral-300 font-mono">DATABASE_URL=&quot;postgresql://...&quot;</code> qatorini yozing. Tizim jadvallarni avtomatik yaratadi.
            </p>
          </div>
        </div>
      </div>

      {/* Official Legal Entity Block */}
      <div className="p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-5">
        <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-800/80">
          <Building2 className="w-4 h-4 text-emerald-400" />
          <h2 className="text-base font-semibold text-white">
            Rasmiy Yuridik Shaxs Ma&apos;lumotlari
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 uppercase tracking-wider text-[10px]">Tashkilot Nomi</span>
            <p className="text-sm font-semibold text-white font-sans">
              &quot;AZ MOBILE&quot; mas&apos;uliyati cheklangan jamiyati (LLC)
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 uppercase tracking-wider text-[10px]">STIR (TIN)</span>
            <p className="text-sm font-semibold text-white font-mono">313 323 610</p>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 uppercase tracking-wider text-[10px]">Direktor</span>
            <p className="text-sm font-semibold text-white font-sans">Ergashev Azizbek Anvarovich</p>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 uppercase tracking-wider text-[10px]">Davlat Ro&apos;yxat Raqami</span>
            <p className="text-sm font-semibold text-white font-mono">№3343366</p>
          </div>

          <div className="md:col-span-2 p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 uppercase tracking-wider text-[10px]">Yuridik Manzil</span>
            <p className="text-sm font-medium text-neutral-300 font-sans">
              171 Shahrikhon shoh Street, Yangihayot MFY, Shahrikhon, Shahrikhon district, Andijan region, Uzbekistan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
