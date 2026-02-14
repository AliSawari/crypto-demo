'use client';

import { CURRENCY_PAIRS } from "@/lib/constants";
import { getBatchAvgPrice } from "@/services/binanceRest";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CurrencyPairList } from "@/features/market/components/CurrencyPairList";
import { AvgPrice } from "@/types/BinanceRest";
import Watchlist from "@/features/watchlist/components/WatchList";
import { useWatchListStore } from "@/store/uiStore";
import { Statusbar } from "@/features/statusbar/components/Statusbar";
import { useWSStore } from "@/store/wsStore";

export default function Home() {
  const [refetchInterval, setRefetchInterval] = useState<any>(null);
const { isConnected: isWSConnected, livePrices } = useWSStore(s => s)

  const { data, isLoading, error, refetch:priceRefetch } = useQuery<AvgPrice[]>({
    queryKey: ["currency-pairs"],
    queryFn: () => getBatchAvgPrice(CURRENCY_PAIRS)
  });

    useEffect(() => {
    if (isWSConnected) {
      clearInterval(refetchInterval)
      setRefetchInterval(null);
    } else {
      if (!refetchInterval) {
        const interval = setInterval(() => priceRefetch(), 5000)
        setRefetchInterval(interval);
      }
    }
  }, [isWSConnected])



  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="mx-4 lg:mx-56">
        <div className="m-5 rounded-3xl text-4xl text-blue-500">Crypto Market Watch Demo</div>
        <Watchlist marketData={data} />
        <CurrencyPairList pairs={data || []} />
      </div>
    </div>
  );
}
