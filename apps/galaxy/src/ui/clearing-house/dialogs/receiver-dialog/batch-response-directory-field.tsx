'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from './receiver-form'

const BatchResponseDirectoryField = () => {
  const form = useFormContext<SchemaType>()

  const setOtherDirectories = (value: React.ChangeEvent<HTMLInputElement>) => {
    if (form.getValues('isSupportMultipleDirectory') === 'no') {
      const responseDirectory = value.target.value
      const fieldsToUpdate: Array<keyof SchemaType> = [
        'chResponseDirectory',
        'claimResponseDirectory',
        'eraResponseDirectory',
      ]

      fieldsToUpdate.forEach((field) =>
        form.setValue(`${field}`, responseDirectory),
      )
    }
  }

  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Batch Response Directory</FormFieldLabel>
      <TextField.Root
        {...form.register('batchResponseDirectory')}
        className="border-pp-gray-2 h-[var(--chip-height)] w-full border border-solid !outline-none [box-shadow:none]"
        onChange={setOtherDirectories}
      />
      <FormFieldError name="batchResponseDirectory" />
    </FormFieldContainer>
  )
}

export { BatchResponseDirectoryField }
