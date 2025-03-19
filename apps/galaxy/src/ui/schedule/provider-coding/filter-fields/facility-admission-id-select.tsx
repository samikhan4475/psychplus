'use client'

import { AsyncDropdownSelect } from '@/components'
import { getFacilityAdmissionIdsOptions } from '../../client-actions'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const FacilityAdmissionIdSelect = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.FacilityAdmissionId)) return null

  return (
    <FormFieldContainer className="h-full flex-1">
      <FieldLabel>Facility Admission ID</FieldLabel>
      <AsyncDropdownSelect
        field="facilityAdmissionIds"
        placeholder="Select"
        fetchOptions={getFacilityAdmissionIdsOptions}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
        shouldDirty
      />
    </FormFieldContainer>
  )
}

export { FacilityAdmissionIdSelect }
