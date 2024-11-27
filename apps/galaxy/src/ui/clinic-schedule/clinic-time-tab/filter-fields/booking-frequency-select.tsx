import { FormFieldLabel, SelectInput } from '@/components'
import { FilterFieldContainer } from '../../shared'

const BookingFrequencySelect = () => {
  return (
    <FilterFieldContainer>
      <FormFieldLabel>Booking Frequency</FormFieldLabel>
      <SelectInput className="flex-1" buttonClassName="w-full h-6" />
    </FilterFieldContainer>
  )
}

export { BookingFrequencySelect }
