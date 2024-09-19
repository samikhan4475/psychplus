'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SchemaType } from '../schema'
import { StateCodeSet } from '../types'

const StateDropdown = ({ states }: { states: StateCodeSet[] }) => {
  const form = useFormContext<SchemaType>()
  const patient = form.watch('patient')

  const options = states.map((v) => ({
    label: v.stateName,
    value: v.stateCode,
  }))

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>State</FormFieldLabel>
      <SelectInput
        field="state"
        options={options}
        buttonClassName="flex-1"
        disabled={!patient}
      />
      <FormFieldError name={'state'} />
    </FormFieldContainer>
  )
}

export { StateDropdown }
