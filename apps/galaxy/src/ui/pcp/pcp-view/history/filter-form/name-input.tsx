'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { SchemaType } from './filter-form'

const NameInput = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer className="w-48 flex-row gap-1">
      <FormFieldLabel className="!text-1">User</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="User"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('createdBy')}
      />
    </FormFieldContainer>
  )
}

export { NameInput }
