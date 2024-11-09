'use client'

import { FormFieldContainer, FormFieldLabel, NumberInput } from '@/components'

interface DuePtInputProps {
  field: string
}
const DuePtInput = ({ field }: DuePtInputProps) => {
  return (
    <FormFieldContainer className="w-auto">
      <FormFieldLabel className="!text1 !font-medium">Due PT</FormFieldLabel>
      <NumberInput
        field={field}
        placeholder="$0.00"
        className="border-pp-gray-2 h-7 border border-solid outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { DuePtInput }
