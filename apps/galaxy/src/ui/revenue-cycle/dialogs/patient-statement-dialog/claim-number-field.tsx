'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { SchemaType } from './patient-statement-filter-form'

const ClaimNumberField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Claim #</FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 h-5 border border-solid !outline-none [box-shadow:none]"
        {...form.register('claimNumber')}
        placeholder="123455"
      />
    </FormFieldContainer>
  )
}

export { ClaimNumberField }
