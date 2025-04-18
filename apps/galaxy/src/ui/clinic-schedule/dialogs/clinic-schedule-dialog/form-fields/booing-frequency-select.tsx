import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SchemaType } from '../schema'

const BookingFrequencySelect = () => {
  const { watch, setValue } = useFormContext<SchemaType>()
  const maxBookingFrequency = watch('maxBookingsPerSlot')

  const options = Array.from(
    { length: maxBookingFrequency ?? 0 },
    (_, i) => i + 1,
  ).map((el) => ({ value: String(el), label: String(el) }))

  useEffect(() => {
    if (maxBookingFrequency === 1) setValue('bookingFrequency', '1')
  }, [maxBookingFrequency, setValue])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required className="text-[12px]">
        Booking Frequency
      </FormFieldLabel>
      <SelectInput
        buttonClassName="w-full h-6"
        field="bookingFrequency"
        options={options}
        disabled={maxBookingFrequency === 1}
      />
      <FormFieldError name="bookingFrequency" />
    </FormFieldContainer>
  )
}

export { BookingFrequencySelect }
