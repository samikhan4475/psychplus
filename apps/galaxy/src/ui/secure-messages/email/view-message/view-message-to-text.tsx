import React from 'react'
import { Text } from '@radix-ui/themes'
import { useStore } from '../../store'

const ViewMessageToText = () => {
  const { previewSecureMessage } = useStore((state) => state)

  return (
    <Text className="text-pp-gray-1 text-[12px]">
      to:
      {previewSecureMessage.secureMessage?.channels
        ?.map((channel) => channel?.externalEmail || channel?.receiverEmail)
        .join(', ')}
    </Text>
  )
}

export { ViewMessageToText }
