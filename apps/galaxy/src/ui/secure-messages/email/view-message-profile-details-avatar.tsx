import React from 'react'
import { Avatar, Box } from '@radix-ui/themes'

const ViewMessageProfileDetailsAvatar = () => {
  return (
    <Box className="bg-gray-200 rounded-full mr-4 flex h-10 w-10 items-center justify-center">
      <Avatar size="4" fallback="RR" radius="full" />
    </Box>
  )
}

export { ViewMessageProfileDetailsAvatar }
