'use client'

import { NumericInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const NpField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>NP</FormFieldLabel>
      <NumericInput
        placeholder="$0.00"
        field="npAmount"
        className="border-pp-gray-2 w-100 !h-6 border border-solid outline-none [box-shadow:none]"
        maxLimit={100000}
      />
      <FormFieldError name="npAmount" />
    </FormFieldContainer>
  )
}

export { NpField }
