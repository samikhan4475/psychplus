import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

const BookingFrequencySelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="text-[12px]">Booking Frequency</FormFieldLabel>
      <SelectInput field="bookingFrequency" />
    </FormFieldContainer>
  )
}

export { BookingFrequencySelect }
