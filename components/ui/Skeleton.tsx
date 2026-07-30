import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

/**
 * Shimmering placeholder block. Pair with a width/height in `className`.
 * The shimmer sweep itself lives in globals.css (`.animate-shimmer`).
 */
export function Skeleton({ className }: Props) {
  return <div className={cn('relative overflow-hidden bg-hairline animate-shimmer', className)} aria-hidden="true" />
}

/**
 * A run of text lines. The last line is shortened so it reads like a paragraph
 * rather than a solid block.
 */
export function SkeletonText({ lines = 3, className }: Props & { lines?: number }) {
  return (
    <div className={cn('flex flex-col gap-[10px]', className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cn('h-[13px] rounded-pill', i === lines - 1 ? 'w-[62%]' : 'w-full')} />
      ))}
    </div>
  )
}
