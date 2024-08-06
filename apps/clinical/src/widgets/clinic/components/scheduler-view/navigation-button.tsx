import { IconButton } from '@radix-ui/themes'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@psychplus/ui/cn'

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
        'h-5 w-5 cursor-pointer rounded-[50%] bg-[#FFF] [border:2px_solid_#DDDDE3] [box-shadow:none]',
        className,
      )}
      onClick={onClick}
    >
      {direction === 'left' ? (
        <ChevronLeft width={12} height={12} className="text-[#60646C]" />
      ) : (
        <ChevronRight width={12} height={12} className="text-[#60646C]" />
      )}
    </IconButton>
  )
}

export { NavigationButton }
