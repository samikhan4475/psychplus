import React from 'react'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const StateSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Select State</FormFieldLabel>
      <CodesetSelect
        className=" w-[130px]"
        size="1"
        name="state"
        codeset={CODESETS.UsStates}
      />
    </FormFieldContainer>
  )
}

export { StateSelect }
