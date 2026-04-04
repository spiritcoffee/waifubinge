import { Skeleton } from '@/components/ui/skeleton'

function AnimeCardSkeleton() {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden bg-card border border-border">
      {/* Image skeleton */}
      <Skeleton className="aspect-[3/4] w-full" />
      {/* Content skeleton */}
      <div className="p-3 flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center gap-2 mt-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-12 ml-auto" />
        </div>
        <div className="flex gap-1 mt-1">
          <Skeleton className="h-4 w-14 rounded-full" />
          <Skeleton className="h-4 w-14 rounded-full" />
        </div>
      </div>
    </div>
  )
}

function LoadingGrid({ count = 24 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <AnimeCardSkeleton key={i} />
      ))}
    </div>
  )
}

export { AnimeCardSkeleton, LoadingGrid }
