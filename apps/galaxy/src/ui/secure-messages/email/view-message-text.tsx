import React from 'react'
import { Text } from '@radix-ui/themes'

const ViewMessageText = ({ text }: { text?: string }) => {
  return <Text className="mb-2  whitespace-pre-wrap text-[14px]">{text}</Text>
}

export { ViewMessageText }
