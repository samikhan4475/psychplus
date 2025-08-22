'use client'

import { useFormContext } from 'react-hook-form'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { SchemaType } from '../schema'

const DateofServiceField = () => {
  const { watch } = useFormContext<SchemaType>()
  const serviceDate = watch('serviceDate')

  return (
    <FormFieldContainer className="flex-row gap-x-1">
      <FormFieldLabel>Date of Service</FormFieldLabel>
      <DatePickerInput field="serviceDate" value={serviceDate} />
    </FormFieldContainer>
  )
}

export { DateofServiceField }
