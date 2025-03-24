'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { transformInOptions } from '../transform'
import { generateMaxBookingFrequencyOptions } from '../utils'
import { ServiceFiltersSchemaType } from './schema'

const MaxBookingFrequencySelect = () => {
  const form = useFormContext<ServiceFiltersSchemaType>()
  const maxBookingFrequencyInSlot = form.watch('maxBookingFrequencyInSlot')

  const options = useMemo(
    () => generateMaxBookingFrequencyOptions(maxBookingFrequencyInSlot),
    [maxBookingFrequencyInSlot],
  )

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Max Booking Frequency</FormFieldLabel>
      <SelectInput
        options={transformInOptions(options)}
        field="maxBookingFrequency"
        buttonClassName="w-[120px]"
        size="1"
      />
    </FormFieldContainer>
  )
}

export { MaxBookingFrequencySelect }
