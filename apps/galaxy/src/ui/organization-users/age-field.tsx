'use client'

import { NumberInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const AgeField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Age</FormFieldLabel>
      <NumberInput
        format="###"
        field="age"
        className="w-[73px] h-6"
        placeholder='Age'
      />
    </FormFieldContainer>
  )
}

export { AgeField }
