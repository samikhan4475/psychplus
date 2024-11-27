import { FormFieldLabel, SelectInput } from '@/components'
import { FilterFieldContainer } from '../../shared'

const ServiceSelect = () => {
  return (
    <FilterFieldContainer>
      <FormFieldLabel>Service</FormFieldLabel>
      <SelectInput
        placeholder="Select Type"
        className="flex-1"
        buttonClassName="w-full h-6"
      />
    </FilterFieldContainer>
  )
}

export { ServiceSelect }
