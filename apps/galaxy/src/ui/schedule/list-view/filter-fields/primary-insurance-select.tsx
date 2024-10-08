'use client'

import { FormFieldLabel, SelectInput } from '@/components'
import { FormFieldContainer } from '../../shared'
import { useDropdownContext, useFiltersContext } from '../../context'
import { SchedulerFilters } from '../../types'

const PrimaryInsuranceDropdown = () => {
  const { filters } = useFiltersContext()
  const {insurancePlans} = useDropdownContext()
  if (!filters.includes(SchedulerFilters.PrimaryInsurance)) return null

  return (
    <FormFieldContainer className="h-full">
      <FormFieldLabel>Primary Insurance</FormFieldLabel>
      <SelectInput
        field="primaryInsurance"
        placeholder="Select"
        options={insurancePlans}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { PrimaryInsuranceDropdown }
