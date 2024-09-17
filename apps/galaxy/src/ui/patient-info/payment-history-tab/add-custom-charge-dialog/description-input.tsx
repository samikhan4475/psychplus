'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'

const DescriptionInput = () => {
  const form = useFormContext()
  return (
    <FormFieldContainer className="flex-column w-auto gap-1">
      <FormFieldLabel className="!text-1">Description</FormFieldLabel>
      <TextField.Root
        placeholder="Add description..."
        size="1"
        {...form.register('description')}
        className="border-pp-gray-2 h-7 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { DescriptionInput }
