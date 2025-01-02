'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { SchemaType } from './lab-orders-filter-form'

const CptCodeField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>CPT Code</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Search by CPT Code"
        className="border-pp-gray-2 h-6 w-[150px] border border-solid !outline-none [box-shadow:none]"
        {...form.register('labTestCode')}
      />
    </FormFieldContainer>
  )
}

export { CptCodeField }
