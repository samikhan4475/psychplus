'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from '../schema'

const MiddleNameInput = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Middle Name</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('legalName.middleName')}
        placeholder="Enter Middle Name"
      />
      <FormFieldError name="legalName.middleName" />
    </FormFieldContainer>
  )
}

export { MiddleNameInput }
