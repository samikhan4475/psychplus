'use client'

import { NumericInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const PsyDField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>PsyD</FormFieldLabel>
      <NumericInput
        placeholder="$0.00"
        field="psyDAmount"
        className="border-pp-gray-2 w-100 !h-6 border border-solid outline-none [box-shadow:none]"
        maxLimit={100000}
      />
      <FormFieldError name="psyDAmount" />
    </FormFieldContainer>
  )
}

export { PsyDField }
