import { FormFieldLabel, SelectInput } from '@/components'
import { FilterFieldContainer } from '../../shared'

const PublicViewSelect = () => {
  return (
    <FilterFieldContainer>
      <FormFieldLabel>Public View</FormFieldLabel>
      <SelectInput className="flex-1" buttonClassName="w-full h-6" />
    </FilterFieldContainer>
  )
}

export { PublicViewSelect }
