import React from 'react'
import { Avatar, Box } from '@radix-ui/themes'
import { useStore } from '../../store'

const ViewMessageProfileDetailsAvatar = () => {
  const { previewSecureMessage } = useStore((state) => state)
  const createdByFullName =
    previewSecureMessage?.secureMessage?.metadata?.createdByFullName
  const initials = createdByFullName
    ? createdByFullName
        .split(' ')
        .map((name) => name.charAt(0))
        .join('')
    : 'NA'

  return (
    <Box className="bg-gray-200 rounded-full mr-4 flex h-10 w-10 items-center justify-center">
      <Avatar size="4" fallback={initials} radius="full" />
    </Box>
  )
}

export { ViewMessageProfileDetailsAvatar }
