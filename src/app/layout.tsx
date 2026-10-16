import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AZ Mobile | Flagman smartfonlar va texnika do\'koni',
  description:
    'Sertifikatlangan mobil telefonlar, planshetlar va aksessuarlar. Rasmiy kafolat bilan "AL-SAFI PREMIUM" MChJ.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-neutral-900">
        <CurrencyProvider>
          <CartProvider>{children}</CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
