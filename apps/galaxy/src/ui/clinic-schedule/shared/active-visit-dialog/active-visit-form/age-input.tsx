'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  NumericInput,
} from '@/components'

const AgeInput = () => {
  return (
    <FormFieldContainer className="gap-0.5">
      <FormFieldLabel>Age</FormFieldLabel>
      <NumericInput
        field="age"
        allowNegative={false}
        prefix=""
        placeholder="Age"
        maxLimit={999}
        decimalScale={0}
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="age" />
    </FormFieldContainer>
  )
}

export { AgeInput }
