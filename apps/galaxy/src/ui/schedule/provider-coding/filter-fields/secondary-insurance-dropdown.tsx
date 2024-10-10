'use client'

import { FormFieldLabel, SelectInput } from '@/components'
import { FormFieldContainer } from '../../shared'
import { useFiltersContext } from '../../context'
import { SchedulerFilters } from '../../types'

const options = [
  {
    label: 'Secondary Insurance 1',
    value: 'Secondary Insurance 1',
  },
  {
    label: 'Secondary Insurance 2',
    value: 'Secondary Insurance 2',
  },
  {
    label: 'Secondary Insurance 3',
    value: 'Secondary Insurance 3',
  },
]

const SecondaryInsuranceDropdown = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.SecondaryInsurance)) return null

  return (
    <FormFieldContainer className="h-full">
      <FormFieldLabel>Secondary Insurance</FormFieldLabel>
      <SelectInput
        field="secondaryInsurance"
        placeholder="Select"
        options={options}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { SecondaryInsuranceDropdown }
