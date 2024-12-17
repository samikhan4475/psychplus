'use client'

import { getUsStatesOptionsAction } from '@/actions'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'

const StateSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Residence (State)</FormFieldLabel>
      <AsyncSelect
        field="stateId"
        placeholder="Select"
        fetchOptions={getUsStatesOptionsAction}
        buttonClassName="h-6 min-w-[136px]"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { StateSelect }
