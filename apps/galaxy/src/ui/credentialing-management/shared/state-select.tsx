import React from 'react'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const StateSelect = () => {
  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel>State</FormFieldLabel>
      <CodesetSelect
        name="state"
        codeset={CODESETS.UsStates}
        size="1"
        className="w-[101px]"
      />
    </FormFieldContainer>
  )
}

export { StateSelect }
