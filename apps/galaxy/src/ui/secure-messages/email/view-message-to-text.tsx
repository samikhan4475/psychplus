import React from 'react'
import { Text } from '@radix-ui/themes'
import { SecureMessage } from '../types'

const ViewMessageToText = ({
  previewSecureMessage,
}: {
  previewSecureMessage: SecureMessage | null
}) => {
  return (
    <Text className="text-pp-gray-1 text-[12px]">
      to:
      {previewSecureMessage?.channels
        ?.map((channel) => channel?.externalEmail)
        .join(', ')}
    </Text>
  )
}

export { ViewMessageToText }
