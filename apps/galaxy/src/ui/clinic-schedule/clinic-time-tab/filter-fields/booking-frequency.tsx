import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel } from '@/components'
import { FilterFieldContainer } from '../../shared'
import { ClinicTimeFilterSchemaType } from '../schema'

const BookingFrequency = () => {
  const form = useFormContext<ClinicTimeFilterSchemaType>()
  return (
    <FilterFieldContainer>
      <FormFieldLabel>Booking Frequency</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="text"
        {...form.register('maxBookingPerSlot')}
        className="h-6 w-full"
      />
    </FilterFieldContainer>
  )
}

export { BookingFrequency }
