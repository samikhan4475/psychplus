'use client'

import { AsyncSelect } from '@/components'
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
      <AsyncSelect
        field="facilityAdmissionIds"
        placeholder="Select"
        fetchOptions={getFacilityAdmissionIdsOptions}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { FacilityAdmissionIdSelect }
