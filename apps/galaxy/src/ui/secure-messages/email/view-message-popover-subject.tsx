import React from 'react'
import { Text } from '@radix-ui/themes'

const ViewMessagePopoverSubject = ({ subject }: { subject?: string }) => {
  return (
    <>
      <Text className="text-pp-gray-3 text-right text-[12px] font-[510]">
        subject:{' '}
      </Text>
      <Text className="break-words text-[12px] font-[400]">{subject}</Text>
    </>
  )
}

export { ViewMessagePopoverSubject }
