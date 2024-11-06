'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AddPatientSchemaType } from './schema'

const FirstNameInput = () => {
  const form = useFormContext<AddPatientSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel className="!text-1" required>
        First Name
      </FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="First name"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('legalName.firstName')}
      />
      <FormFieldError name="legalName.firstName" />
    </FormFieldContainer>
  )
}

export { FirstNameInput }
