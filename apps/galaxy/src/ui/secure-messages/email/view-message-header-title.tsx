import React from 'react'
import { Text } from '@radix-ui/themes'

const ViewMessageHeaderTitle = ({
  subject,
}: {
  subject: string | undefined
}) => {
  return <Text className="text-[16px] font-[510]">{subject}</Text>
}

export { ViewMessageHeaderTitle }
