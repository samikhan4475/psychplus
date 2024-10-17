'use client'

import { AsyncSelect, FormFieldLabel } from '@/components'
import { useFiltersContext } from '../../context'
import { FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'
import { getInsurancePlanOptionsAction } from '../../actions'

const SecondaryInsuranceDropdown = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.SecondaryInsurance)) return null

  return (
    <FormFieldContainer className="h-full">
      <FormFieldLabel className='w-2/4'>Secondary Insurance</FormFieldLabel>
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
