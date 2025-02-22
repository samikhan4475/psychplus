'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { ServiceFiltersSchemaType } from './schema'

const LocationIdInput = () => {
  const form = useFormContext<ServiceFiltersSchemaType>()
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>ID</FormFieldLabel>
      <TextField.Root size="1" placeholder="Add ID" {...form.register('id')} />
    </FormFieldContainer>
  )
}

export { LocationIdInput }
