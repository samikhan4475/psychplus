'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

const PaymentMethodSelect = () => {
  return (
    <FormFieldContainer className="w-full flex-row gap-1">
      <FormFieldLabel className="whitespace-nowrap !text-1">
        Payment Method
      </FormFieldLabel>
      <SelectInput
        field="paymentMethod"
        buttonClassName="border-pp-gray-2 h-6 w-[125px] border border-solid !outline-none [box-shadow:none]"
        options={options}
      />
    </FormFieldContainer>
  )
}

const options = [
  {
    label: 'Test',
    value: 'test',
  },
  {
    label: 'Test 2',
    value: 'test 2',
  },
]
export { PaymentMethodSelect }
