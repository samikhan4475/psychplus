'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from '../schema'

const PatientPhoneText = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer className="flex-1 gap-[3px]">
      <FormFieldLabel required>Phone</FormFieldLabel>
      <TextField.Root
        size="1"
        value={form.watch('patient.phone')}
        disabled
        className="h-6 w-full"
      />
      <FormFieldError name="patient.phone" />
    </FormFieldContainer>
  )
}

export { PatientPhoneText }
