'use client';

import { CURRENCY_PAIRS } from "@/lib/constants";
import { getBatchAvgPrice } from "@/services/binanceRest";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { CurrencyPairList } from "@/features/market/components/CurrencyPairList";
import { AvgPrice } from "@/types/BinanceRest";
import Watchlist from "@/features/watchlist/components/WatchList";
import { useWatchListStore } from "@/store/uiStore";

export default function Home() {

  const { data, isLoading, error } = useQuery<AvgPrice[]>({
    queryKey: ["currency-pairs"],
    queryFn: () => getBatchAvgPrice(CURRENCY_PAIRS),
  });


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container">
      <div className="contain-content">
        <div className="m-5 rounded-3xl text-4xl text-blue-500">Crypto Demo</div>
        <Watchlist marketData={data} />
        <CurrencyPairList pairs={data || []} />
      </div>
    </div>
  );
}
