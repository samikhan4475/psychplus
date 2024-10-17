'use client'

import { AsyncSelect, FormFieldLabel } from '@/components'
import { useFiltersContext } from '../../context'
import { FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'
import { getInsurancePlanOptionsAction } from '../../actions'

const PrimaryInsuranceDropdown = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.PrimaryInsurance)) return null
  return (
    <FormFieldContainer className="h-full">
      <FormFieldLabel className='w-2/5'>Primary Insurance</FormFieldLabel>
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
