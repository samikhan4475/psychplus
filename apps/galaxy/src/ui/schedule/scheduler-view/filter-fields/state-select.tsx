'use client'

import { getUsStatesOptionsAction } from '@/actions'
import { AsyncSelect, FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../../shared'

const StateSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="text-[12px]">State</FormFieldLabel>
      <AsyncSelect
        field="stateId"
        placeholder="Select"
        fetchOptions={getUsStatesOptionsAction}
        buttonClassName="h-6 w-full"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { StateSelect }
