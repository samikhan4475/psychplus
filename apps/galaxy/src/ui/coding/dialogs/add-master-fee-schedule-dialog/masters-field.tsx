'use client'

import { NumericInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const MastersField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Masters</FormFieldLabel>
      <NumericInput
        placeholder="$0.00"
        field="mastersAmount"
        className="border-pp-gray-2 w-100 !h-6 border border-solid outline-none [box-shadow:none]"
        maxLimit={100000}
      />
      <FormFieldError name="mastersAmount" />
    </FormFieldContainer>
  )
}

export { MastersField }
