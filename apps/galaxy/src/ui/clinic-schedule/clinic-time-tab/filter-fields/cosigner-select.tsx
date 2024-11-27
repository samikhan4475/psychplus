import { FormFieldLabel, SelectInput } from '@/components'
import { FilterFieldContainer } from '../../shared'

const CosignerSelect = () => {
  return (
    <FilterFieldContainer>
      <FormFieldLabel>Cosigner</FormFieldLabel>
      <SelectInput className="flex-1" buttonClassName="w-full h-6" />
    </FilterFieldContainer>
  )
}

export { CosignerSelect }
