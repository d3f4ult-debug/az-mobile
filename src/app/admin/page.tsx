import React from 'react';
import Link from 'next/link';
import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  Plus,
  ArrowUpRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import { fetchProducts } from '@/lib/api/products';
import { fetchOrders, fetchCustomers } from '@/lib/api/admin';
import { EmptyState } from '@/components/ui/EmptyState';
import { SeedButton } from '@/components/admin/SeedButton';

export default async function AdminDashboardPage() {
  const [productsData, orders, customers] = await Promise.all([
    fetchProducts(),
    fetchOrders(),
    fetchCustomers(),
  ]);

  const totalCalculatedRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const kpis = [
    {
      title: 'Umumiy tushum',
      value: `${totalCalculatedRevenue.toLocaleString()} so'm`,
      change: '+0.0%',
      trend: 'Real vaqtda',
      icon: DollarSign,
      color: 'text-emerald-400',
    },
    {
      title: 'Faol buyurtmalar',
      value: `${orders.length} ta`,
      change: '0 ta yetkazilmoqda',
      trend: 'Yangi buyurtmalar',
      icon: ShoppingCart,
      color: 'text-blue-400',
    },
    {
      title: 'Katalogdagi tovarlar',
      value: `${productsData.total} ta model`,
      change: `${productsData.data.reduce((sum, p) => sum + p.stockTotal, 0)} dona omborda`,
      trend: 'Neon Baza',
      icon: Package,
      color: 'text-purple-400',
    },
    {
      title: 'Jami mijozlar',
      value: `${customers.length} nafar`,
      change: 'Doimiy xaridorlar',
      trend: 'Ro\'yxatdan o\'tgan',
      icon: Users,
      color: 'text-amber-400',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            AZ Mobile Boshqaruv Markazi
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Do&apos;kon ko&apos;rsatkichlari
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
            Real vaqt rejimidagi savdo tahlili va Neon PostgreSQL ma&apos;lumotlar bazasi.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <SeedButton />
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-neutral-800 text-neutral-200 hover:text-white transition-colors"
          >
            <span>Do&apos;konga o&apos;tish</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-white text-black hover:bg-neutral-200 transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Yangi mahsulot</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.title}
              className="p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800 shadow-md flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-400">
                  {kpi.title}
                </span>
                <div className={`p-2 rounded-xl bg-neutral-900 ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xl font-bold tracking-tight text-white font-mono truncate">
                  {kpi.value}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-1">
                  <span className="text-neutral-300 font-medium">{kpi.change}</span>
                  <span>•</span>
                  <span>{kpi.trend}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* System Status Banner */}
      <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-start sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <p className="font-semibold text-white">
              Neon PostgreSQL Serverless Baza Faol
            </p>
            <p className="text-neutral-400 mt-0.5">
              Barcha mahsulotlar, buyurtmalar va mijozlar to&apos;liq ma&apos;lumotlar bazasiga saqlanadi va dinamik boshqariladi.
            </p>
          </div>
        </div>

        <Link
          href="/admin/settings"
          className="text-xs text-neutral-400 hover:text-white underline shrink-0"
        >
          Baza sozlamalari
        </Link>
      </div>

      {/* Recent Orders Section */}
      <div className="p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-neutral-400" />
            <h2 className="text-base font-semibold text-white">So&apos;nggi buyurtmalar</h2>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs text-neutral-400 hover:text-white transition-colors"
          >
            Barchasini ko&apos;rish
          </Link>
        </div>

        {orders.length === 0 ? (
          <EmptyState
            type="orders"
            title="Hali buyurtmalar mavjud emas"
            description="Mijozlar savatcha orqali xarid qilganda, buyurtmalar bu yerda real vaqtda ko'rsatiladi."
            actionText="Do'konga o'tish"
            actionHref="/"
            className="border-neutral-800/80 bg-neutral-900/40 text-neutral-300"
          />
        ) : (
          <div className="divide-y divide-neutral-800">
            {/* Orders list */}
          </div>
        )}
      </div>
    </div>
  );
}
