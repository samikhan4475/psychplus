'use client'

import { NumericInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const PaField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>PA</FormFieldLabel>

      <NumericInput
        placeholder="$0.00"
        field="paAmount"
        className="border-pp-gray-2 w-100 !h-6 border border-solid outline-none [box-shadow:none]"
        maxLimit={100000}
      />
      <FormFieldError name="paAmount" />
    </FormFieldContainer>
  )
}

export { PaField }
