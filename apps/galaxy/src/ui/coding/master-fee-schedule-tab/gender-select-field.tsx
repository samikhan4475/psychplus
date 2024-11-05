import React from 'react'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const GenderSelectField = () => {
  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel>Gender</FormFieldLabel>
      <CodesetSelect
        name="gender"
        codeset={CODESETS.Gender}
        size="1"
        className="w-[101px]"
      />
    </FormFieldContainer>
  )
}

export { GenderSelectField }
