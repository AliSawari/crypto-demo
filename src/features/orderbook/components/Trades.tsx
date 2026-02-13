import { TradesList } from "./TradesList";
import { Trade } from "@/types/BinanceRest";

type TradesProps = {
  trades?: Trade[];
  isLoading: boolean;
  error?: unknown;
};

export const Trades = ({ trades, isLoading, error }: TradesProps) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Trades
          </p>
          <h2 className="text-lg font-semibold text-slate-900">
            Latest executed orders
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            Fresh fills from Binance so you can sense short-term momentum.
          </p>
        </div>
        <div className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
          Live feed
        </div>
      </header>

      <div className="mt-4">
        {error ? (
          <p className="text-sm text-amber-700">
            Could not load trades right now. Please retry.
          </p>
        ) : (
          <TradesList trades={trades} isLoading={isLoading} />
        )}
      </div>
    </section>
  );
};
