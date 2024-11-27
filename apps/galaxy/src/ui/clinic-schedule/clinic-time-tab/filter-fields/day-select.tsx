import { FormFieldLabel, SelectInput } from '@/components'
import { FilterFieldContainer } from '../../shared'

const DaySelect = () => {
  return (
    <FilterFieldContainer>
      <FormFieldLabel>Day</FormFieldLabel>
      <SelectInput className="flex-1" buttonClassName="w-full h-6" />
    </FilterFieldContainer>
  )
}

export { DaySelect }
