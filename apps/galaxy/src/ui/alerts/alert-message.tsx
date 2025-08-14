import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { TriangleAlert } from 'lucide-react'

interface AlertMessageParams {
  message: string
}
const AlertMessage = ({ message }: AlertMessageParams) => {
  return (
    <Flex className=" border-pp-warning-border bg-pp-warning-bg-1 gap-4 rounded-1 border  px-3 py-2">
      <TriangleAlert className="min-w-6 min-h-6 text-pp-warning-border" />
      <Text size="2" weight="medium">
        {message}
      </Text>
    </Flex>
  )
}

export { AlertMessage }
