import React from 'react'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './submission-filter-form'
import { TextField } from '@radix-ui/themes'
const ClaimNumberInput = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer className="flex-row items-center w-auto gap-1">
      <FormFieldLabel>
        Claim #
      </FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder='123456'
        className='h-[var(--chip-height)] border-pp-gray-2 border border-solid !outline-none w-[102px] [box-shadow:none]'
        {...form.register("claimNumber")} />
    </FormFieldContainer>
  )
}
export { ClaimNumberInput }
