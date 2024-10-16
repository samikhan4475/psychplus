'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const PaymentResponsibilitySelect = () => {
  return (
    <FormFieldContainer className="flex-1 gap-[3px]">
      <FormFieldLabel>Payment Responsibility</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.PaymentResponsibility}
        name="paymentResponsibility"
        size="1"
      />
    </FormFieldContainer>
  )
}

export { PaymentResponsibilitySelect }
