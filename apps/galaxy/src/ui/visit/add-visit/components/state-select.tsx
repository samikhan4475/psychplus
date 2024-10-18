'use client'

import { useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { StateCodeSet } from '../../types'
import { SchemaType } from '../schema'
import { StateChangeAlert } from './state-change-alert'

const StateDropdown = ({ states }: { states: StateCodeSet[] }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const form = useFormContext<SchemaType>()
  const patient = useWatch({
    control: form.control,
    name: 'patient',
  })
  const options = states.map((v) => ({
    label: v.stateName,
    value: v.stateCode,
  }))
  return (
    <>
      <StateChangeAlert
        isOpen={isOpen}
        onConfirm={(isConfirmed: boolean) => {
          if (!isConfirmed) form.setValue('state', patient.state)
          setIsOpen(false)
        }}
      />
      <FormFieldContainer className="flex-1">
        <FormFieldLabel required>State</FormFieldLabel>
        <SelectInput
          field="state"
          options={options}
          buttonClassName="h-6 w-full"
          disabled={!patient}
          onValueChange={(newValue) => {
            form.setValue('state', newValue)
            setIsOpen(true)
          }}
        />
        <FormFieldError name={'state'} />
      </FormFieldContainer>
    </>
  )
}

export { StateDropdown }
