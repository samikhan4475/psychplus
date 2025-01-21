'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  NumericInput,
} from '@/components'
import { Services } from '../../types'
import { maxBookingDataMap } from './data'
import { ServiceSchemaType } from './schema'

const MaxBookingFrequencySelect = () => {
  const form = useFormContext<ServiceSchemaType>()
  const service = form.watch('serviceOffered')
  const data = useMemo(
    () => maxBookingDataMap?.[service as Services],
    [service],
  )
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel required>Max Booking Frequency</FormFieldLabel>
      {data?.options?.length ? (
        <DropdownSelect
          field="maxBookingFrequencyInSlot"
          buttonClassName="h-7 w-full"
          menuClassName="w-[200px]"
          options={data?.options ?? []}
          disabled={data?.isDisabled ?? !service}
        />
      ) : (
        <NumericInput
          field="maxBookingFrequencyInSlot"
          className="h-7 w-full"
          allowNegative={false}
          prefix=""
          decimalScale={0}
          maxLimit={999}
          placeholder="Max Booking Frequency"
          disabled={!service}
        />
      )}
      <FormFieldError name="maxBookingFrequencyInSlot" />
    </FormFieldContainer>
  )
}

export { MaxBookingFrequencySelect }
