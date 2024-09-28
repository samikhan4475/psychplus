'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { StateCodeSet } from '../../types'

const StateSelect = ({ states }: { states: StateCodeSet[] }) => {
  const options = states.map((v) => ({
    label: v.stateName,
    value: v.stateCode,
  }))

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>State</FormFieldLabel>
      <SelectInput
        field="state"
        buttonClassName="flex-1 w-full"
        options={options}
      />
      <FormFieldError name={'state'} />
    </FormFieldContainer>
  )
}

export { StateSelect }
