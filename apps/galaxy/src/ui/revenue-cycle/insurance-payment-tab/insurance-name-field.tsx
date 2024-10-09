'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { SchemaType } from './insurance-payment-list-filter-form'

const InsuranceNameField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Insurance Name</FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 h-5 w-[130px] border border-solid !outline-none [box-shadow:none]"
        {...form.register('insuranceName')}
        placeholder="John Doe"
      />
    </FormFieldContainer>
  )
}

export { InsuranceNameField }
