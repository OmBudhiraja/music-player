function TrackItemSkeleton() {
  return (
    <div className="p-4 rounded-lg flex items-center gap-4 text-white cursor-pointer w-full transition-colors animate-pulse">
      <div className="h-12 w-12 rounded-full overflow-hidden shrink-0 bg-white/20"></div>
      <div className="flex-1 flex flex-col items-start gap-3">
        <div className="h-5 w-3/4 max-w-48 rounded-md bg-white/20"></div>
        <div className="h-3 rounded-md w-1/2 max-w-32 bg-white/10"></div>
      </div>
      <div className="shrink-0 h-6 w-10 rounded-md bg-white/10 text-lg"></div>
    </div>
  );
}

export default TrackItemSkeleton;
