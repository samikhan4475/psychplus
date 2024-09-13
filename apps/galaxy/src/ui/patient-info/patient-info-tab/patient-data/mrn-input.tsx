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
        className={textFieldClassName}
        placeholder="MRN"
        {...form.register('medicalRecordNumber')}
      />
      <FormFieldError name="medicalRecordNumber" />
    </FormFieldContainer>
  )
}
const textFieldClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { MrnInput }
