import { FormFieldLabel, SelectInput } from '@/components'
import { FilterFieldContainer } from '../../shared'

const options = [
  {
    label: 'Yes',
    value: 'yes',
  },
  {
    label: 'No',
    value: 'no',
  },
]

const PublicViewSelect = () => {
  return (
    <FilterFieldContainer>
      <FormFieldLabel>Public View</FormFieldLabel>
      <SelectInput
        className="flex-1"
        buttonClassName="w-full h-6"
        field="isPublicViewable"
        options={options}
      />
    </FilterFieldContainer>
  )
}

export { PublicViewSelect }
