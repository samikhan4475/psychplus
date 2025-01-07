'use client'

import { AsyncSelect } from '@/components'
import { getInsurancePlanOptionsAction } from '../actions'
import { useFiltersContext } from '../context'
import { FieldLabel, FormFieldContainer } from '../shared'
import { SchedulerFilters } from '../types'

const SecondaryInsuranceDropdown = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.SecondaryInsurance)) return null

  return (
    <FormFieldContainer className="h-full">
      <FieldLabel>Secondary Insurance</FieldLabel>
      <AsyncSelect
        field="secondaryInsuranceName"
        placeholder="Select"
        fetchOptions={getInsurancePlanOptionsAction}
        buttonClassName="w-full h-6 truncate max-w-[10px] min-w-full"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { SecondaryInsuranceDropdown }
