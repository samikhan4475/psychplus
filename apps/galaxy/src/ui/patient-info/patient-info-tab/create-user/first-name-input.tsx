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
      <FormFieldLabel className="!text-1" required>
        First Name
      </FormFieldLabel>
      <TextField.Root
        size="1"
        className="textFieldClassName"
        placeholder="First Name"
        {...form.register('legalName.firstName')}
      />
      <FormFieldError name="legalName.firstName" />
    </FormFieldContainer>
  )
}

export { FirstNameInput }
