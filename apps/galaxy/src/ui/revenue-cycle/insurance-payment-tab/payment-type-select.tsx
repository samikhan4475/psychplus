'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const PaymentTypeSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Payment Type</FormFieldLabel>
      <CodesetSelect
        name="paymentType"
        codeset={CODESETS.PaymentSourceType}
        size="1"
        className="w-[101px]"
      />
    </FormFieldContainer>
  )
}

export { PaymentTypeSelect }
