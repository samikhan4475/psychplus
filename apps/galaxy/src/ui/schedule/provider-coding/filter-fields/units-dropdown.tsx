'use client'

import { FormFieldLabel, SelectInput } from '@/components'
import { FormFieldContainer } from '../../shared'
import { useFiltersContext } from '../../context'
import { SchedulerFilters } from '../../types'

const options = [
  {
    label: 'Service',
    value: 'Service',
  },
  {
    label: 'Time',
    value: 'Time',
  },
  {
    label: 'Visit',
    value: 'Visit',
  },
]

const UnitSelect = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.Unit)) return null

  return (
    <FormFieldContainer className="h-full">
      <FormFieldLabel>Unit</FormFieldLabel>
      <SelectInput
        field="unit"
        placeholder="Select"
        options={options}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { UnitSelect }
