'use client'

import { FormFieldLabel, SelectInput } from '@/components'
import { FormFieldContainer } from '../../shared'
import { useFiltersContext } from '../../context'
import { SchedulerFilters } from '../../types'

const options = [
  {
    label: 'Primary Insurance 1',
    value: 'Primary Insurance 1',
  },
  {
    label: 'Primary Insurance 2',
    value: 'Primary Insurance 2',
  },
  {
    label: 'Primary Insurance 3',
    value: 'Primary Insurance 3',
  },
]

const PrimaryInsuranceDropdown = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.PrimaryInsurance)) return null
  return (
    <FormFieldContainer className="h-full">
      <FormFieldLabel>Primary Insurance</FormFieldLabel>
      <SelectInput
        field="primaryInsurance"
        placeholder="Select"
        options={options}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { PrimaryInsuranceDropdown }
