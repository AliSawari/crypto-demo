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

  return (
    <section className="rounded-xl border border-slate-200 bg-white/60 p-4 shadow-sm backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Markets</p>
          <h2 className="text-lg font-semibold text-slate-900">Currency pairs</h2>
        </div>
        <span className="text-xs text-slate-500">Live average prices</span>
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
};
