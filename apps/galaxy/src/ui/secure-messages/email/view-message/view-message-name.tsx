import React from 'react'
import { Text } from '@radix-ui/themes'
import { useStore } from '../../store'

const ViewMessageCreatedByFullName = () => {
  const { previewSecureMessage } = useStore((state) => state)
  const senderName = previewSecureMessage.secureMessage?.senderName

  if (!senderName) {
    return null
  }

  const createdByFullName = `${senderName.firstName} ${senderName.lastName}`

  return (
    <Text size="1" className="mr-1 text-[14px]">
      {createdByFullName || 'N/A'}
    </Text>
  )
}

export { ViewMessageCreatedByFullName }
