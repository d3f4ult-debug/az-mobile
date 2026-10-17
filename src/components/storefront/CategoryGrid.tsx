import React from 'react';
import Link from 'next/link';
import { Smartphone, Tablet, Headphones, ArrowUpRight } from 'lucide-react';

export function CategoryGrid() {
  const categories = [
    {
      title: 'Flagman smartfonlar',
      category: 'Phones',
      href: '/products?category=Phones',
      description: 'OLED ekranlar, qudratli protsessorlar va professional kameralar',
      icon: Smartphone,
      accent: 'from-blue-600/10 to-indigo-600/5',
      tag: 'Ommabop',
    },
    {
      title: 'Yuqori unumli planshetlar',
      category: 'Tablets',
      href: '/products?category=Tablets',
      description: 'Ish, o\'qish va grafika uchun Liquid Retina va M-seriyali chiplar',
      icon: Tablet,
      accent: 'from-purple-600/10 to-pink-600/5',
      tag: 'Unumdorlik',
    },
    {
      title: 'Original aksessuarlar',
      category: 'Accessories',
      href: '/products?category=Accessories',
      description: 'Aqlli audio ko\'zoynaklar (ochki), professional HD durbinlar (binokl) va simsiz quloqchinlar',
      icon: Headphones,
      accent: 'from-emerald-600/10 to-teal-600/5',
      tag: 'Bestseller',
    },
  ];

  return (
    <section className="py-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
            Sertifikatlangan texnika
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mt-1">
            Kategoriyalar bo&apos;yicha xarid
          </h2>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 hover:text-neutral-600 transition-colors group"
        >
          <span>Barcha mahsulotlar</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.category}
              href={cat.href}
              className={`group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-neutral-200/80 bg-linear-to-br ${cat.accent} hover:border-neutral-400/80 hover:shadow-xl transition-all duration-300 bg-white`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-600 bg-neutral-100/90 px-3 py-1 rounded-full">
                    {cat.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-neutral-900 group-hover:text-black">
                  {cat.title}
                </h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                  Bo&apos;limga o&apos;tish
                </span>
                <span className="w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-neutral-900 group-hover:text-white text-neutral-700 flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
