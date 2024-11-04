'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const PaymentMethodSelect = () => {
  return (
    <FormFieldContainer className="w-full flex-row gap-1">
      <FormFieldLabel className="whitespace-nowrap !text-1">
        Payment Method
      </FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.PaymentMethod}
        name="paymentMethod"
        size="1"
        className="border-pp-gray-2 h-6 w-[125px] border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { PaymentMethodSelect }
