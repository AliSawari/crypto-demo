'use client';

import { useMemo, useState } from 'react';
import { CurrencyPair } from '@/features/market/components/CurrencyPair';
import { useWatchListStore } from '@/store/uiStore';
import { AvgPrice } from '@/types/BinanceRest';
import { useDebounce } from 'use-debounce';

type WatchlistProps = {
  marketData?: AvgPrice[];
};

export default function Watchlist({ marketData = [] }: WatchlistProps) {
  const [query, setQuery] = useState('');
  const [debounceQuery] = useDebounce(query, 500);
  const watchlist = useWatchListStore((s) => s.watchlist) ?? [];
  const pairs = marketData.filter((x) => watchlist.includes(x.symbol));

  const filteredPairs = useMemo(() => {
    const term = debounceQuery.trim().toLowerCase();
    if (!term) return pairs;
    return pairs.filter((pair) => pair.symbol?.toLowerCase().includes(term));
  }, [pairs, debounceQuery]);

  if (!watchlist?.length) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white/60 p-4 text-sm text-slate-600 shadow-sm backdrop-blur">
        No items in the watchlist
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white/60 p-4 shadow-sm backdrop-blur my-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-2x1 uppercase tracking-wide text-slate-500">Watchlist</p>
        </div>
        <label className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="w-48 rounded-full border border-slate-200 bg-white px-9 py-2 text-sm text-slate-700 shadow-inner outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
          />
        </label>
      </div>

      {filteredPairs.length ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPairs.map((pair: AvgPrice) => (
            <CurrencyPair
              key={`${pair.symbol ?? 'pair'}-${pair.closeTime ?? pair.price}`}
              pair={pair}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          No pairs found for “{query}”.
        </p>
      )}
    </section>
  );
}
