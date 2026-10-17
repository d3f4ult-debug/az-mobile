'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  ArrowUpRight,
  Menu,
  X,
  Bell,
  ShieldCheck,
  Search,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Boshqaruv paneli', href: '/admin', icon: LayoutDashboard },
    { name: 'Mahsulotlar', href: '/admin/products', icon: Package },
    { name: 'Buyurtmalar', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Mijozlar', href: '/admin/customers', icon: Users },
    { name: 'Sozlamalar', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col md:flex-row">
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-neutral-950 border-b border-neutral-800">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
            aria-label="Admin menyusi"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-white text-black font-bold text-xs flex items-center justify-center">
              AZ
            </span>
            <span className="text-sm font-bold text-white tracking-tight">AZ Mobile Admin</span>
          </div>
        </div>

        <Link
          href="/"
          className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
        >
          <span>Do&apos;kon</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Admin Sidebar Navigation */}
      <aside
        className={`${
          isMobileSidebarOpen ? 'block' : 'hidden'
        } md:flex flex-col w-full md:w-64 bg-neutral-950 border-r border-neutral-800 shrink-0 md:min-h-screen z-30`}
      >
        {/* Brand Banner */}
        <div className="p-6 border-b border-neutral-800/80 hidden md:flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white text-black font-bold text-xs flex items-center justify-center shadow-xs">
              AZ
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-white block">
                AZ MOBILE
              </span>
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
                Boshqaruv Markazi
              </span>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500" title="Tizim faol" />
        </div>

        {/* Sidebar Nav Items */}
        <div className="flex-1 py-6 px-3 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            Bo&apos;limlar
          </div>
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-neutral-800 text-white shadow-xs font-semibold'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Legal Entity & User Badge */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950/60">
          <div className="rounded-xl bg-neutral-900/80 p-3 border border-neutral-800">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[11px] font-semibold text-neutral-200 truncate">
                AZ MOBILE MChJ
              </span>
            </div>
            <p className="text-[10px] text-neutral-400">STIR: 313 323 610</p>
            <p className="text-[10px] text-neutral-400 truncate">Rahbar: Ergashev A. A.</p>
          </div>

          <div className="mt-3 flex items-center justify-between pt-2 border-t border-neutral-800/60 text-xs">
            <Link
              href="/"
              target="_blank"
              className="text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>Do&apos;konni ko&apos;rish</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[10px] font-mono text-neutral-400">v1.2-neon</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-neutral-900 min-h-screen">
        {/* Top Bar for Desktop */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-neutral-950/80 border-b border-neutral-800 backdrop-blur-md">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Buyurtmalar, SKU, ombor qoldiqlari..."
                className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-700 focus:outline-none focus:border-neutral-500 text-neutral-200 placeholder:text-neutral-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Neon Postgres Baza: Ulangan</span>
            </div>

            <button
              className="p-2 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 cursor-pointer"
              aria-label="Bildirishnomalar"
            >
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Admin Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
