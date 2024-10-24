import React from 'react'
import { Text } from '@radix-ui/themes'
import { useStore } from '../../store'

const ViewMessageHeaderTitle = () => {
  const { previewSecureMessage } = useStore((state) => state)
  return (
    <Text className="text-[16px] font-[510]">
      {previewSecureMessage?.secureMessage?.subject}
    </Text>
  )
}

export { ViewMessageHeaderTitle }
