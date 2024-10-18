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
  const legal = useWatch({
    control: form.control,
    name: 'legal',
  })

  return (
    <FormFieldContainer className="flex-1 gap-[2px]">
      <FormFieldLabel required>Auth Date</FormFieldLabel>
      <DatePickerInput
        field="authDate"
        isDisabled={!legal}
        dateInputClass="h-6 w-full"
      />
      <FormFieldError name="authDate" />
    </FormFieldContainer>
  )
}

export { AuthDate }
