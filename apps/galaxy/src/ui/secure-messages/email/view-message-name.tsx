import React from 'react'
import { Text } from '@radix-ui/themes'

const ViewMessageCreatedByFullName = ({
  createdByFullName,
}: {
  createdByFullName?: string
}) => {
  return (
    <Text size="1" className="mr-1 text-[14px]">
      {createdByFullName}
    </Text>
  )
}
export { ViewMessageCreatedByFullName }
