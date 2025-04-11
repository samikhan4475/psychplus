import React from 'react'
import { cn } from '@psychplus-v2/utils'
import { Box, Button } from '@radix-ui/themes'
import { BellIcon } from 'lucide-react'

interface BellIconButtonProps {
  inboxCount: number
  className?: string
  onClick?: () => void
}

const BellIconButton = ({
  inboxCount,
  className,
  onClick,
}: BellIconButtonProps) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={cn('relative rounded-2 px-2 py-1', className)}
      color="gray"
    >
      <Box>
        <BellIcon width={24} height={24} color="#1C2024" />
        {inboxCount > 0 && (
          <Box className="min-w-2 min-h-2 rounded-full absolute right-[10px] top-2 bg-red-11" />
        )}
      </Box>
    </Button>
  )
}

export { BellIconButton }
