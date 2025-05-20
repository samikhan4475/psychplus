'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const PaymentResponsibilitySelect = () => {
  return (
    <FormFieldContainer className="flex-1 gap-[3px]">
      <FormFieldLabel required>Payment Responsibility</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.PaymentResponsibility}
        name="paymentResponsibility"
        size="1"
        className="h-6"
      />
      <FormFieldError name="paymentResponsibility" />
    </FormFieldContainer>
  )
}

export { PaymentResponsibilitySelect }
