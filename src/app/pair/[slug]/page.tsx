'use client';

import SelectedPair from "@/features/market/components/SelectedPair";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PairDetailsPage() {
  const params = useParams();
  const slug = params?.slug;
  const symbol = Array.isArray(slug) ? slug[0] : slug;

  if (!symbol) {
    return (
      <main className="mx-auto max-w-5xl p-6">
        <p className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          No symbol provided. Please navigate from the markets list.
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
