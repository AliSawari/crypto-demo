import { useMemo, useState } from "react";
import { CurrencyPair } from "./CurrencyPair";
import { AvgPrice } from "@/types/BinanceRest";

export const CurrencyPairList = ({ pairs }: { pairs: AvgPrice[] }) => {
  if (!pairs?.length) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white/60 p-4 text-sm text-slate-600 shadow-sm backdrop-blur">
        No currency pairs available.
      </section>
    );
  }

  const [query, setQuery] = useState("");

  const filteredPairs = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return pairs;
    return pairs.filter((pair) =>
      pair.symbol?.toLowerCase().includes(term)
    );
  }, [pairs, query]);

  return (
    <section className="rounded-xl border border-slate-200 bg-white/60 p-4 shadow-sm backdrop-blur my-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-lg uppercase tracking-wide text-slate-500">Markets</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-44 rounded-full border border-slate-200 bg-white px-9 py-2 text-sm text-slate-700 shadow-inner outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
            />
          </label>
          <span className="text-xs text-slate-500">Live average prices</span>
        </div>
      </div>

      {filteredPairs.length ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPairs.map((pair: AvgPrice) => (
            <CurrencyPair
              key={`${pair.symbol ?? "pair"}-${pair.closeTime ?? pair.price}`}
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
};
