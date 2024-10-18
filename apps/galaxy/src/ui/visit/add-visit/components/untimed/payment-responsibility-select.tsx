'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const PaymentResponsibilitySelect = () => {
  return (
    <FormFieldContainer className="flex-1 gap-[3px]">
      <FormFieldLabel>Payment Responsibility</FormFieldLabel>
      <CodesetSelect
        name="paymentResponsibility"
        size="1"
        codeset={CODESETS.PaymentResponsibility}
        className='h-6'
      />
    </FormFieldContainer>
  )
}

export { PaymentResponsibilitySelect }
