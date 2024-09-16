'use client'

import { Badge, Flex, Text } from '@radix-ui/themes'

const EligibilityResponseStatus = () => {
  return (
    <Flex align="center" gap="2">
      <Text size="1" weight="regular">
        Status
      </Text>
      <Badge color="green" className="!rounded-1">
        Active
      </Badge>
    </Flex>
  )
}

export { EligibilityResponseStatus }
