'use client'

import { useFormContext } from 'react-hook-form'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { SchemaType } from './schema'

const ServiceDateSelect = () => {
  const { watch } = useFormContext<SchemaType>()
  const serviceDate = watch('serviceDate')

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Service Date</FormFieldLabel>
      <DatePickerInput field="serviceDate" value={serviceDate} />
    </FormFieldContainer>
  )
}

export { ServiceDateSelect }
