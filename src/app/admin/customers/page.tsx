import React from 'react';
import { fetchCustomers } from '@/lib/api/admin';
import { EmptyState } from '@/components/ui/EmptyState';
import { Search } from 'lucide-react';

export default async function AdminCustomersPage() {
  const customers = await fetchCustomers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            Mijozlar bazasi
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Mijozlar profili
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
            Ro&apos;yxatdan o&apos;tgan xaridorlar, telefon raqamlari va jami xarid summalari.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Mijoz ismi, telefon yoki email..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-800 focus:border-neutral-600 focus:outline-none text-white placeholder:text-neutral-500"
          />
        </div>
        <span className="text-xs text-neutral-400">
          Jami mijozlar: <strong className="text-white font-mono">{customers.length} nafar</strong>
        </span>
      </div>

      {customers.length === 0 ? (
        <EmptyState
          type="customers"
          title="Mijozlar mavjud emas"
          description="Foydalanuvchilar do'konda xarid qilgach, ularning profillari avtomatik shakllanadi."
          actionText="Bosh sahifaga qaytish"
          actionHref="/admin"
          className="border-neutral-800 bg-neutral-950/60 my-6"
        />
      ) : (
        <div className="rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-950/60">
          {/* Customers list */}
        </div>
      )}
    </div>
  );
}
