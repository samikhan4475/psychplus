import React from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { SchemaType } from './submission-history-filter-form'

const BatchNameInput = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel>Batch Name</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Batch Name"
        className="border-pp-gray-2 h-[var(--chip-height)] w-[102px] border border-solid !outline-none [box-shadow:none]"
        {...form.register('batchName')}
      />
    </FormFieldContainer>
  )
}

export { BatchNameInput }
