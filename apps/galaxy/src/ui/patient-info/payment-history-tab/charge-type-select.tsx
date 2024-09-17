'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const ChargeTypeSelect = () => {
  return (
    <FormFieldContainer className="flex flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Charge Type</FormFieldLabel>
      <CodesetSelect
        name="TransactionType"
        placeholder="Select Type"
        codeset={CODESETS.TransactionType}
        size="1"
        className="h-7 w-[121px] text-1"
      />
    </FormFieldContainer>
  )
}

export { ChargeTypeSelect }
