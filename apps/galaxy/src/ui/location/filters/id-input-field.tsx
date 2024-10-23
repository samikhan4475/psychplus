'use client'

import { TextField } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldError, FormFieldLabel } from '@/components/form'
import { useFormContext } from 'react-hook-form'
import { FormSchemaType } from '../form-schema'

const IdInputField = () => {
  const form = useFormContext<FormSchemaType>()

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>ID</FormFieldLabel>
      <TextField.Root size="1" placeholder="Add ID" {...form.register('locationId')} />
      <FormFieldError name="locationId" />
    </FormFieldContainer>
  )
}

export { IdInputField }