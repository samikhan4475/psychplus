'use client'

import { Flex } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldLabel, NumberInput } from '@/components'
import { UpdateButton } from './update-button'

const AmountInput = () => {
  return (
    <Flex gap="2" align="end" className="flex-1">
      <FormFieldContainer className="flex-column w-auto gap-1">
        <FormFieldLabel className="!text-1">Amount</FormFieldLabel>
        <NumberInput
          field="amount"
          className="border-pp-gray-2 h-6 w-[79.11px] border border-solid !outline-none [box-shadow:none]"
          placeholder="$0.00"
        />
      </FormFieldContainer>
      <UpdateButton />
    </Flex>
  )
}

export { AmountInput }
