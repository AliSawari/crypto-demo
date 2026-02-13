import { Trade } from "@/types/BinanceRest";

type TradesListProps = {
  trades?: Trade[];
  isLoading: boolean;
};

const formatNumber = (value: number) =>
  Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  });

const formatTime = (timestamp: number) =>
  new Date(timestamp).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

const TradeIcon = ({ isBuyerMaker }: { isBuyerMaker: boolean }) => (
  <span
    className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${
      isBuyerMaker ? "bg-emerald-500" : "bg-rose-500"
    }`}
  >
    {isBuyerMaker ? "B" : "S"}
  </span>
);

const SkeletonRow = () => (
  <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-slate-200" />
      <div>
        <div className="h-3 w-28 rounded-full bg-slate-200" />
        <div className="mt-2 h-2.5 w-20 rounded-full bg-slate-200" />
      </div>
    </div>
    <div className="h-3 w-16 rounded-full bg-slate-200" />
  </div>
);

export const TradesList = ({ trades, isLoading }: TradesListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, idx) => (
          <SkeletonRow key={`skeleton-${idx}`} />
        ))}
      </div>
    );
  }

  if (!trades?.length) {
    return (
      <p className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        No trades yet. When activity picks up, you will see executions here.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {trades.map((trade) => (
        <div
          key={trade.id}
          className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 transition hover:-translate-y-0.5 hover:bg-white hover:shadow"
        >
          <div className="flex items-center gap-3">
            <TradeIcon isBuyerMaker={trade.isBuyerMaker} />
            <div>
              <div className="text-sm font-semibold text-slate-900">
                {trade.isBuyerMaker ? "Buyer initiated" : "Seller initiated"}
              </div>
              <div className="text-xs text-slate-500">
                {formatTime(trade.time)}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-slate-900">
              {formatNumber(trade.price)} / {formatNumber(trade.qty)} qty
            </div>
            <div className="text-xs text-slate-500">
              Quote: {formatNumber(trade.quoteQty)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
