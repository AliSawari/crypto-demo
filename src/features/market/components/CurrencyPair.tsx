import { formatPrice, formatTime } from "@/lib/helpers";
import { AvgPrice } from "@/types/BinanceRest";
import Link from "next/link";
import Image from 'next/image'
import { useWatchListStore } from '@/store/uiStore';
import { useWSStore } from '@/store/wsStore';
import { useEffect } from "react";
import { DynamicLogo } from "./DynamicLogo";


export const CurrencyPair = ({ pair }: { pair: AvgPrice }) => {
  const { symbol, price, mins, closeTime } = pair;
  const WatchListState = useWatchListStore(state => state);
  const { addToWatchList, removeFromWatchlist, watchlist } = WatchListState
  const { isConnected: isWSConnected, livePrices } = useWSStore(s => s)

  const addToBtn = <button onClick={() => addToWatchList(symbol)} className="hover:font-bold cursor-pointer">
    <PlusIcon />
  </button>
  const removeFrombtn = <button onClick={() => removeFromWatchlist(symbol)} className="hover:font-bold cursor-pointer">
    <RemoveIcon />
  </button>

  const isInWatchList = (w) => watchlist.includes(w);

  const getLatestPrice = () => {
    if (isWSConnected) {
      const live: any = formatPrice(livePrices[symbol]);
      if (live && !isNaN(live)) return live;
    }
    return formatPrice(price);
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow">
      <div className="flex items-start justify-between">
        <Link href={`/pair/${symbol}`}>
          <div className="flex">
            <DynamicLogo s={symbol} />
            <div className="ml-2 text-sm font-semibold text-slate-900 cursor-pointer hover:underline ">
              {symbol ?? "Unknown symbol"}
            </div>
          </div>
        </Link>
        <div className="text-xs text-slate-500">
          {mins ? `${mins} min` : "Avg price"}
        </div>
        {
          isInWatchList(symbol) ? removeFrombtn : addToBtn
        }
      </div>

      <div className="mt-2 text-2xl font-semibold text-emerald-600">
        {getLatestPrice()}
      </div>

      <div className="mt-1 flex items-center justify-between text-xs text-slate-600">
        <span>Last close</span>
        <span>{formatTime(closeTime)}</span>
      </div>
    </div>
  );
};

const PlusIcon = () => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    fill="#000000" className="w-6">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="#CCCCCC"
      strokeWidth="0.512"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <title>plus-circle</title> <desc>Created with Sketch Beta.</desc>{" "}
      <defs> </defs>{" "}
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        {" "}
        <g id="Icon-Set"
          transform="translate(-464.000000, -1087.000000)"
          fill="#000000">
          {" "}
          <path className="fill-green-500"
            d="M480,1117 C472.268,1117 466,1110.73 466,1103 C466,1095.27 472.268,1089 480,1089 C487.732,1089 494,1095.27 494,1103 C494,1110.73 487.732,1117 480,1117 L480,1117 Z M480,1087 C471.163,1087 464,1094.16 464,1103 C464,1111.84 471.163,1119 480,1119 C488.837,1119 496,1111.84 496,1103 C496,1094.16 488.837,1087 480,1087 L480,1087 Z M486,1102 L481,1102 L481,1097 C481,1096.45 480.553,1096 480,1096 C479.447,1096 479,1096.45 479,1097 L479,1102 L474,1102 C473.447,1102 473,1102.45 473,1103 C473,1103.55 473.447,1104 474,1104 L479,1104 L479,1109 C479,1109.55 479.447,1110 480,1110 C480.553,1110 481,1109.55 481,1109 L481,1104 L486,1104 C486.553,1104 487,1103.55 487,1103 C487,1102.45 486.553,1102 486,1102 L486,1102 Z"
            id="plus-circle">
            {" "}
          </path>{" "}
        </g>{" "}
      </g>{" "}
    </g>
  </svg>
);



const RemoveIcon = () => (
  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000" className="w-6 text-red-500 fill-red-500">

    <path fill="red" d="M352 480h320a32 32 0 1 1 0 64H352a32 32 0 0 1 0-64z">
    </path>
    <path fill="red" d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z">
    </path>
  </svg>
)

