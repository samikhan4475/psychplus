import { FormFieldLabel, SelectInput } from '@/components'
import { FilterFieldContainer } from '../../shared'

const options = [
  {
    label: 'Error',
    value: 'error',
  },
  {
    label: 'Pending',
    value: 'pending',
  },
  {
    label: 'Inactive',
    value: 'inactive',
  },
  {
    label: 'Active',
    value: 'active',
  },
]

const StatusSelect = () => {
  return (
    <FilterFieldContainer>
      <FormFieldLabel>Status</FormFieldLabel>
      <SelectInput
        className="flex-1"
        buttonClassName="w-full h-6"
        field="scheduleStatus"
        options={options}
      />
    </FilterFieldContainer>
  )
}

export { StatusSelect }
