'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AddPatientSchemaType } from './schema'

const DOBDatePicker = () => {
  const form = useFormContext<AddPatientSchemaType>()
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        DOB
      </FormFieldLabel>
      <TextField.Root
        type="date"
        size="1"
        data-testid="dateOfBirth"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none] [&__.rt-TextFieldInput]:!inline-block"
        {...form.register('dateOfBirth')}
      />
      <FormFieldError name="dateOfBirth" />
    </FormFieldContainer>
  )
}

export { DOBDatePicker }
