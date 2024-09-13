'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { PatientDataSchema } from './patient-data-schema'

const SsnInput = () => {
  const form = useFormContext<PatientDataSchema>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1">SSN</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="SNN"
        {...form.register('socialSecurityNumber')}
        className={textFieldClassName}
      />
      <FormFieldError name="socialSecurityNumber" />
    </FormFieldContainer>
  )
}
const textFieldClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { SsnInput }
