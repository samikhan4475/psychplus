import React from 'react'
import { Text } from '@radix-ui/themes'

const ViewMessagePopoverDate = ({
  emailCreatedOn,
}: {
  emailCreatedOn?: string
}) => {
  return (
    <>
      <Text className="text-pp-gray-3 text-right text-[12px] font-[510]">
        date:
      </Text>
      <Text className="break-words text-[12px] font-[400]">
        {emailCreatedOn}
      </Text>
    </>
  )
}

export { ViewMessagePopoverDate }
