'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { SchemaType } from './organization-users-list-filter-form'

const ZipField = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Zip</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('zip')}
        placeholder='Zip Code'
      />
    </FormFieldContainer>
  )
}

export { ZipField }
