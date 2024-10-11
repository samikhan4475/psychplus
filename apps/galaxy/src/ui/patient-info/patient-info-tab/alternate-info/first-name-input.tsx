'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { PatientInfoSchemaType } from '../patient-info-schema'

const FirstNameInput = () => {
  const form = useFormContext<PatientInfoSchemaType>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1">First Name</FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        placeholder="First Name"
        {...form.register('alternateOrPreviousName.firstName')}
      />
      <FormFieldError name="alternateOrPreviousName.firstName" />
    </FormFieldContainer>
  )
}

export { FirstNameInput }
