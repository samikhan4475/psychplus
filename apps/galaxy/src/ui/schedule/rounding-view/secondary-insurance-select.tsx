'use client'

import { SelectInput } from '@/components'
import { SelectOptionType } from '@/types'
import { useFiltersContext } from '../context'
import { FieldLabel, FormFieldContainer } from '../shared'
import { SchedulerFilters } from '../types'

const SecondaryInsuranceDropdown = ({
  options,
  loading,
}: {
  options: SelectOptionType[]
  loading: boolean
}) => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.SecondaryInsurance)) return null

  return (
    <FormFieldContainer className="h-full">
      <FieldLabel>Secondary Insurance</FieldLabel>
      <SelectInput
        field="secondaryInsuranceName"
        placeholder="Select"
        options={options}
        loading={loading}
        buttonClassName="w-full h-6 truncate max-w-[10px] min-w-full"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { SecondaryInsuranceDropdown }
