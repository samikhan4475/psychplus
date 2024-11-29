'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { FilterSchemaType } from './filter-form'

interface AddressProps {
  label: string 
  fieldName: keyof FilterSchemaType
}

const Address = ({ label, fieldName }: AddressProps) => {
  const form = useFormContext<FilterSchemaType>()

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">{label}</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Search"
        className="border-pp-gray-2 h-6 w-[230px] border border-solid !outline-none [box-shadow:none]"
        {...form.register(fieldName)}
      />
    </FormFieldContainer>
  )
}

export { Address }
