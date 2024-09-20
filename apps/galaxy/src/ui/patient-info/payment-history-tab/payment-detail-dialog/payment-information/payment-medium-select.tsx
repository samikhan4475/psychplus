'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

const PaymentMediumSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel className="!text-1 !font-medium">
        Payment Medium
      </FormFieldLabel>
      <SelectInput
        size="1"
        placeholder="Select Type"
        field="paymentMedium"
        buttonClassName="border-pp-gray-2 w-[115px] h-6 border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { PaymentMediumSelect }
