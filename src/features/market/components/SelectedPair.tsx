'use client';

import { useMemo, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAvgPrice, getTrades } from "@/services/binanceRest";
import { AvgPrice, Trade } from "@/types/BinanceRest";
import { Trades } from "@/features/orderbook/components/Trades";
import { formatPrice, formatTime } from "@/lib/helpers";
import { useWatchListStore } from '@/store/uiStore';
import { useWSStore } from "@/store/wsStore";



export default function SelectedPair({ symbol }: { symbol: string }) {
  const watchlistState = useWatchListStore(s => s);
  const { watchlist, addToWatchList, removeFromWatchlist } = watchlistState;
  const { isConnected: isWSConnected, livePrices } = useWSStore(s => s)


  const isInWatchlist = watchlist.includes(symbol);

  const addBTN = (
    <button
      type="button"
      onClick={() => addToWatchList(symbol)}
      className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-500 cursor-pointer"
    >
      <WatchIcon />
      {"Add to watchlist"}
    </button>
  );

  const removeBTN = (
    <button
      type="button"
      onClick={() => removeFromWatchlist(symbol)}
      className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-500 cursor-pointer"
    >
      <RemoveIcon />
      {"Remove from watchlist"}
    </button>
  )



  const {
    data: priceData,
    isLoading: isPriceLoading,
    error: priceError,
  } = useQuery<AvgPrice>({
    queryKey: ["avg-price", symbol],
    queryFn: () => getAvgPrice(symbol),
    enabled: Boolean(symbol),
  });

  const {
    data: trades,
    isLoading: isTradesLoading,
    error: tradesError,
  } = useQuery<Trade[] | undefined>({
    queryKey: ["trades", symbol],
    queryFn: () => getTrades(symbol),
    enabled: Boolean(symbol),
    refetchInterval: 5000
  });

  const latestPrice = useMemo(() => (priceData ? formatPrice(priceData.price) : "--"), [priceData]);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-emerald-50/70 p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Selected pair
            </p>
            <div className="flex items-baseline gap-3">
              <h1 className="text-2xl font-semibold text-slate-900">
                {symbol}
              </h1>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                Live average
              </span>
            </div>
          </div>

          {
            isInWatchlist ? removeBTN : addBTN
          }


        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Stat label="Price" value={isWSConnected ? livePrices[symbol] : latestPrice} />
          <Stat
            label="Close time"
            value={formatTime(priceData?.closeTime)}
            helper="Last close on Binance"
          />
          <Stat
            label="Window"
            value={priceData?.mins ? `${priceData.mins} mins` : "—"}
            helper="Interval for average price"
          />
        </div>

        {priceError && (
          <p className="mt-4 text-sm text-amber-700">
            Could not load price data. Please retry.
          </p>
        )}

        <div className="mt-6 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
          <InfoTile
            title="What is this price?"
            body="This is Binance's rolling average price for the selected pair over the current window."
            icon={<SparkleIcon />}
          />
          <InfoTile
            title="Why it matters"
            body="Average price smooths out short-term volatility so you can compare pairs more easily."
            icon={<ChartIcon />}
          />
        </div>
      </section>

      <Trades trades={trades} isLoading={isTradesLoading} error={tradesError} />
    </div>
  );
}

const Stat = ({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper?: string;
}) => (
  <div className="rounded-xl border border-slate-200 bg-white/70 p-4 shadow-sm">
    <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
    <p className="mt-1 text-xl font-semibold text-slate-900">{value}</p>
    {helper && <p className="mt-1 text-xs text-slate-500">{helper}</p>}
  </div>
);

const InfoTile = ({
  title,
  body,
  icon,
}: {
  title: string;
  body: string;
  icon: ReactNode;
}) => (
  <div className="flex gap-3 rounded-xl border border-slate-200 bg-white/70 p-4 shadow-sm">
    <div className="mt-0.5 text-emerald-600">{icon}</div>
    <div>
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="text-xs text-slate-600">{body}</p>
    </div>
  </div>
);

const WatchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4"
  >
    <path d="M12 4a8 8 0 0 0-6.32 12.9l-1.4 1.4a1 1 0 1 0 1.41 1.42l1.38-1.38A8 8 0 1 0 12 4zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm-1 2v4.59l3.3 3.3a1 1 0 0 1-1.42 1.42l-3.58-3.59A1 1 0 0 1 9 13V8a1 1 0 1 1 2 0z" />
  </svg>
);

const SparkleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
  >
    <path d="M10.5 2.75a.75.75 0 0 1 1.45-.25l1.05 3.15a2 2 0 0 0 1.35 1.35l3.15 1.05a.75.75 0 0 1 0 1.42l-3.15 1.05a2 2 0 0 0-1.35 1.35l-1.05 3.15a.75.75 0 0 1-1.42 0l-1.05-3.15a2 2 0 0 0-1.35-1.35L3 9.97a.75.75 0 0 1 0-1.42l3.15-1.05a2 2 0 0 0 1.35-1.35zM6 17a1 1 0 0 0-.94.66l-.56 1.68a1 1 0 0 0 1.9.62l.56-1.68A1 1 0 0 0 6 17zm12.88-3.52A.8.8 0 0 0 18 14a.8.8 0 0 0-.75.54l-.68 2.05a.8.8 0 0 0 1.52.5l.68-2.05a.8.8 0 0 0 .11-.56z" />
  </svg>
);

const ChartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
  >
    <path d="M4 4a1 1 0 0 0-1 1v15h18a1 1 0 1 0 0-2H5V5a1 1 0 0 0-1-1zm16.3 4.3a1 1 0 0 0-1.6-1.2l-4.05 5.4-2.24-1.86a1 1 0 0 0-1.28.03l-3.5 3a1 1 0 1 0 1.3 1.52l2.86-2.45 2.35 1.95a1 1 0 0 0 1.43-.18z" />
  </svg>
);

const RemoveIcon = () => (
  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000" className="w-4 text-red-500">

    <path fill="#000000" d="M352 480h320a32 32 0 1 1 0 64H352a32 32 0 0 1 0-64z">
    </path>
    <path fill="#000000" d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z">
    </path>
  </svg>
)