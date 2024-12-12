'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { SchemaType } from './organization-practices-list-filter-form'

const FaxField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Fax</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('fax')}
      />
    </FormFieldContainer>
  )
}

export { FaxField }
