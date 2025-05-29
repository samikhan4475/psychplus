'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { SchemaType } from './preferred-partner-filter-form'

const IndividualField = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Individual #</FormFieldLabel>
      <TextField.Root
        size="1"
        type="text"
        placeholder="..."
        {...form.register('individualRate')}
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { IndividualField }
