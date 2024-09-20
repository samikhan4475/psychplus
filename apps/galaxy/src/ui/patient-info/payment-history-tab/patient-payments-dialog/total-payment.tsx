'use client'

import { Flex, Text } from '@radix-ui/themes'

const TotalPayment = () => {
  return (
    <Flex width="100%" gap="1" my="2">
      <Text size="1" weight="regular">
        Total Payment
      </Text>
      <Text size="1" weight="bold">
        $237.00
      </Text>
    </Flex>
  )
}

export { TotalPayment }
