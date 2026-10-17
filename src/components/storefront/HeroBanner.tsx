import React from 'react';
import Link from 'next/link';
import { ArrowRight, Smartphone, ShieldCheck, Zap } from 'lucide-react';

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-radial from-neutral-900 to-black text-white py-16 sm:py-24 lg:py-28 rounded-3xl my-6 border border-neutral-800 shadow-2xl">
      {/* Background ambient glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 text-center space-y-6">
        {/* Status Pill with Sale Callout */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-xs font-semibold text-rose-300">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span>🔥 KATTA AKSIYA / SALE: Telefonlarga simsiz naushnik sovg&apos;aga!</span>
          <span className="text-neutral-500">•</span>
          <span className="text-amber-300">🚚 O&apos;zbekiston bo&apos;ylab kuryer yoki Samovivoz</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
          Flagman smartfonlar va texnika. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-400">
            Har bir telefonga bepul naushnik!
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
          Sertifikatlangan original smartfonlar, planshetlar va ommabop aksessuarlar.
          Tezkor kuryerlik xizmati faqat O&apos;zbekiston bo&apos;yicha, chet el fuqarolariga — faqat o&apos;zi olib ketish (Samovivoz).
        </p>

        {/* CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/products"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-neutral-950 font-medium text-sm hover:bg-neutral-200 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Katalogni ko&apos;rish</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/products?category=Phones"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-sm border border-neutral-700/80 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Smartphone className="w-4 h-4 text-neutral-400" />
            <span>Eng so&apos;nggi flagmanlar</span>
          </Link>
        </div>

        {/* Feature Badges */}
        <div className="pt-8 border-t border-neutral-800/60 grid grid-cols-2 md:grid-cols-3 gap-4 text-left max-w-3xl mx-auto">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs text-neutral-300 font-medium">Neon Serverless Baza</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs text-neutral-300 font-medium">100% Original Qurilmalar</span>
          </div>
          <div className="col-span-2 md:col-span-1 flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 justify-center md:justify-start">
            <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
            <span className="text-xs text-neutral-300 font-medium">Tezkor Kuryerlik Xizmati</span>
          </div>
        </div>
      </div>
    </section>
  );
}
