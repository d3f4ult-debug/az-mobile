'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  Smartphone,
  Tablet,
  Headphones,
  SlidersHorizontal,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

export function Navbar() {
  const router = useRouter();
  const { openCart, itemCount } = useCart();
  const { currency, setCurrency, exchangeRate } = useCurrency();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpandedMobile, setIsSearchExpandedMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activeCurrency = isMounted ? currency : 'UZS';
  const activeItemCount = isMounted ? itemCount : 0;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?query=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
      setIsSearchExpandedMobile(false);
    }
  };

  const navLinks = [
    { label: 'Smartfonlar', href: '/products?category=Phones', icon: Smartphone },
    { label: 'Planshetlar', href: '/products?category=Tablets', icon: Tablet },
    { label: 'Aksessuarlar', href: '/products?category=Accessories', icon: Headphones },
    { label: 'Barcha qurilmalar', href: '/products', icon: SlidersHorizontal },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 bg-white/90 backdrop-blur-md transition-all">
      {/* Top Announcement: Delivery terms & Phone Gift Promo */}
      <div className="bg-neutral-950 text-neutral-200 py-1.5 px-4 text-center text-[11px] sm:text-xs border-b border-neutral-800 flex items-center justify-center gap-2 overflow-x-auto whitespace-nowrap">
        <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
          <span>🚚</span> Tezkor kuryerlik faqat O&apos;zbekiston bo&apos;yicha
        </span>
        <span className="text-neutral-500">•</span>
        <span className="text-amber-300 font-semibold">
          Chet el fuqarolariga — faqat Samovivoz
        </span>
        <span className="text-neutral-500 hidden md:inline">•</span>
        <span className="inline-flex items-center gap-1 text-rose-400 font-semibold hidden md:inline-flex">
          <span>🎁</span> Telefonlarga simsiz naushnik bonus!
        </span>
      </div>

      {/* Top Bar: Exchange Rate Ticker & Currency Toggle */}
      <div className="bg-neutral-900/90 text-neutral-300 py-1 px-4 sm:px-6 lg:px-8 text-xs border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline text-neutral-300 font-sans font-medium">Bozor kursi:</span>
            <span className="text-white font-bold">1 USD = {exchangeRate.toLocaleString()} UZS</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-neutral-400 hidden md:inline">Valyuta:</span>
            <div className="inline-flex rounded-lg bg-neutral-900 p-0.5 border border-neutral-800">
              <button
                type="button"
                onClick={() => setCurrency('UZS')}
                className={`px-2 py-0.5 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                  activeCurrency === 'UZS'
                    ? 'bg-neutral-200 text-neutral-950 shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                SO&apos;M
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-2 py-0.5 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                  activeCurrency === 'USD'
                    ? 'bg-neutral-200 text-neutral-950 shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Mobile Menu Trigger & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 -ml-2 text-neutral-700 hover:text-black rounded-lg hover:bg-neutral-100 transition-colors"
              aria-label="Menyuni ochish"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* AZ Mobile Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-xs group-hover:scale-105 transition-transform">
                <span>AZ</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-neutral-950 leading-none">
                  AZ MOBILE
                </span>
                <span className="text-[10px] tracking-widest text-neutral-500 font-medium uppercase mt-0.5">
                  Rasmiy Do&apos;kon
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Category Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/70 rounded-full transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar (Desktop) */}
          <div className="hidden sm:flex flex-1 max-w-md mx-2">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="iPhone, Galaxy, Xiaomi, aksessuarlar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-neutral-100 border border-transparent focus:border-neutral-300 focus:bg-white focus:outline-none transition-all placeholder:text-neutral-400"
              />
            </form>
          </div>

          {/* Actions: Admin link, Mobile Search Toggle, Cart Drawer Trigger */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile Search Icon Toggle */}
            <button
              onClick={() => setIsSearchExpandedMobile(!isSearchExpandedMobile)}
              className="sm:hidden p-2 text-neutral-700 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
              aria-label="Qidiruv panelini ochish"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Admin Portal Shortcut */}
            <Link
              href="/admin"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:text-neutral-950 bg-neutral-100/80 hover:bg-neutral-200/80 rounded-full transition-colors"
              title="Admin boshqaruv paneli"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
              <span>Admin Panel</span>
            </Link>

            {/* Cart Icon & Slide-out Trigger */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full text-neutral-800 hover:text-black hover:bg-neutral-100 transition-colors active:scale-95 cursor-pointer"
              aria-label={`Savatcha (${activeItemCount} ta mahsulot)`}
            >
              <ShoppingBag className="w-5 h-5" />
              {activeItemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-neutral-900 text-white text-[10px] font-bold flex items-center justify-center animate-in zoom-in-50">
                  {activeItemCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Search Expandable Bar */}
        {isSearchExpandedMobile && (
          <div className="sm:hidden pb-3 pt-1 animate-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                autoFocus
                placeholder="Model, xotira yoki aksessuarlar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl bg-neutral-100 border border-neutral-200 focus:bg-white focus:outline-none placeholder:text-neutral-400"
              />
              <button
                type="button"
                onClick={() => setIsSearchExpandedMobile(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-700 hover:text-black hover:bg-neutral-100 transition-colors"
                >
                  <Icon className="w-4 h-4 text-neutral-500" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-neutral-100">
            <Link
              href="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-neutral-50 rounded-xl"
            >
              <ShieldCheck className="w-4 h-4 text-neutral-500" />
              <span>Admin boshqaruv paneli</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
