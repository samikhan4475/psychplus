'use client'

import { AsyncSelect, FormFieldLabel } from '@/components'
import { getInsurancePlanOptionsAction } from '../../actions'
import { useFiltersContext } from '../../context'
import { FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const PrimaryInsuranceDropdown = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.PrimaryInsurance)) return null

  return (
    <FormFieldContainer className="h-full">
      <FormFieldLabel>Primary Insurance</FormFieldLabel>
      <AsyncSelect
        field="primaryInsuranceName"
        placeholder="Select"
        fetchOptions={getInsurancePlanOptionsAction}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { PrimaryInsuranceDropdown }
