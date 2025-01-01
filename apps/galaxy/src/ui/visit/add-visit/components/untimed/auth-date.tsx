'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import { DatePickerInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from '../../schema'

const AuthDate = () => {
  const form = useFormContext<SchemaType>()
  const [patient, state, service, location] = useWatch({
    control: form.control,
    name: ['patient', 'state', 'service', 'location'],
  })
  const isDisabled = !patient || !state || !service || !location

  return (
    <FormFieldContainer className="flex-1 gap-[2px]">
      <FormFieldLabel>Auth Date</FormFieldLabel>
      <DatePickerInput
        field="authDate"
        isDisabled={isDisabled}
        dateInputClass="h-6 w-full"
      />
      <FormFieldError name="authDate" />
    </FormFieldContainer>
  )
}

export { AuthDate }
