"use client";

import { useConnectionStore } from "@/store/uiStore";
import { useWSStore } from "@/store/wsStore";
import { useEffect, useState } from "react";

export const Statusbar = () => {
  const isWSConnected = useWSStore((s) => s.isConnected);
  const isConnected = useConnectionStore(s => s.connected);
  const [status, setStatus] = useState({
    label: "Disconnected!",
    helper: "No Connection With Binance Server!",
    dotClass: "bg-red-500",
  })


  useEffect(() => {
    if (isConnected) {
      if (isWSConnected) {
        setStatus({
          label: "WebSocket connected",
          helper: "Live prices streaming",
          dotClass: "bg-emerald-500",
        })
      } else {
        setStatus({
          label: "WebSocket disconnected",
          helper: "Using REST (every 5 seconds)",
          dotClass: "bg-amber-500",
        })

      }
    } else {
      setStatus({
        label: "Disconnected!",
        helper: "No Connection With Binance Server!",
        dotClass: "bg-red-500",
      })
    }

  }, [isWSConnected, isConnected])

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs shadow-lg backdrop-blur">
        <span
          className={`h-2.5 w-2.5 rounded-full shadow-inner ${status.dotClass} animate-pulse`}
          aria-hidden
        />
        <div className="leading-tight">
          <p className="font-semibold text-slate-900">{status.label}</p>
          <p className="text-slate-500">{status.helper}</p>
        </div>
      </div>
    </div>
  );
};
