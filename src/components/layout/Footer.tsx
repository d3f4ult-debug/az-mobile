'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Truck, Clock, Award } from 'lucide-react';

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-900">
      {/* Retail Guarantees Bar */}
      <div className="border-b border-neutral-800/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center text-white shrink-0">
                <Award className="w-5 h-5 text-neutral-300" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white">100% Original</p>
                <p className="text-xs text-neutral-400">Ishlab chiqaruvchi rasmiy kafolati</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center text-white shrink-0">
                <Truck className="w-5 h-5 text-neutral-300" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white">Tezkor yetkazib berish</p>
                <p className="text-xs text-neutral-400">O&apos;zbekiston bo&apos;ylab kuryerlik xizmati</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center text-white shrink-0">
                <Shield className="w-5 h-5 text-neutral-300" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white">Xavfsiz to&apos;lov</p>
                <p className="text-xs text-neutral-400">Shifrlangan va kafolatlangan tizim</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center text-white shrink-0">
                <Clock className="w-5 h-5 text-neutral-300" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white">Doimiy qo&apos;llab-quvvatlash</p>
                <p className="text-xs text-neutral-400">Texnik maslahat va servis ko&apos;magi</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold text-xs tracking-wider">
                AZ
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                AZ MOBILE
              </span>
            </div>
            <p className="text-neutral-400 text-sm max-w-sm leading-relaxed">
              Flagman smartfonlar, planshetlar va original aksessuarlarning sertifikatlangan chakana savdo tarmog&apos;i. Bosh ofis: Shahrixon, O&apos;zbekiston.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-neutral-900 text-neutral-300 border border-neutral-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Neon Postgres Baza Ulangan
              </span>
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Katalog</h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <Link href="/products?category=Phones" className="hover:text-white transition-colors">
                  Flagman smartfonlar
                </Link>
              </li>
              <li>
                <Link href="/products?category=Tablets" className="hover:text-white transition-colors">
                  Planshetlar va iPad&apos;lar
                </Link>
              </li>
              <li>
                <Link href="/products?category=Accessories" className="hover:text-white transition-colors">
                  Original aksessuarlar
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Barcha modellar
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Boshqaruv</h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Admin boshqaruv paneli
                </Link>
              </li>
              <li>
                <Link href="/admin/products" className="hover:text-white transition-colors">
                  Ombor qoldiqlari
                </Link>
              </li>
              <li>
                <Link href="/admin/orders" className="hover:text-white transition-colors">
                  Buyurtmalar va jo&apos;natmalar
                </Link>
              </li>
              <li>
                <Link href="/admin/customers" className="hover:text-white transition-colors">
                  Mijozlar bazasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Mijozlar xizmati</h4>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Ish vaqti: Har kuni 09:00 dan 21:00 gacha
            </p>
            <p className="text-sm text-white font-medium mt-2">
              +998 (90) 000-00-00
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              support@azmobile.uz
            </p>
          </div>
        </div>

        {/* Required Legal Information Block */}
        <div className="mt-12 pt-8 border-t border-neutral-800/80">
          <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800/80 p-5 sm:p-6 text-xs text-neutral-400 leading-relaxed font-mono">
            <p className="text-neutral-200 font-semibold mb-2 font-sans text-sm">
              © {currentYear} AZ Mobile.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1.5 gap-x-6">
              <p><span className="text-neutral-300 font-medium font-sans">Legal Entity:</span> &quot;AL-SAFI PREMIUM&quot; mas&apos;uliyati cheklangan jamiyati (LLC)</p>
              <p><span className="text-neutral-300 font-medium font-sans">TIN (STIR):</span> 313 323 610</p>
              <p><span className="text-neutral-300 font-medium font-sans">Director:</span> Ergashev Azizbek Anvarovich</p>
              <p><span className="text-neutral-300 font-medium font-sans">State Registration:</span> №3343366</p>
              <p className="md:col-span-2">
                <span className="text-neutral-300 font-medium font-sans">Address:</span> 171 Shahrikhon shoh Street, Yangihayot MFY, Shahrikhon, Shahrikhon district, Andijan region, Uzbekistan
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
            <p>© {currentYear} AZ Mobile. Barcha huquqlar himoyalangan.</p>
            <p className="text-[11px] text-neutral-600">
              Next.js va Neon PostgreSQL asosida yaratilgan zamonaviy chakana savdo platformasi.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
