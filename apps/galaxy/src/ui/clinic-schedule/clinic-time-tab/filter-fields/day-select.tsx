import { FormFieldLabel, SelectInput } from '@/components'
import { FilterFieldContainer } from '../../shared'

const options = [
  {
    label: 'Monday',
    value: 'Monday',
  },
  {
    label: 'Tuesday',
    value: 'Tuesday',
  },
  {
    label: 'Wednesday',
    value: 'Wednesday',
  },
  {
    label: 'Thursday',
    value: 'Thursday',
  },
  {
    label: 'Friday',
    value: 'Friday',
  },
  {
    label: 'Saturday',
    value: 'Saturday',
  },
  {
    label: 'Sunday',
    value: 'Sunday',
  },
]

const DaySelect = () => {
  return (
    <FilterFieldContainer>
      <FormFieldLabel>Day</FormFieldLabel>
      <SelectInput
        className="flex-1"
        buttonClassName="w-full h-6"
        field="dayOfSchedule"
        options={options}
      />
    </FilterFieldContainer>
  )
}

export { DaySelect }
