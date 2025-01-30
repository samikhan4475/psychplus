'use client'

import { Flex, Text } from '@radix-ui/themes'
import { FormFieldError } from '@/components'
import { PaymentInput } from './shared'

const BalanceBlock = () => {
  return (
    <Flex direction="column" className="rounded-2">
      <Flex
        gap="1"
        className="border-b-2 border-indigo-4 bg-indigo-3 px-1 py-0.5"
        align="center"
      >
        <Text size="1" weight="medium">
          Balance
        </Text>
        <FormFieldError name="balanceDue" className="text-[10px] font-bold" />
      </Flex>
      <Flex gap="2" className="p-1">
        <PaymentInput label="Due PT" field="balanceDue" />
        <PaymentInput label="Due PP" field="balancePreferredPartner" disabled />
        <PaymentInput label="Paid" field="balancePaid" />
      </Flex>
    </Flex>
  )
}

export { BalanceBlock }
