import React from 'react'
import { Text } from '@radix-ui/themes'

const ViewMessagePopoverFrom = ({
  externalEmailAddress,
}: {
  externalEmailAddress?: string
}) => {
  return (
    <>
      <Text className="text-pp-gray-3 text-right text-[12px] font-[510]">
        from:
      </Text>
      <Text className="bg-white break-words text-[12px] font-[400]">
        {`<${externalEmailAddress}>`}
      </Text>
    </>
  )
}

export { ViewMessagePopoverFrom }
