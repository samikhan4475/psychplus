'use client'

import { FormFieldLabel, SelectInput } from '@/components'
import { FormFieldContainer } from '@/components'
import { useRoundingFiltersContext } from './context'

const options = [
  {
    label: 'Unit 1',
    value: 'Unit 1',
  },
  {
    label: 'Unit 2',
    value: 'Unit 2',
  },
  {
    label: 'Unit 3',
    value: 'Unit 3',
  },
]

const UnitDropdown = () => {
  const { filters } = useRoundingFiltersContext()
  if (!filters.includes('Unit')) return null

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

export { UnitDropdown }
