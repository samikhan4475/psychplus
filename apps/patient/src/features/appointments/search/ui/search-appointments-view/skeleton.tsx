import { cn } from '@psychplus-v2/utils'

interface SkeletonProps {
  className?: string
}
const Skeleton = ({ className }: SkeletonProps) => (
  <div className={cn('animate-pulse bg-gray-3', className)} />
)

export { Skeleton }
