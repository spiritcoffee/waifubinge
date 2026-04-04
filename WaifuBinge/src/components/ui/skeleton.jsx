import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        'rounded-md skeleton-shimmer',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
