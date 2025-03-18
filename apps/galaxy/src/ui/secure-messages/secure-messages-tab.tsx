import React from 'react'
import { Box, Tabs } from '@radix-ui/themes'
import { SecureMessagesTab } from './types'

const Tab = ({
  value,
  onClick,
  text,
  unreadCount = 0,
}: {
  value: SecureMessagesTab
  onClick: (value: SecureMessagesTab) => void
  text: string
  unreadCount?: number
}) => {
  return (
    <Tabs.Trigger
      className="text-sm text-gray-600  data-[state=active]:bg-white data-[state=active]:shadow-md text-pp-gray-3 data-[state=active]:text-black h-[24px] w-[99px] rounded-2 px-4  py-1 font-medium focus:outline-none data-[state=active]:before:w-0"
      value={value}
      onClick={() => onClick(value)}
    >
      {text}
      {unreadCount > 0 && (
        <Box className="inline-block">
          <Box className="text-white text-xs bg-pp-states-error rounded-full border-white mx-1  flex items-center justify-center border px-1 text-1 min-w-6 font-medium">
            {unreadCount}
          </Box>
        </Box>
      )}
    </Tabs.Trigger>
  )
}

export { Tab }
