'use client'

import { TextField } from '@radix-ui/themes'
import { Search } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { SchemaType } from './claim-list-filter-form'

const ClaimNumberField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="relative flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Claim #</FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 h-5 w-[130px] border border-solid !outline-none [box-shadow:none]"
        {...form.register('claimNumber')}
        placeholder="Search"
      />
      <Search className="absolute bottom-1 right-1 text-gray-8" size="16" />
    </FormFieldContainer>
  )
}

export { ClaimNumberField }
