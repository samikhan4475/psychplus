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

const StateSelect = ({
  loadingStates,
  states,
}: {
  loadingStates: boolean
  states: StateCodeSet[]
}) => {
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
        buttonClassName="h-6 w-full"
        options={options}
        onValueChange={(val) => {
          form.setValue('state', val)
          form.setValue('location', '')
        }}
        disabled={!isServiceTimeDependent}
        loading={loadingStates}
      />
      <FormFieldError name={'state'} />
    </FormFieldContainer>
  )
}

export { StateSelect }
