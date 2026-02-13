import { formatPrice, formatTime } from "@/lib/helpers";
import { AvgPrice } from "@/types/BinanceRest";
import Link from "next/link";
import { useWatchListStore } from '@/store/uiStore';
import { useWSStore } from '@/store/wsStore';
import { useEffect } from "react";


export const CurrencyPair = ({ pair }: { pair: AvgPrice }) => {
  const { symbol, price, mins, closeTime } = pair;
  const WatchListState = useWatchListStore(state => state);
  const { addToWatchList, removeFromWatchlist, watchlist } = WatchListState
  const { isConnected:isWSConnected, livePrices } = useWSStore(s => s)

  const addToBtn = <div onClick={() => addToWatchList(symbol)} className="mask-circle rounded-4xl px-2 border-2 text-2xl hover:font-bold cursor-pointer text-green-400">+</div>
  const removeFrombtn = <div onClick={() => removeFromWatchlist(symbol)} className="mask-circle rounded-4xl px-2 border-2 text-2xl hover:font-bold cursor-pointer text-red-400">-</div>

  const isInWatchList = (w) => watchlist.includes(w);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow">
      <div className="flex items-start justify-between">
        <Link href={`/pair/${symbol}`}>
          <div className="text-sm font-semibold text-slate-900 cursor-pointer hover:underline ">
            {symbol ?? "Unknown symbol"}
          </div>
        </Link>
        <div className="text-xs text-slate-500">
          {mins ? `${mins} min window` : "Avg price"}
        </div>
        {
          isInWatchList(symbol) ? removeFrombtn : addToBtn
        }
      </div>

      <div className="mt-2 text-2xl font-semibold text-emerald-600">
        {isWSConnected ? formatPrice(livePrices[symbol]): formatPrice(price)}
      </div>

      <div className="mt-1 flex items-center justify-between text-xs text-slate-600">
        <span>Last close</span>
        <span>{formatTime(closeTime)}</span>
      </div>
    </div>
  );
};
