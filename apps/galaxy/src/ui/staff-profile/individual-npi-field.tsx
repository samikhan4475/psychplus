import React from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { SchemaType } from './schema'
import { StaffType } from '../staff-management/types'

const IndividualNpiField = () => {
  const form = useFormContext<SchemaType>()
  const staffTypeLabel = form.watch('staffTypeLabel')
  return (
    <FormFieldContainer>
      <FormFieldLabel required={staffTypeLabel === StaffType.Provider}>Individual NPI</FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none] "
        {...form.register('npi')}
        placeholder="Add NPI"
        maxLength={10}
      />
      <FormFieldError name="npi" />
    </FormFieldContainer>
  )
}

export { IndividualNpiField }
