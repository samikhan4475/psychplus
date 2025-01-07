'use client'

import { AsyncSelect } from '@/components'
import { getInsurancePlanOptionsAction } from '../../actions'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const PrimaryInsuranceDropdown = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.PrimaryInsurance)) return null
  return (
    <FormFieldContainer className="h-full">
      <FieldLabel className="w-2/5">Primary Insurance</FieldLabel>
      <AsyncSelect
        field="primaryInsuranceName"
        placeholder="Select"
        fetchOptions={getInsurancePlanOptionsAction}
        buttonClassName="w-full h-6 truncate max-w-[10px] min-w-full"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { PrimaryInsuranceDropdown }
