'use client'

import { Flex, IconButton, Popover, Text } from '@radix-ui/themes'
import { ClockIcon } from '@/components/icons'
import { StatusHistoryTable } from './status-history-table'
import { ForwardingMessage } from './types'

interface StatusHistoryButtonProps {
  forwardingMessage: ForwardingMessage
}
const StatusHistoryButton = ({
  forwardingMessage,
}: StatusHistoryButtonProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton size="1" color="gray" variant="ghost" highContrast>
          <ClockIcon />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content className="w-96 p-2">
        <Flex gap="1" direction="column" height="100%">
          <Text className="text-3 font-[600]">Status Hx</Text>
          <StatusHistoryTable forwardingMessage={forwardingMessage} />
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}

export { StatusHistoryButton }
