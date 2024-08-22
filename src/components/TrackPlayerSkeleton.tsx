function TrackPlayerSkeleton() {
  return (
    <div className="md:flex w-[420px] lg:w-[480px] max-w-full flex-col gap-7 hidden">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-0.5 items-start relative">
          <div className="bg-white/20 animate-pulse rounded-md h-7 w-48"></div>
          <div className="bg-white/20 animate-pulse h-4 w-24 rounded-md mt-2"></div>
        </div>
        <div className="w-full aspect-square mt-2 rounded-lg bg-white/20 animate-pulse"></div>
      </div>

      <div className="w-full h-2 bg-white/20 animate-pulse rounded-lg" />

      <div className="flex justify-center items-center gap-7 mt-1">
        <div className="bg-white/20 animate-pulse h-9 w-9 rounded-md"></div>
        <div className="bg-white/20 animate-pulse h-12 w-12 rounded-full"></div>
        <div className="bg-white/20 animate-pulse h-9 w-9 rounded-md"></div>
      </div>
    </div>
  );
}

export default TrackPlayerSkeleton;
