import React from 'react';
import Link from 'next/link';
import { PackageOpen, SearchX, ShoppingBag, Box, Users, ArrowRight } from 'lucide-react';

interface EmptyStateProps {
  type?: 'products' | 'search' | 'inventory' | 'cart' | 'customers' | 'orders' | 'generic';
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

const defaultConfigurations = {
  products: {
    icon: <PackageOpen className="w-10 h-10 stroke-[1.25] text-neutral-400" />,
    title: 'Mahsulotlar topilmadi',
    description: 'Tanlangan filtr mezonlariga mos qurilma topilmadi. Narx yoki xotira parametrlarini o\'zgartirib ko\'ring.',
    actionText: 'Barcha filtrlarni tozalash',
  },
  search: {
    icon: <SearchX className="w-10 h-10 stroke-[1.25] text-neutral-400" />,
    title: 'Qidiruv natijalari mavjud emas',
    description: 'Qidiruv so\'zini to\'g\'ri yozganingizni tekshiring yoki umumiyroq nomlar orqali izlang.',
    actionText: 'Barcha mahsulotlar katalogi',
    actionHref: '/products',
  },
  inventory: {
    icon: <Box className="w-10 h-10 stroke-[1.25] text-neutral-400" />,
    title: 'Ombor bo\'sh',
    description: 'Bazada hali mahsulotlar kiritilmagan. Birinchi flagman qurilmani qo\'shing yoki bazani sinxronlang.',
    actionText: 'Birinchi mahsulotni kiritish',
    actionHref: '/admin/products/new',
  },
  cart: {
    icon: <ShoppingBag className="w-10 h-10 stroke-[1.25] text-neutral-400" />,
    title: 'Savatchangiz bo\'sh',
    description: 'Eng so\'nggi flagman smartfonlar, planshetlar va original aksessuarlarimizni ko\'zdan kechiring.',
    actionText: 'Katalogni ko\'rish',
    actionHref: '/products',
  },
  customers: {
    icon: <Users className="w-10 h-10 stroke-[1.25] text-neutral-400" />,
    title: 'Mijozlar ro\'yxatdan o\'tmagan',
    description: 'Do\'konda xaridlar amalga oshirilgach, mijoz profillari bu yerda avtomatik paydo bo\'ladi.',
    actionText: 'Boshqaruv paneliga qaytish',
    actionHref: '/admin',
  },
  orders: {
    icon: <Box className="w-10 h-10 stroke-[1.25] text-neutral-400" />,
    title: 'Hozircha buyurtmalar yo\'q',
    description: 'Mijozlar savatcha orqali buyurtma berganida, barcha tafsilotlar real vaqtda bu yerga tushadi.',
    actionText: 'Do\'konga o\'tish',
    actionHref: '/',
  },
  generic: {
    icon: <PackageOpen className="w-10 h-10 stroke-[1.25] text-neutral-400" />,
    title: 'Ma\'lumotlar mavjud emas',
    description: 'Ushbu bo\'lim uchun ko\'rsatishga ma\'lumot topilmadi.',
    actionText: undefined,
  },
};

export function EmptyState({
  type = 'products',
  title,
  description,
  actionText,
  actionHref,
  onAction,
  className = '',
  icon,
}: EmptyStateProps) {
  const config = defaultConfigurations[type] || defaultConfigurations.generic;
  const displayTitle = title || config.title;
  const displayDesc = description || config.description;
  const displayAction = actionText || config.actionText;
  const displayIcon = icon || config.icon;

  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 md:p-16 rounded-3xl border border-neutral-200/80 bg-neutral-50/50 backdrop-blur-sm transition-all duration-300 ${className}`}
    >
      <div className="w-20 h-20 rounded-2xl bg-white shadow-xs border border-neutral-200/60 flex items-center justify-center mb-6 text-neutral-700">
        {displayIcon}
      </div>

      <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 mb-2">
        {displayTitle}
      </h3>

      <p className="text-neutral-500 max-w-md text-sm sm:text-base leading-relaxed mb-6 font-normal">
        {displayDesc}
      </p>

      {displayAction && (
        <div>
          {actionHref ? (
            <Link
              href={actionHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95 transition-all shadow-xs"
            >
              <span>{displayAction}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : onAction ? (
            <button
              onClick={onAction}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <span>{displayAction}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
