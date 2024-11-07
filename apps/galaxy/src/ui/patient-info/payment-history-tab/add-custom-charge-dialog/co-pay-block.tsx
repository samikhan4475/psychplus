'use client'

import { Flex, Text } from '@radix-ui/themes'
import { FormFieldError } from '@/components'
import { PaymentInput } from './shared'

const CoPayBlock = () => {
  return (
    <Flex direction="column" className="rounded-2">
      <Text className="border-b-2 border-r-2 border-indigo-4 bg-indigo-3  px-1 py-0.5 text-1 font-medium">
        Co-Pay
      </Text>
      <Flex gap="2" className="border-r-2 border-indigo-3 p-1">
        <PaymentInput label="Due PT" field="coPayDue" />
        <PaymentInput label="Due PP" field="coPayPaid" disabled />
        <PaymentInput label="Paid" field="coPayPaid" disabled />
      </Flex>
      <FormFieldError name="coPayDue" />
    </Flex>
  )
}

export { CoPayBlock }
