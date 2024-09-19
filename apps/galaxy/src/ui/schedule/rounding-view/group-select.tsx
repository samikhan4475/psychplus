'use client'

import { FormFieldLabel, SelectInput } from '@/components'
import { FormFieldContainer } from '../shared'
import { useRoundingFiltersContext } from './context'

const options = [
  {
    label: 'Group 1',
    value: 'Group 1',
  },
  {
    label: 'Group 2',
    value: 'Group 2',
  },
  {
    label: 'Group 3',
    value: 'Group 3',
  },
]

const GroupDropdown = () => {
  const { filters } = useRoundingFiltersContext()
  if (!filters.includes('Group')) return null

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

export { GroupDropdown }
