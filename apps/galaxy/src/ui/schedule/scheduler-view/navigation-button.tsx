'use client'

import { cn } from '@/utils'
import { IconButton } from '@radix-ui/themes'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface NavigationButtonProps {
  direction: 'left' | 'right'
  onClick: () => void
  className?: string
}

const NavigationButton = ({
  direction,
  onClick,
  className,
}: NavigationButtonProps) => {

  return (
    <IconButton
      variant="outline"
      className={cn(
        'h-5 w-5 cursor-pointer rounded-[50%] bg-white border-2 border-solid border-pp-grey [box-shadow:none]',
        className,
      )}
      onClick={onClick}
    >
      {direction === 'left' ? (
        <ChevronLeft width={12} height={12} className="text-pp-gray-1" />
      ) : (
        <ChevronRight width={12} height={12} className="text-pp-gray-1" />
      )}
    </IconButton>
  )
}

export { NavigationButton }
