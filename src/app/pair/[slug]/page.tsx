'use client';

import SelectedPair from "@/features/market/components/SelectedPair";
import { CURRENCY_PAIRS } from "@/lib/constants";
import Link from "next/link";
import { useParams } from "next/navigation";


export default function PairDetailsPage() {
  const params = useParams();
  const slug = params?.slug;
  const symbol = Array.isArray(slug) ? slug[0] : slug;

  const isInList = symbol && CURRENCY_PAIRS.includes(symbol.toUpperCase());

  if (!symbol || !isInList) {
    return (
      <main className="mx-auto max-w-5xl p-6">
        <p className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          No symbol provided. Please navigate from the markets list.
          <div className="break-after-all text-blue-300 text-2xl my-4">
            <Link href="/"><span>Go Back To Market</span></Link>
          </div>
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-6">
      <div className="flex items-center gap-2 text-md text-slate-500">
        <Link href="/"><span>Markets</span></Link>
        <span className="text-slate-400">/</span>
        <span className="font-semibold text-slate-900">{symbol.toUpperCase()}</span>
      </div>
      <SelectedPair symbol={symbol.toUpperCase()} />
    </main>
  );
}
