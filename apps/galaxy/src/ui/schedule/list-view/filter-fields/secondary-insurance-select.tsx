'use client'

import { AsyncSelect, FormFieldLabel } from '@/components'
import { getInsurancePlanOptionsAction } from '../../actions'
import { useFiltersContext } from '../../context'
import { FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const SecondaryInsuranceDropdown = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.SecondaryInsurance)) return null

  return (
    <FormFieldContainer className="h-full">
      <FormFieldLabel>Secondary Insurance</FormFieldLabel>
      <AsyncSelect
        field="secondaryInsuranceName"
        placeholder="Select"
        fetchOptions={getInsurancePlanOptionsAction}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { SecondaryInsuranceDropdown }
