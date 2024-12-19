'use client'

import { NumericInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const MdDoField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>MD/DO</FormFieldLabel>
      <NumericInput
        placeholder="$0.00"
        field="mdDoAmount"
        className="border-pp-gray-2 w-[198px] !h-6 border border-solid outline-none [box-shadow:none]"
        maxLimit={100000}
      />
      <FormFieldError name="mdDoAmount" />
    </FormFieldContainer>
  )
}

export { MdDoField }
