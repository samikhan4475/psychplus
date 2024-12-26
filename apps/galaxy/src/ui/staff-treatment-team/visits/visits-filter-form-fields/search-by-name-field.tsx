'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { VisitsSchemaType } from '../visits-filter-form'

const SearchByNameField = () => {
  const form = useFormContext<VisitsSchemaType>()

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Name</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Search by name"
        className="border-pp-gray-2 h-6 w-[205px] border border-solid !outline-none [box-shadow:none]"
        {...form.register('name')}
      />
    </FormFieldContainer>
  )
}

export { SearchByNameField }
