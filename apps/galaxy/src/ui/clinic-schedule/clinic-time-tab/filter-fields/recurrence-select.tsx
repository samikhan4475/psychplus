import { FormFieldLabel, SelectInput } from '@/components'
import { FilterFieldContainer } from '../../shared'

const RecurrenceSelect = () => {
  return (
    <FilterFieldContainer>
      <FormFieldLabel>Recurrence</FormFieldLabel>
      <SelectInput className="flex-1" buttonClassName="w-full h-6" />
    </FilterFieldContainer>
  )
}

export { RecurrenceSelect }
