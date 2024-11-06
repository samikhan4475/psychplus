'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AddPatientSchemaType } from './schema'

const LastNameInput = () => {
  const form = useFormContext<AddPatientSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel className="!text-1" required>
        Last Name
      </FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Last name"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('legalName.lastName')}
      />
      <FormFieldError name="legalName.lastName" />
    </FormFieldContainer>
  )
}

export { LastNameInput }
