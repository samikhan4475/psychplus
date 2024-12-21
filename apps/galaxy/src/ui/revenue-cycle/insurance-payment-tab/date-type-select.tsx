'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const DateTypeSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Select Date</FormFieldLabel>
      <CodesetSelect
        name="dateType"
        codeset={CODESETS.PaymentDateType}
        size="1"
        className="w-[101px]"
      />
    </FormFieldContainer>
  )
}

export { DateTypeSelect }
