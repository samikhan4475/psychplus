'use client'

import { useFormContext } from 'react-hook-form'
import { FormFieldLabel, SelectInput } from '@/components'
import { useFiltersContext } from '../../context'
import { FormFieldContainer } from '../../shared'
import { type ListViewSchema } from '../list-view-schema'
import { SchedulerFilters } from '../../constants'

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
  const form = useFormContext<ListViewSchema>()
  const serviceId = form.watch('service')
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.Group)) return null

  return (
    <FormFieldContainer className="h-full">
      <FormFieldLabel>Group</FormFieldLabel>
      <SelectInput
        field="group"
        placeholder="Select"
        options={options}
        disabled={!serviceId}
        buttonClassName="flex-1 h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { GroupDropdown }
