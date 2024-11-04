'use client'

import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { TextField } from '@radix-ui/themes'
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
        className="bg-white text-gray-200 h-5 w-[130px] border-none outline-none "
        {...form.register('claimNumber')}
        placeholder="Search"
      >
        <TextField.Slot side="right">
          <MagnifyingGlassIcon className="mr-1" height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
    </FormFieldContainer>
  )
}

export { ClaimNumberField }
