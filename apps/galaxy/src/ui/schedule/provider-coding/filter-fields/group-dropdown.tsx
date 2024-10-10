'use client'

import { FormFieldLabel, SelectInput } from '@/components'
import { useFiltersContext } from '../../context'
import { FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const options = [
  {
    label: 'Group 1.1',
    value: 'Group 1.1',
  },
  {
    label: 'Group 2.2',
    value: 'Group 2.2',
  },
  {
    label: 'Group 3.3',
    value: 'Group 3.3',
  },
]

const GroupSelect = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.Group)) return null

  return (
    <FormFieldContainer className="h-full">
      <FormFieldLabel>Group</FormFieldLabel>
      <SelectInput
        field="group"
        placeholder="Select"
        options={options}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { GroupSelect }
