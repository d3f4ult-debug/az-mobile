'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Database, Check, Loader2 } from 'lucide-react';

export function SeedButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSeed = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      setMessage(data.message || 'Muvaffaqiyatli yakunlandi!');
      router.refresh();
    } catch {
      setMessage('Xatolik yuz berdi');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {message && (
        <span className="text-xs text-emerald-400 flex items-center gap-1 animate-in fade-in">
          <Check className="w-3.5 h-3.5" />
          <span>{message}</span>
        </span>
      )}
      <button
        onClick={handleSeed}
        disabled={loading}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
        title="Bazada mahsulotlar bo'lmasa, namunaviy flagmanlarni yuklaydi"
      >
        {loading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <Database className="w-3.5 h-3.5 text-blue-400" />
        )}
        <span>Namunaviy mahsulotlarni yuklash</span>
      </button>
    </div>
  );
}
