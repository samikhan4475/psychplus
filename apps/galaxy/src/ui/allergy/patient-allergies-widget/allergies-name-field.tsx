'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { SchemaType } from './patient-allergies-filter-form'

const AllergiesNameField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Name</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Search by name"
        className="border-pp-gray-2 h-6 w-[122px] border border-solid !outline-none [box-shadow:none]"
        {...form.register('allergyName')}
      />
    </FormFieldContainer>
  )
}

export { AllergiesNameField }
