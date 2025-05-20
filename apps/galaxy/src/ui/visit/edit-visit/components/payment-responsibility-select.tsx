'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const PaymentResponsibilitySelect = ({
  isPsychiatristVisitTypeSequence,
}: {
  isPsychiatristVisitTypeSequence?: boolean
}) => {
  return (
    <FormFieldContainer className="flex-1 gap-[3px]">
      <FormFieldLabel required>Payment Responsibility</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.PaymentResponsibility}
        disabled={isPsychiatristVisitTypeSequence}
        name="paymentResponsibility"
        size="1"
      />
      <FormFieldError name="paymentResponsibility" />
    </FormFieldContainer>
  )
}

export { PaymentResponsibilitySelect }
