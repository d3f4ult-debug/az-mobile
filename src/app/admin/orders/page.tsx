import React from 'react';
import { fetchOrders } from '@/lib/api/admin';
import { EmptyState } from '@/components/ui/EmptyState';
import { Search } from 'lucide-react';

export default async function AdminOrdersPage() {
  const orders = await fetchOrders();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            Buyurtmalar markazi
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Buyurtmalar va jo&apos;natmalar
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
            Xaridorlar to&apos;lovlari, yetkazib berish holatlari va hisob-fakturalar.
          </p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Buyurtma raqami, mijoz yoki telefon..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-800 focus:border-neutral-600 focus:outline-none text-white placeholder:text-neutral-500"
          />
        </div>
        <span className="text-xs text-neutral-400">
          Jami buyurtmalar: <strong className="text-white font-mono">{orders.length} ta</strong>
        </span>
      </div>

      {orders.length === 0 ? (
        <EmptyState
          type="orders"
          title="Buyurtmalar mavjud emas"
          description="Do'kon orqali mijozlar buyurtma berganda, to'lov va manzil ma'lumotlari bu yerda ko'rinadi."
          actionText="Do'konga o'tish"
          actionHref="/"
          className="border-neutral-800 bg-neutral-950/60 my-6"
        />
      ) : (
        <div className="rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-950/60">
          {/* Orders list */}
        </div>
      )}
    </div>
  );
}
