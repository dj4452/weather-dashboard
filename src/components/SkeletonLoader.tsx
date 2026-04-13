const SkeletonLoader = () => (
  <div className="space-y-4 animate-pulse">

    {/* Current weather skeleton */}
    <div className="bg-blue-900 rounded-2xl p-6 space-y-4">
      <div className="flex justify-between">
        <div className="space-y-2">
          <div className="h-6 bg-blue-800 rounded w-32" />
          <div className="h-4 bg-blue-800 rounded w-24" />
        </div>
        <div className="h-8 bg-blue-800 rounded w-24" />
      </div>
      <div className="flex justify-between items-center">
        <div className="h-16 bg-blue-800 rounded w-28" />
        <div className="h-16 w-16 bg-blue-800 rounded-full" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-blue-800 rounded-xl" />
        ))}
      </div>
    </div>

    {/* Chart skeleton */}
    <div className="bg-gray-900 rounded-2xl p-5 h-56" />

    {/* Forecast skeleton */}
    <div className="grid grid-cols-7 gap-2">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="h-32 bg-gray-800 rounded-xl" />
      ))}
    </div>

  </div>
)

export default SkeletonLoader