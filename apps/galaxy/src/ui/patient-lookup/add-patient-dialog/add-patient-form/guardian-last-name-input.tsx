'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AddPatientSchemaType } from './schema'

const GuardianLastNameInput = () => {
  const form = useFormContext<AddPatientSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel className="!text-1">Guardian Last Name</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Guardian last name"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('guardian.name.lastName')}
      />
      <FormFieldError name="guardian.name.lastName" />
    </FormFieldContainer>
  )
}

export { GuardianLastNameInput }
