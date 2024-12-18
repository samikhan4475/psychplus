'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { SchemaType } from './organization-staff-list-filter-form'

const IndividualNPIField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="ml-2 !text-1">Individual NPI</FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 h-6 w-[130px] border border-solid !outline-none [box-shadow:none]"
        {...form.register('individualNpi')}
        placeholder="Search"
      />
    </FormFieldContainer>
  )
}

export { IndividualNPIField }
