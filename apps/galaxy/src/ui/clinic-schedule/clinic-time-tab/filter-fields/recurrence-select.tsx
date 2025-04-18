import { FormFieldLabel, SelectInput } from '@/components'
import { FilterFieldContainer } from '../../shared'

const options = [
  {
    label: 'Weekly',
    value: 'weekly',
  },
  {
    label: 'Biweekly',
    value: 'biweekly',
  },
  {
    label: 'Triweekly',
    value: 'triweekly',
  },
  {
    label: 'Quadweekly',
    value: 'quadweekly',
  },
]

const RecurrenceSelect = () => {
  return (
    <FilterFieldContainer>
      <FormFieldLabel>Recurrence</FormFieldLabel>
      <SelectInput
        className="flex-1"
        buttonClassName="w-full h-6"
        field="weeklyRecurrence"
        options={options}
      />
    </FilterFieldContainer>
  )
}

export { RecurrenceSelect }
