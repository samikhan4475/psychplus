import { FormFieldLabel, SelectInput } from '@/components'
import { FilterFieldContainer } from '../../shared'

const StatusSelect = () => {
  return (
    <FilterFieldContainer>
      <FormFieldLabel>Status</FormFieldLabel>
      <SelectInput className="flex-1" buttonClassName="w-full h-6" />
    </FilterFieldContainer>
  )
}

export { StatusSelect }
