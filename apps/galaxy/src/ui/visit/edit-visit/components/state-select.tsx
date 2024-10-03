'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { StateCodeSet } from '../../types'
import { SchemaType } from '../schema'

const StateSelect = ({ states }: { states: StateCodeSet[] }) => {
  const form = useFormContext<SchemaType>()
  const options = states.map((v) => ({
    label: v.stateName,
    value: v.stateCode,
  }))
  const isServiceTimeDependent = useWatch({
    control: form.control,
    name: 'isServiceTimeDependent',
  })
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>State</FormFieldLabel>
      <SelectInput
        field="state"
        buttonClassName="flex-1 w-full"
        options={options}
        disabled={!isServiceTimeDependent}
      />
      <FormFieldError name={'state'} />
    </FormFieldContainer>
  )
}

export { StateSelect }
