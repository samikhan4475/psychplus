'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { PatientTransferSchemaType } from '../pateint-transfer-filter-form'


const CityField = () => {
  const form = useFormContext<PatientTransferSchemaType>()
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">City</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Search"
        className="border-pp-gray-2 h-6 w-[122px] border border-solid !outline-none [box-shadow:none]"
        {...form.register('city')}
      />
    </FormFieldContainer>
  )
}

export { CityField }
