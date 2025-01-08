'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { SchemaType } from './virtual-addresses-list-filter-form'

const NPIField = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Def. Provider NPI</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('npi')}
      />
    </FormFieldContainer>
  )
}

export { NPIField }
