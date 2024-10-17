'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const PaymentMethodSelect = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Payment Method</FormFieldLabel>
      <CodesetSelect
        name="paymentMethod"
        codeset={CODESETS.PaymentMethod}
        size="1"
        className="h-[26px] w-full"
        required
      />
    </FormFieldContainer>
  )
}

export { PaymentMethodSelect }
