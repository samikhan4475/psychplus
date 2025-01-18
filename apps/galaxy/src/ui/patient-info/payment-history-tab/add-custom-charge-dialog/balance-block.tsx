'use client'

import { Flex, Text } from '@radix-ui/themes'
import { PaymentInput } from './shared'

const BalanceBlock = () => {
  return (
    <Flex direction="column" className="rounded-2">
      <Text className="border-b-2  border-indigo-4 bg-indigo-3  px-1 py-0.5 text-1 font-medium">
        Balance
      </Text>
      <Flex gap="2" className=" p-1">
        <PaymentInput label="Due PT" field="balanceDue" />
        <PaymentInput label="Due PP" field="balancePreferredPartner" disabled />
        <PaymentInput label="Paid" field="balancePaid" disabled />
      </Flex>
    </Flex>
  )
}

export { BalanceBlock }
