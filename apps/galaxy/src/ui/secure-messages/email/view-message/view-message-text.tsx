import React from 'react'
import { Text } from '@radix-ui/themes'
import { useStore } from '../../store'

const ViewMessageText = () => {
  const { previewSecureMessage } = useStore((state) => state)
  const text = previewSecureMessage?.secureMessage?.text
  if (!text) return
  return (
    <Text
      className="mb-2 mt-4 whitespace-pre-wrap text-[14px]"
      dangerouslySetInnerHTML={{ __html: text }}
    ></Text>
  )
}

export { ViewMessageText }
