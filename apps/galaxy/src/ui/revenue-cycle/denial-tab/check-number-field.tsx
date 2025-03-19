'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { SchemaType } from './denial-filter-form'

const CheckNumberField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Check Number</FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 h-5 w-[130px] border border-solid !outline-none [box-shadow:none]"
        {...form.register('checkNumber')}
        placeholder="213344"
      />
    </FormFieldContainer>
  )
}

export { CheckNumberField }
