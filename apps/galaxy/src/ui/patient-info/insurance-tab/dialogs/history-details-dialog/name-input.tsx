'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { SchemaType } from './filter-form'

const NameInput = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer className="w-48 flex-row gap-1">
      <FormFieldLabel className="!text-1">Name</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Search by name"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('username', {
          onChange: (event) => {
            form.setValue('username', event?.target?.value, {
              shouldDirty: true,
              shouldValidate: true,
            })
          },
        })}
      />
    </FormFieldContainer>
  )
}

export { NameInput }
