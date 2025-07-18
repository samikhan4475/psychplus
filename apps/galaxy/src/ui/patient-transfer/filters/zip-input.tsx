'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { PatientTransferSchemaType } from '../pateint-transfer-filter-form'


const ZipInput = () => {
  const form = useFormContext<PatientTransferSchemaType>()

  return (
      <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel>Zip</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Enter Postal Code"
        className="border-pp-gray-2 h-6 w-[122px] border border-solid !outline-none [box-shadow:none]"
        {...form.register('zip')}
      />
      <FormFieldError name="zip" />
    </FormFieldContainer>
  )
}

export { ZipInput }
