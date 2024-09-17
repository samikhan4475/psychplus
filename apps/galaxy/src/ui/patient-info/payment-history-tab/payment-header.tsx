'use client'

import { Flex, Text } from '@radix-ui/themes'

const PaymentHeader = () => {
  return (
    <Flex gap="9" className="bg-pp-table-subRows px-2 py-1">
      <Flex gap="1" align="center">
        <Text size="1">Total Due</Text>
        <Text size="2" weight="bold">
          $175.00
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <Text size="1">Remaining Due (Balance)</Text>
        <Text size="2" weight="bold">
          $0.00
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <Text size="1">Unapplied Payment</Text>
        <Text size="2" weight="bold">
          $237.00
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <Text size="1">Total Payment</Text>
        <Text size="2" weight="bold">
          $237.00
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <Text size="1">Bundled Amount</Text>
        <Text size="2" weight="bold">
          $100.00
        </Text>
      </Flex>
    </Flex>
  )
}

export { PaymentHeader }
