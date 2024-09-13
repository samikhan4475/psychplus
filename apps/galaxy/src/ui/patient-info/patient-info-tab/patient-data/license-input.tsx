'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { PatientDataSchema } from './patient-data-schema'

const LicenseInput = () => {
  const form = useFormContext<PatientDataSchema>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1" required>
        Driving License
      </FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Driving License"
        className={textFieldClassName}
        {...form.register('driversLicense.number')}
      />
      <FormFieldError name="driversLicense.number" />
    </FormFieldContainer>
  )
}
const textFieldClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { LicenseInput }
