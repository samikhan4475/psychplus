'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { VisitsSchemaType } from '../visits-filter-form'

const SearchByMRNField = () => {
  const form = useFormContext<VisitsSchemaType>()

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>MRN</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Search by MRN"
        className="border-pp-gray-2 h-6 w-[200px] border border-solid !outline-none [box-shadow:none]"
        {...form.register('patientIds')}
      />
    </FormFieldContainer>
  )
}

export { SearchByMRNField }
