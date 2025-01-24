'use client'

import { SelectInput } from '@/components'
import { SelectOptionType } from '@/types'
import { useFiltersContext } from '../context'
import { FieldLabel, FormFieldContainer } from '../shared'
import { SchedulerFilters } from '../types'

const PrimaryInsuranceDropdown = ({
  options,
  loading,
}: {
  options: SelectOptionType[]
  loading: boolean
}) => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.PrimaryInsurance)) return null

  return (
    <FormFieldContainer className="h-full">
      <FieldLabel>Primary Insurance</FieldLabel>
      <SelectInput
        field="primaryInsuranceName"
        placeholder="Select"
        options={options}
        loading={loading}
        buttonClassName="w-full h-6 truncate max-w-[10px] min-w-full"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { PrimaryInsuranceDropdown }
