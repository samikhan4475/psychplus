'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { FilterSchemaType } from './filter-form'

const CitySelect = () => {
  const form = useFormContext<FilterSchemaType>()
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">City</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Search By City"
        className="border-pp-gray-2 h-6 w-[122px] border border-solid !outline-none [box-shadow:none]"
        {...form.register('pharmacyCity')}
      />
    </FormFieldContainer>
  )
}

export { CitySelect }
