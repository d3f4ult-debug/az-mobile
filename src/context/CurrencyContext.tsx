'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'UZS' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  exchangeRate: number; // e.g. 12850 UZS per 1 USD
  setCurrency: (currency: Currency) => void;
  setExchangeRate: (rate: number) => void;
  formatPrice: (amountInUZS: number, options?: { showDual?: boolean }) => {
    primary: string;
    secondary?: string;
  };
}

const DEFAULT_EXCHANGE_RATE = 12850;

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('UZS');
  const [exchangeRate, setExchangeRateState] = useState<number>(DEFAULT_EXCHANGE_RATE);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedCurrency = localStorage.getItem('az_currency') as Currency | null;
      if (savedCurrency === 'UZS' || savedCurrency === 'USD') {
        setCurrencyState(savedCurrency);
      }
      const savedRate = localStorage.getItem('az_exchange_rate');
      if (savedRate && !isNaN(Number(savedRate))) {
        setExchangeRateState(Number(savedRate));
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('az_currency', c);
    } catch {
      // ignore
    }
  };

  const setExchangeRate = (rate: number) => {
    setExchangeRateState(rate);
    try {
      localStorage.setItem('az_exchange_rate', rate.toString());
    } catch {
      // ignore
    }
  };

  const formatPrice = (amountInUZS: number, options?: { showDual?: boolean }) => {
    const rate = exchangeRate || DEFAULT_EXCHANGE_RATE;
    const amountInUSD = Math.round(amountInUZS / rate);
    const activeCurrency = isMounted ? currency : 'UZS';

    if (activeCurrency === 'USD') {
      return {
        primary: `$${amountInUSD.toLocaleString()}`,
        secondary: options?.showDual ? `≈ ${amountInUZS.toLocaleString()} so'm` : undefined,
      };
    }

    return {
      primary: `${amountInUZS.toLocaleString()} so'm`,
      secondary: options?.showDual ? `≈ $${amountInUSD.toLocaleString()}` : undefined,
    };
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        exchangeRate,
        setCurrency,
        setExchangeRate,
        formatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
