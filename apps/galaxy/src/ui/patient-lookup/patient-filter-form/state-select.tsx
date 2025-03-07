'use client'

import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const StateSelect = () => {
  const options = useCodesetOptions(CODESETS.UsStates)
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Residence (State)</FormFieldLabel>
      <DropdownSelect
        field="stateCode"
        options={options}
        buttonClassName="flex-1"
      />
    </FormFieldContainer>
  )
}

export { StateSelect }
