'use client'

import { useState } from 'react'
import { Box, Flex, IconButton, Popover } from '@radix-ui/themes'
import { History } from 'lucide-react'
import WaitlistHistoryTable from './waitlist-history-table'

const WaitlistHistory = ({ id }: { id: number }) => {
  const [isSelected, setIsSelected] = useState(false)
  const toggleSelected = () => {
    setIsSelected(!isSelected)
  }

  return (
    <Flex justify="start" className="relative">
      <IconButton
        size="1"
        color="gray"
        variant="ghost"
        className="text-black !m-0"
        type="button"
        onClick={toggleSelected}
      >
        <History size={14} />
      </IconButton>
      <Flex
        justify="center"
        align="center"
        width="100%"
        height="100%"
        position="absolute"
        inset="0"
        className="-z-10"
      >
        <Popover.Root onOpenChange={toggleSelected} modal open={isSelected}>
          <Popover.Trigger>
            <Box className="inline-block h-full" />
          </Popover.Trigger>
          <Popover.Content
            className="min-h-28 -mb-2 -mt-2 flex w-auto max-w-max items-center rounded-1 !p-0"
            align="start"
          >
            <WaitlistHistoryTable id={id} />
          </Popover.Content>
        </Popover.Root>
      </Flex>
    </Flex>
  )
}

export { WaitlistHistory }
