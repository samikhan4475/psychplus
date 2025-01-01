'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const PaymentResponsibilitySelect = ({
  isPsychiatristVisitTypeSequence,
}: {
  isPsychiatristVisitTypeSequence?: boolean
}) => {
  return (
    <FormFieldContainer className="flex-1 gap-[3px]">
      <FormFieldLabel>Payment Responsibility</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.PaymentResponsibility}
        disabled={isPsychiatristVisitTypeSequence}
        name="paymentResponsibility"
        size="1"
      />
    </FormFieldContainer>
  )
}

export { PaymentResponsibilitySelect }
