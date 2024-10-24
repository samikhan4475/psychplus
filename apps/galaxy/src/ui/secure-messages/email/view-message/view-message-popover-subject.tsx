import React from 'react'
import { Text } from '@radix-ui/themes'
import { useStore } from '../../store'

const ViewMessagePopoverSubject = () => {
  const { previewSecureMessage } = useStore((state) => state)

  return (
    <>
      <Text className="text-pp-gray-3 text-right text-[12px] font-[510]">
        subject:
      </Text>
      <Text className="break-words text-[12px] font-[400]">
        {previewSecureMessage.secureMessage?.subject}
      </Text>
    </>
  )
}

export { ViewMessagePopoverSubject }
