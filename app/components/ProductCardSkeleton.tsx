export function ProductCardSkeleton() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-sm animate-pulse">
      <div className="flex items-start justify-between gap-2">
        <div className="h-4 w-28 bg-slate-200 rounded" />
        <div className="h-5 w-16 bg-slate-200 rounded-full" />
      </div>
      <div className="mt-6 space-y-3">
        <div className="h-48 bg-slate-200 rounded"></div>
        <div className="h-3 w-20 bg-slate-200 rounded" />
        <div className="h-4 w-24 bg-slate-200 rounded" />
        <div className="h-3 w-16 bg-slate-200 rounded" />
      </div>
      <div className="mt-6 h-8 w-full bg-slate-200 rounded-xl" />
    </div>
  );
}
