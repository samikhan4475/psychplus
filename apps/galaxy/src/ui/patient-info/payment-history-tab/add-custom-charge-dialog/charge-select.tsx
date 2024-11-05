'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const ChargeSelect = () => {
  return (
    <FormFieldContainer className="flex-column w-auto gap-1">
      <FormFieldLabel className="!text-1" required>
        Charge
      </FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.TransactionType}
        size="1"
        name="type"
        className="h-7"
      />
      <FormFieldError name="type" />
    </FormFieldContainer>
  )
}

export { ChargeSelect }
