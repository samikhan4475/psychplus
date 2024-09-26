import React from 'react'
import { Box, Text } from '@radix-ui/themes'

const ErrorBadget = () => {
  return (
    <Box className="bg-pp-red-100 flex h-[16px] w-[46px] items-center justify-center rounded-6">
      <Text className="text-pp-states-error text-[11px] leading-1">ERROR</Text>
    </Box>
  )
}

export { ErrorBadget }
