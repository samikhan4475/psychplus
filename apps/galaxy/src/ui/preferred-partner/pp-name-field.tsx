'use client'

import { TextField } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './preferred-partner-filter-form'

const PPNameField = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">PP Name</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('name')}
        placeholder="Search by name"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { PPNameField }
