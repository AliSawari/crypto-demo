'use client'
import { CurrencyPair } from '@/features/market/components/CurrencyPair';
import { useWatchListStore } from '@/store/uiStore';
import { AvgPrice } from '@/types/BinanceRest';
import { useEffect } from 'react';


export default function Watchlist({ marketData }) {
  const watchlist = useWatchListStore(s => s.watchlist);
  const pairs = marketData.filter(x => watchlist.includes(x.symbol))


  if (!watchlist?.length) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white/60 p-4 text-sm text-slate-600 shadow-sm backdrop-blur">
        No items in the watchlist
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white/60 p-4 shadow-sm backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Watchlist</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {pairs.map((pair: AvgPrice) => (
          <CurrencyPair
            key={`${pair.symbol ?? "pair"}-${pair.closeTime ?? pair.price}`}
            pair={pair}
          />
        ))}
      </div>
    </section>
  );
}