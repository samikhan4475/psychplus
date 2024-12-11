import React from 'react'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getUsStatesOptionsAction } from './actions'

const StateSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>State</FormFieldLabel>
      <AsyncSelect
        field="stateName"
        placeholder="Select"
        size="1"
        fetchOptions={getUsStatesOptionsAction}
        buttonClassName="w-[130px]"
      />
    </FormFieldContainer>
  )
}

export { StateSelect }
