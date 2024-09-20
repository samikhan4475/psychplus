'use client'

import { Flex, Text } from '@radix-ui/themes'

const PaymentTotal = () => {
  return (
    <Flex
      align="center"
      className="rounded-2 bg-gray-2 px-2 py-0.5"
      justify="between"
    >
      <Text size="2" weight="medium">
        Payment Total
      </Text>
      <Text size="1">$0.00</Text>
    </Flex>
  )
}

export { PaymentTotal }
