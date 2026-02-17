'use client';
import { useWatchListStore, useConnectionStore } from "@/store/uiStore";
import { useWSStore } from "@/store/wsStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { binanceSocketManager } from "@/services/binanceSocket"
import { CURRENCY_PAIRS } from "@/lib/constants"
import { WS_Event } from "@/types/BinanceWS";
import { Statusbar } from "@/features/statusbar/components/Statusbar";
import { ping } from "@/services/binanceRest";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});



export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const setWatchlist = useWatchListStore((s) => s.setWatchlist);
  const wsStore = useWSStore(s => s);
  const connectionState = useConnectionStore(s => s);


  useEffect(() => {
    const parseLocalStorage = () => {
      if (typeof window === "undefined") return [];
      const ls = window.localStorage.getItem("watchlist");
      return ls && ls.length ? ls.split(",") : [];
    };

    setWatchlist(parseLocalStorage());
  }, [setWatchlist]);

  useEffect(() => {
    console.log('init');

    ping().then(res => connectionState.setConnected(res)).catch(e => console.log(e))

    const binanceParams = CURRENCY_PAIRS.map(c => {
      return `${c.toLowerCase()}@avgPrice`;
    })

    binanceSocketManager.emitter.on('connected', () => {
      binanceSocketManager.send({
        "method": "SUBSCRIBE",
        "params": binanceParams,
        "id": parseInt(String(Math.random() * 1000000))
      })
      wsStore.setIsConnected(true);
    })

    binanceSocketManager.emitter.on('disconnected', () => {
      wsStore.setIsConnected(false);
    })

    const watchlist_unsub = useWatchListStore.subscribe((state) => {
      window.localStorage.setItem("watchlist", state.watchlist.join());
    });

    const WS_Unsub = binanceSocketManager.subscribe((data: WS_Event) => {
      if (data.e == "avgPrice") {
        wsStore.setPrice(data.s, data.w);
      }
    })

    return () => {
      console.log('clearing subs')
      wsStore.setIsConnected(false);
      WS_Unsub();
      watchlist_unsub();
    }
  }, []);

  return <QueryClientProvider client={queryClient}>
    {children}
    <Statusbar />
  </QueryClientProvider>;
};
