import { FormFieldLabel, SelectInput } from '@/components'
import { FilterFieldContainer } from '../../shared'

const AgeGroupSelect = () => {
  return (
    <FilterFieldContainer>
      <FormFieldLabel>Age Group</FormFieldLabel>
      <SelectInput className="flex-1" buttonClassName="w-full h-6" />
    </FilterFieldContainer>
  )
}

export { AgeGroupSelect }
