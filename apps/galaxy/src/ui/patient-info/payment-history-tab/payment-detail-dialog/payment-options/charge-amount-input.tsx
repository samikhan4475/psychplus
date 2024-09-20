'use client'

import { Text } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldLabel, NumberInput } from '@/components'

const ChargeAmountInput = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel className="flex items-center !text-1 !font-medium">
        Charge amount <Text color="gray">(Minimum is $10)</Text>
      </FormFieldLabel>
      <NumberInput
        field="chargeAmount"
        placeholder="$0.00"
        className="border-pp-gray-2 h-7 w-[210px] border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { ChargeAmountInput }
