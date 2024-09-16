'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'

const NameInput = () => {
  const form = useFormContext()
  return (
    <FormFieldContainer className="w-48 flex-row gap-1">
      <FormFieldLabel className="!text-1">Name</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Search by name"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('name')}
      />
    </FormFieldContainer>
  )
}

export { NameInput }
