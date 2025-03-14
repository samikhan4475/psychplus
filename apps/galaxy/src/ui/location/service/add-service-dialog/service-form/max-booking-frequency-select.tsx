'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  NumericInput,
} from '@/components'
import { isMaxBookingFrequencyDisabled } from '../../utils'
import { ServiceSchemaType } from './schema'

const MaxBookingFrequencySelect = () => {
  const form = useFormContext<ServiceSchemaType>()
  const service = form.watch('serviceOffered')

  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel required>Max Booking Frequency</FormFieldLabel>
      <NumericInput
        field="maxBookingFrequencyInSlot"
        className="h-7 w-full"
        allowNegative={false}
        prefix=""
        decimalScale={0}
        maxLimit={1000}
        placeholder="Max Booking Frequency"
        disabled={isMaxBookingFrequencyDisabled(service)}
      />
      <FormFieldError name="maxBookingFrequencyInSlot" />
    </FormFieldContainer>
  )
}

export { MaxBookingFrequencySelect }
