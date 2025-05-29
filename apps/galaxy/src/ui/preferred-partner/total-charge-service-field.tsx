'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { SchemaType } from './preferred-partner-filter-form'

const TotalChargeServiceField = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Total Charge Service</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('serviceChargeAmount')}
        placeholder="$120"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { TotalChargeServiceField }
