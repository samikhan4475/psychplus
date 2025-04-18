import { FormFieldLabel, SelectInput } from '@/components'
import { GROUP_OPTIONS } from '../../constants'
import { FilterFieldContainer } from '../../shared'

const AgeGroupSelect = () => {
  return (
    <FilterFieldContainer>
      <FormFieldLabel>Age Group</FormFieldLabel>
      <SelectInput
        className="flex-1"
        buttonClassName="w-full h-6"
        field="ageGroup"
        options={GROUP_OPTIONS}
      />
    </FilterFieldContainer>
  )
}

export { AgeGroupSelect }
