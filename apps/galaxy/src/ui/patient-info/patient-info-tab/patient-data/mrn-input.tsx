'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { PatientDataSchema } from './patient-data-schema'

const MrnInput = () => {
  const form = useFormContext<PatientDataSchema>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1">MRN</FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        placeholder="MRN"
        {...form.register('medicalRecordNumber', { disabled: true })}
      />
      <FormFieldError name="medicalRecordNumber" />
    </FormFieldContainer>
  )
}

export { MrnInput }
