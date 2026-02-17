'use client';

import { CURRENCY_PAIRS, INITIAL_DATA } from "@/lib/constants";
import { getBatchAvgPrice } from "@/services/binanceRest";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CurrencyPairList } from "@/features/market/components/CurrencyPairList";
import { AvgPrice } from "@/types/BinanceRest";
import Watchlist from "@/features/watchlist/components/WatchList";
import { useWSStore } from "@/store/wsStore";
import { useConnectionStore } from "@/store/uiStore";

export default function Home() {
  const [refetchInterval, setRefetchInterval] = useState<any>(null);
  const { isConnected: isWSConnected } = useWSStore(s => s);
  const connectionState = useConnectionStore(s => s);

  const { data, error, refetch: priceRefetch } = useQuery<AvgPrice[]>({
    queryKey: ["currency-pairs"],
    queryFn: () => getBatchAvgPrice(CURRENCY_PAIRS),
    initialData: INITIAL_DATA,
    retry: false
  });

  // useEffect(() => {
  //   console.log('data is ', data);
  //   console.log('error is ', error);
  //   console.log('connectionState is ', connectionState);
  // }, [data, error, connectionState])

  useEffect(() => {
    if (isWSConnected) {
      clearInterval(refetchInterval)
      setRefetchInterval(null);
    } else {
      if (!refetchInterval && connectionState.connected) {
        const interval = setInterval(() => priceRefetch(), 5000)
        setRefetchInterval(interval);
      }
    }
  }, [isWSConnected, connectionState.connected])



  // if (isLoading) return <div className="text-4xl text-center m-auto font-mono mt-12 text-slate-700">Loading...</div>;

  return (
    <div>
      <div className="mx-4 lg:mx-56">
        <div className="m-5 rounded-3xl text-4xl text-blue-500">Crypto Market Watch Demo</div>
        { error ? <div className="font-mono text-red-500 italic">Error Connecting to Binance...</div>: "" }
        <Watchlist marketData={data} />
        <CurrencyPairList pairs={data || []} />
      </div>
    </div>
  );
}
