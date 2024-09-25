'use client'

import { FormFieldLabel, SelectInput } from '@/components'
import { FormFieldContainer } from '../../shared'
import { useDropdownContext, useFiltersContext } from '../../context'
import { SchedulerFilters } from '../../constants'

const SecondaryInsuranceDropdown = () => {
  const { filters } = useFiltersContext()
  const {insurancePlans} = useDropdownContext()
  if (!filters.includes(SchedulerFilters.SecondaryInsurance)) return null

  return (
    <FormFieldContainer className="h-full">
      <FormFieldLabel>
        Secondary Insurance
      </FormFieldLabel>
      <SelectInput
        field="secondaryInsurance"
        placeholder="Select"
        options={insurancePlans}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { SecondaryInsuranceDropdown }
