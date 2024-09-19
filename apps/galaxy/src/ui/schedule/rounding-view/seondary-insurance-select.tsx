'use client'

import { FormFieldLabel, SelectInput } from '@/components'
import { FormFieldContainer } from '../shared'
import { useRoundingFiltersContext } from './context'

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
  const { filters } = useRoundingFiltersContext()
  if (!filters.includes('Secondary Insurance')) return null

  return (
    <FormFieldContainer className="h-full">
      <FormFieldLabel>
        Secondary Insurance
      </FormFieldLabel>
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
