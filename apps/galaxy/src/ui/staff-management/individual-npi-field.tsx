'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { SchemaType } from './staff-filter-form'

const IndividualNpiField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel>Individual NPI</FormFieldLabel>
      <TextField.Root
        size="1"
        maxLength={10}
        className="border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none] "
        {...form.register('npi')}
        placeholder="Search"
      />
    </FormFieldContainer>
  )
}

export { IndividualNpiField }
